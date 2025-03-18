import "@/styles/App.css";

import { useState, useEffect } from "react";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import { useKey } from "./hooks/useKey";

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

export default function App() {
  const [watched, setWatched] = useLocalStorageState([], "watched");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const { movies, isLoading, error } = useMovies(
    debouncedQuery,
    handleCloseMovie
  );

  function handleSelectedMovie(id) {
    setSelectedId(id);
  }

  function handleCloseMovie() {
    // console.log("Closing movie...");
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

  useKey("Escape", handleCloseMovie);
  // useEffect(() => {
  //   function callback(e) {
  //     if (e.code == "Escape") {
  //       handleCloseMovie();
  //     }
  //   }
  //   document.addEventListener("keydown", callback);

  //   return () => {
  //     document.removeEventListener("keydown", callback);
  //   };
  // }, [selectedId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

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
