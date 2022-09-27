import axios from "axios";

export async function getMovies(currentPage, params) {
  return await axios.get(`/movies?page=${currentPage}${params}`);
}
