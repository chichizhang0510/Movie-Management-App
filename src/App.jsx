import { useState, useEffect } from "react";
import "@/styles/App.css";

import Navbar from "./components/Navbar";
import Box from "./components/Box";
import Summary from "./components/Summary";
import MovieLists from "./components/MovieLists";
import WatchedLists from "./components/WatchedLists";
import NumResults from "./components/NumResults";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import Search from "./components/Search";
import SelectedMovie from "./components/SelectedMovie";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDU4MzM3ZWE0NDk2ZDRmMzI2ZWRmM2Y3Mjg1NmI5MCIsIm5iZiI6MTczNDIyNDU2MS4zNTAwMDAxLCJzdWIiOiI2NzVlMmFiMTgwZjkyY2E2OGIzNWE4ZWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.yL0gdj5qf44ZgQhm24vnN9YswH6eO6KiUoP7FEHUWS4",
  },
};

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const [debouncedQuery, setDebouncedQuery] = useState(query);

  function handleSelectedMovie(id) {
    setSelectedId(id);
  }

  function handleCloseMovie() {
    console.log("Closing movie...");
    setSelectedId(null);
    // console.log(selectedId);
  }

  function handleAddWatched(movie) {
    if (!watched.some((item) => item.id == movie.id)) {
      setWatched((prevWatched) => [...prevWatched, movie]);
    }
    handleCloseMovie();
  }

  function handleDeleteWatched(id) {
    setWatched((prevWatched) => prevWatched.filter((item) => item.id != id));
  }

  useEffect(() => {
    function callback(e) {
      if (e.code == "Escape") {
        handleCloseMovie();
      }
    }
    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [selectedId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(
    function () {
      if (!debouncedQuery.trim()) return;

      const controller = new AbortController();

      async function fetchMovies() {
        setError("");
        setIsLoading(true);
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?language=en-US&query=${encodeURIComponent(
              debouncedQuery
            )}&page=1`,
            options,
            { signal: controller.signal }
          );

          if (!response.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await response.json();
          console.log(data);

          if (data.results.length > 0) {
            const formattedMovies = data.results.map((movie) => ({
              imdbID: movie.id,
              Title: movie.title,
              Year: movie.release_date
                ? movie.release_date.split("-")[0]
                : "N/A",
              Poster: movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : "https://via.placeholder.com/300x450?text=No+Image",
              Rating: movie.vote_average,
            }));
            setMovies(formattedMovies);
          } else {
            setMovies([]);
            setError("No movies found for your search.");
          }
        } catch (error) {
          console.error("Error fetching movies:", error);
          if (error.name != "AbortError") {
            setError(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      handleCloseMovie();
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [debouncedQuery]
  );

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>

      <main className="main">
        <Box>
          {/* {isLoading ? <Loader /> : <MovieLists movies={movies} />} */}
          {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <MovieLists movies={movies} chooseMovie={handleSelectedMovie} />
          )}
        </Box>

        <Box>
          {selectedId ? (
            <SelectedMovie
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWached={handleAddWatched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedLists
                watched={watched}
                chooseMovie={handleSelectedMovie}
                onCloseMovie={handleCloseMovie}
                onDeleteMovie={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </main>
    </>
  );
}
