import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import MovieCard from "./index";

describe("Moive Card Component", () => {
  test("Render component with movie data", () => {
    const data = {
      all_tags: ["comic book"],
      avg_rating: "4.0",
      genres: ["Crime", "Drama"],
      imdb_tmdb: ["6768578", "483184"],
      movie_id: 188675,
      rating_count: 1,
      release_year: 2018,
      tag_count: 1,
      title: "Movie",
    };

    const table = document.createElement("table");
    document.body.appendChild(table);

    const { getByTestId } = render(
      <table>
        <tbody>
          <MovieCard movie={data} rowId={10} />
        </tbody>
      </table>
    );

    const id = getByTestId("id");
    const movieId = getByTestId("movie-id");
    const movieTitle = getByTestId("movie-title");
    const movieGenres = getByTestId("movie-genres");
    const movieTagcount = getByTestId("movie-tagcount");
    const movieAlltags = getByTestId("movie-alltags");
    const movieRatingcount = getByTestId("movie-ratingcount");
    const movieAvgrating = getByTestId("movie-avgrating");

    expect(id).toHaveTextContent("10");
    expect(movieId).toHaveTextContent("188675");
    expect(movieTitle).toHaveTextContent("Movie");
    expect(movieGenres).toHaveTextContent("Crime | Drama");
    expect(movieTagcount).toHaveTextContent("1");
    expect(movieAlltags).toHaveTextContent("comic book");
    expect(movieRatingcount).toHaveTextContent("1");
    expect(movieAvgrating).toHaveTextContent("4.0");
  });
});
