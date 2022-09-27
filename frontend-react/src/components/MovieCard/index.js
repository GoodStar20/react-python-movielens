import "./styles.scss";

const MovieCard = ({ movie, rowId }) => {
  return (
    <tr>
      <td className="align-middle" data-testid="id">
        {rowId}
      </td>
      <td className="align-middle" data-testid="movie-id">
        {movie.movie_id}
      </td>
      <td className="align-middle" data-testid="movie-title">
        {movie.title}
      </td>
      <td className="align-middle" data-testid="movie-genres">
        {movie.genres.join(" | ")}
      </td>
      <td className="align-middle" data-testid="movie-tagcount">
        {movie.tag_count}
      </td>
      <td className="align-middle" data-testid="movie-alltags">
        {movie.all_tags.join(" | ")}
      </td>
      <td className="align-middle" data-testid="movie-ratingcount">
        {movie.rating_count}
      </td>
      <td className="align-middle" data-testid="movie-avgrating">
        {movie.avg_rating}
      </td>
      <td className="align-middle">
        <div>
          <a
            href={`https://movielens.org/movies/${movie.movie_id}`}
            target="_blank"
          >
            Movielens
          </a>
        </div>
        <div>
          <a
            href={`http://www.imdb.com/title/${movie.imdb_tmdb[0]}`}
            target="_blank"
          >
            IMDB
          </a>
        </div>
        <div>
          <a
            href={`https://www.themoviedb.org/movie/${movie.imdb_tmdb[1]}`}
            target="_blank"
          >
            TMDB
          </a>
        </div>
      </td>
    </tr>
  );
};

export default MovieCard;
