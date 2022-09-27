from flask import Flask, request
from sqlalchemy import or_, desc, cast, String
from models import db, Movie, Tag, Rating, MyJSONEncoder
from movielens_dl import download_movielens

app = Flask(__name__)
app.config.from_pyfile("config.py")
db.init_app(app)

with app.app_context():
    db.create_all()

app.json_encoder = MyJSONEncoder


@app.cli.command("load-movielens")
def load_movielens():
    download_movielens()


@app.route("/movies")
def get_movies():
    per_page = 20
    page = request.args.get("page", 1, type=int)
    moviedata_key = request.args.get("moviedatakey", "", type=str)
    userid_key = request.args.get("useridkey", "", type=str)
    tag_key = request.args.get("tagkey", "", type=str)

    result = get_all_movies(moviedata_key, userid_key, tag_key, page, per_page)
    return result


def get_all_movies(moviedata_key, userid_key, tag_key, page, per_page):
    search_movie_arg = [
        col.ilike("%%%s%%" % moviedata_key)
        for col in [Movie.title, Movie.genres, cast(Movie.movie_id, String)]
    ]
    search_tag_args = [col.ilike("%%%s%%" % tag_key) for col in [Tag.tag]]
    response = Movie.query.filter(or_(*search_movie_arg))

    if userid_key != "":
        response = response.join(Rating).filter(Rating.user_id == userid_key)

    if tag_key != "":
        response = response.join(Tag).filter(or_(*search_tag_args))

    response = response.order_by(desc(Movie.release_year)) \
                       .paginate(page=page, per_page=per_page)

    return {
        "movies": [film.to_dict() for film in response.items],
        "pages": [page for page in response.iter_pages()],
    }
