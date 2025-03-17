import PropTypes from "prop-types";
import MovieList from "./MovieList";

function MovieLists({ movies, chooseMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MovieList key={movie.imdbID} movie={movie} chooseMovie={chooseMovie} />
      ))}
    </ul>
  );
}

MovieLists.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      imdbID: PropTypes.string.isRequired,
      Poster: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Year: PropTypes.string.isRequired,
    })
  ).isRequired,
  chooseMovie: PropTypes.func.isRequired,
};

export default MovieLists;
