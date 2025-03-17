import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import StarRating from "./StarRating";
import Loader from "./Loader";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDU4MzM3ZWE0NDk2ZDRmMzI2ZWRmM2Y3Mjg1NmI5MCIsIm5iZiI6MTczNDIyNDU2MS4zNTAwMDAxLCJzdWIiOiI2NzVlMmFiMTgwZjkyY2E2OGIzNWE4ZWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.yL0gdj5qf44ZgQhm24vnN9YswH6eO6KiUoP7FEHUWS4",
  },
};

function SelectedMovie({ selectedId, onCloseMovie, onAddWached }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const {
    title: Title,
    release_date: Year,
    poster_path: Poster,
    runtime: Runtime,
    vote_average: imdbRating,
    overview: Plot,
    genres: Genre,
  } = movie;

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${selectedId}`,
          options
        );
        const res_per = await fetch(
          `https://api.themoviedb.org/3/movie/${selectedId}/credits`,
          options
        );
        const data_per = await res_per.json();
        const data = await res.json();

        const allData = { ...data, ...data_per };
        setMovie(allData);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  const actors = movie.cast || [];
  const Directors = movie.crew || [];

  const watchedPoster = `https://image.tmdb.org/t/p/w500${Poster}`;

  const watched_movies = {
    id: selectedId,
    Title,
    Year,
    Poster: watchedPoster,
    Runtime,
    imdbRating,
    Plot,
    Genre,
    actors,
    Directors,
    userRating: userRating,
  };

  useEffect(() => {
    if (!movie.title) return;
    document.title = `Movie | ${movie.title}`;

    return function () {
      document.title = "usePopcorn";
    };
  }, [movie]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button
              className="btn-back"
              onClick={() => {
                onCloseMovie();
              }}
            >
              &larr;
            </button>
            <img
              src={`https://image.tmdb.org/t/p/w500${Poster}`}
              alt={`Poster of ${movie}`}
            ></img>
            <div className="details-overview">
              <h2>{Title}</h2>
              <p>
                {Year} &bull; {Runtime} min
              </p>
              <p>{Genre?.map((g) => g.name).join(", ")}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              <StarRating
                size={23}
                maxRating={10}
                onSetRating={setUserRating}
              />
              <button
                className="btn-add"
                onClick={() => onAddWached(watched_movies)}
              >
                + Add to list
              </button>
            </div>
            <p>
              <em>{Plot}</em>
            </p>
            <p>Starring {actors?.[0]?.name}</p>
            <p>Directed by {Directors?.[0]?.name}</p>
          </section>
        </>
      )}
    </div>
  );
}

SelectedMovie.propTypes = {
  selectedId: PropTypes.string,
  onCloseMovie: PropTypes.func,
  onAddWached: PropTypes.func,
};

export default SelectedMovie;
