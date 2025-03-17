import PropTypes from "prop-types";

function WatchedList({ movie, onDeleteMovie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating.toFixed(1)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating.toFixed(1)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.Runtime.toFixed(0)} min</span>
        </p>
        <button className="btn-delete" onClick={() => onDeleteMovie(movie.id)}>
          X
        </button>
      </div>
    </li>
  );
}

WatchedList.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    Poster: PropTypes.string,
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    imdbRating: PropTypes.number.isRequired,
    userRating: PropTypes.number.isRequired,
    Runtime: PropTypes.number.isRequired,
  }).isRequired,
  onDeleteMovie: PropTypes.func,
};

export default WatchedList;
