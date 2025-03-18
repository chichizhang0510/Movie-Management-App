import { useState, useEffect } from "react";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDU4MzM3ZWE0NDk2ZDRmMzI2ZWRmM2Y3Mjg1NmI5MCIsIm5iZiI6MTczNDIyNDU2MS4zNTAwMDAxLCJzdWIiOiI2NzVlMmFiMTgwZjkyY2E2OGIzNWE4ZWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.yL0gdj5qf44ZgQhm24vnN9YswH6eO6KiUoP7FEHUWS4",
  },
};

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      callback?.();
      if (!query.trim()) return;

      const controller = new AbortController();

      async function fetchMovies() {
        setError("");
        setIsLoading(true);
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?language=en-US&query=${encodeURIComponent(
              query
            )}&page=1`,
            {
              ...options,
              signal: controller.signal,
            }
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

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
