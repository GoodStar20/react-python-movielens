import { Link } from "react-router-dom";

import "./styles.scss";

const MovieCard = ({ movie }) => {
  return (
    <div className="col-md-3 mt-3">
      <div className="movie-list">
        {/* <Link to={"/movie/info/" + movie?.id}>
          <img src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} />
        </Link>
        <div className="title">{movie.title}</div> */}

        <a href={`https://movielens.org/movies/${movie?.movie_id}`}>
          {movie?.title}
        </a>
        <a
          href={`http://www.imdb.com/title/${movie?.imdb_id}`}
          style={{ paddingLeft: "4px" }}
        >
          imdb
        </a>
        <a
          href={`https://www.themoviedb.org/movie/${movie?.tmdb_id}`}
          style={{ paddingLeft: "4px" }}
        >
          tmdb
        </a>
        <li>
          Id: {movie?.movie_id} Genres: {movie?.genres}
        </li>
        {/* <li>
            Num_of_Tags: {movie.tag_count} Tags: {movie.all_tags.join(" | ")}
          </li>
          <li>
            Num_of_Ratings: {movie.rating_count} Average Rating:{" "}
            {movie.avg_rating}
          </li> */}
      </div>
    </div>
  );
};

export default MovieCard;
