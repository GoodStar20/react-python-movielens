import React from "react";

import Loading from "../Loading";
import MovieCard from "../MovieCard";
import "./styles.scss";

const MovieList = ({ loading, data }) => (
  <div>
    <div className="row">
      {data.length > 0 ? (
        data.map((movie, index) => <MovieCard movie={movie} key={index} />)
      ) : (
        <div>There is no result</div>
      )}
    </div>
    {loading && <Loading />}
  </div>
);

export default React.memo(MovieList);
