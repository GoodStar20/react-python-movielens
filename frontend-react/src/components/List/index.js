import React from "react";

import MovieCard from "../MovieCard";
import "./styles.scss";

const MovieList = ({ data, currentPage }) => (
  <div className="movie-list">
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Movie ID</th>
          <th scope="col">Title</th>
          <th scope="col">Genres</th>
          <th scope="col">Number of Tags</th>
          <th scope="col">Tags</th>
          <th scope="col">Number of Ratings</th>
          <th scope="col">Avergage Rating</th>
          <th scope="col">Links</th>
        </tr>
      </thead>
      <tbody data-testid="table-tbody">
        {data.length > 0 ? (
          data.map((movie, index) => (
            <MovieCard
              movie={movie}
              key={index}
              rowId={(currentPage - 1) * 20 + (index + 1)}
            />
          ))
        ) : (
          <tr>
            <td colSpan={9}>There is no result</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default React.memo(MovieList);
