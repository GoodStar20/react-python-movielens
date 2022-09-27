from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy import Integer
from sqlalchemy.sql.expression import cast, func

import flask.json, decimal

db = SQLAlchemy()

class MyJSONEncoder(flask.json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, decimal.Decimal):
            return str(obj)
        return super(MyJSONEncoder, self).default(obj)

class Movie(db.Model):
    __tablename__ = "movies"

    movie_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    genres = db.Column(db.String(255), nullable=False)
    ratings = db.relationship("Rating", backref="movie", lazy=True)
    tags = db.relationship("Tag", backref="movie", lazy=True)
    links = db.relationship("Link", backref="movie", lazy=True)

    @property
    def tag_count(self):
        return len(self.tags)

    @property
    def rating_count(self):
        return len(self.ratings)

    @property
    def genres_array(self):
        if "|" not in self.genres:
            return [self.genres]
        return self.genres.split("|")

    @hybrid_property
    def release_year(self):
        if not self.title[-5:-1].isdigit():
            return int("0000")
        return int(self.title[-5:-1])

    @release_year.expression
    def release_year(cls):
        if func.isnumeric(func.substr(cls.title, -5, 4)) == False:
            return cast("0000", Integer)
        return cast(func.substr(cls.title, -5, 4), Integer)

    @property
    def avg_rating(self):
        ratings = Rating.query.filter_by(movie_id=self.movie_id).all()
        all_ratings = [r.rating for r in ratings]
        if len(all_ratings) != 0:
            return "{:2.1f}".format(sum(all_ratings) / len(all_ratings))
        return 0

    @property
    def all_tags(self):
        tags = Tag.query.filter_by(movie_id=self.movie_id).all()
        return [t.tag for t in tags]

    @property
    def imdb_tmdb(self):
        movie = Link.query.filter_by(movie_id=self.movie_id).first()
        return (movie.imdb_id, movie.tmdb_id)

    def to_dict(self):
        return {
            "movie_id": self.movie_id,
            "title": self.title,
            "genres": self.genres_array,
            "release_year": self.release_year,
            "tag_count": self.tag_count,
            "all_tags": self.all_tags,
            "rating_count": self.rating_count,
            "avg_rating": self.avg_rating,
            "imdb_tmdb": self.imdb_tmdb,
        }


class Rating(db.Model):
    __tablename__ = "ratings"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey("movies.movie_id"), nullable=False)
    rating = db.Column(db.Numeric(2, 1), nullable=False)
    timestamp = db.Column(db.Integer)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "movie_id": self.movie_id,
            "rating": self.rating,
            "timestamp": self.timestamp,
        }

class Tag(db.Model):
    __tablename__ = "tags"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey("movies.movie_id"), nullable=False)
    tag = db.Column(db.String(255))
    timestamp = db.Column(db.Integer)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "movie_id": self.movie_id,
            "tag": self.tag,
            "timestamp": self.timestamp,
        }

class Link(db.Model):
    __tablename__ = "links"

    id = db.Column(db.Integer, primary_key=True)
    movie_id = db.Column(db.Integer, db.ForeignKey("movies.movie_id"), nullable=False)
    imdb_id = db.Column(db.Integer, nullable=False)
    tmdb_id = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "movie_id": self.movie_id,
            "imdb_id": self.imdb_id,
            "tmdb_id": self.tmdb_id,
        }

def decimal_default(obj):
    if isinstance(obj, decimal.Decimal):
        return float(obj)
    raise TypeError
