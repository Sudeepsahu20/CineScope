import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

function MovieSearch() {
  const [movie, setMovie] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apikey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    fetchMovies("Batman");
  }, []);

  const fetchMovies = async (query) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apikey}&s=${query}`
      );
      const data = await response.json();
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (err) {
      setError("Failed to fetch movies. Check your internet.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (movie.trim() !== "") fetchMovies(movie);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
        Movie Search 🎬
      </h1>

      <form onSubmit={handleSubmit} className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Enter movie name"
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
          className="border rounded-l-lg px-4 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition"
        >
          Search
        </button>
      </form>

     {loading && (
  <div className="flex justify-center items-center mt-10">
    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
)}
      {error && !loading && (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {movies.map((m) => (
          <MovieCard key={m.imdbID} movie={m} />
        ))}
      </div>
    </div>
  );
}

export default MovieSearch;
