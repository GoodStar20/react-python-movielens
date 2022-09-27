import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import { getMovies } from "../../api/movie";
import Loading from "../../components/Loading";
import MovieList from "../../components/List";
import "./styles.scss";

const Movies = () => {
  const [movieDataKey, setMovieDataKey] = useState("");
  const [userIDKey, setUserIDKey] = useState("");
  const [tagKey, setTagKey] = useState("");
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [normalTotalCount, setNormalTotalCount] = useState(0);

  const searchMovies = () => {
    setMovieDataKey(value1.trim());
    setUserIDKey(value2.trim());
    setTagKey(value3.trim());
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setMovieDataKey(value1.trim());
      setUserIDKey(value2.trim());
      setTagKey(value3.trim());
    }
  };

  const handlePageClick = async (data) => {
    let { selected } = data;
    setCurrentPage(selected + 1);
  };

  useEffect(() => {
    (async function () {
      try {
        let params = "";
        if (movieDataKey !== "") {
          params += "&moviedatakey=" + movieDataKey;
        }
        if (userIDKey !== "") {
          params += "&useridkey=" + userIDKey;
        }
        if (tagKey !== "") {
          params += "&tagkey=" + tagKey;
        }

        const result = await getMovies(currentPage, params);
        if (result.status !== 200) {
          return [];
        }
        setData(result.data?.movies);
        if (result.data.pages) {
          setNormalTotalCount(result.data.pages[result.data.pages.length - 1]);
        } else {
          setNormalTotalCount(0);
        }
      } catch (error) {
        setData([]);
        setNormalTotalCount(0);
      } finally {
        setLoading(false);
      }
    })();
  }, [currentPage, movieDataKey, userIDKey, tagKey]);

  return (
    <div className="text-center m-4">
      <h2 className="mb-5">Welcome!</h2>
      <div className="d-flex align-items-center mb-4">
        <div className="row align-items-center w-100">
          <div className="col-md-4 col-sm-12">
            <input
              id="moveData"
              type={"text"}
              className="form-control w-100 align-self-center"
              value={value1}
              onKeyPress={(e) => handleKeyPress(e)}
              onChange={(e) => setValue1(e.target.value)}
              placeholder="Movie ID | Title | Genres"
            />
          </div>
          <div className="col-md-4 col-sm-12">
            <input
              id="userID"
              type="number"
              className="form-control w-100 align-self-center"
              value={value2}
              onKeyPress={(e) => handleKeyPress(e)}
              onChange={(e) => setValue2(e.target.value)}
              placeholder="UserID"
            />
          </div>
          <div className="col-md-4 col-sm-12">
            <input
              id="tags"
              type="text"
              className="form-control w-100 align-self-center"
              value={value3}
              onKeyPress={(e) => handleKeyPress(e)}
              onChange={(e) => setValue3(e.target.value)}
              placeholder="Tags"
            />
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary ms-3 btn-lg"
          onClick={searchMovies}
        >
          Search
        </button>
      </div>

      {loading && <Loading />}

      <MovieList data={data} currentPage={currentPage} />

      {normalTotalCount > 1 && (
        <ReactPaginate
          previousLabel={"⟨"}
          nextLabel={"⟩"}
          breakClassName={"break-me"}
          pageCount={normalTotalCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"con-pagination"}
          activeClassName={"active"}
          renderOnZeroPageCount={null}
        />
      )}
    </div>
  );
};

export default Movies;
