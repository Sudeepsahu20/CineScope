import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function MovieDetailModal() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

const apikey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${apikey}&i=${id}&plot=full`
        );
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        console.error("Error fetching movie:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

 if (loading)
  return (
    <div className="flex justify-center items-center h-64">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!movie) return <p className="text-center">Movie not found</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link to="/" className="text-blue-500 font-bold mb-4 inline-block">
        ← Back to search
      </Link>
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
        alt={movie.Title}
        className="w-full h-96 object-cover mb-4 rounded"
      />
      <h1 className="text-3xl font-bold mb-2">{movie.Title}</h1>
      <p className="text-gray-700 mb-1">Year: {movie.Year}</p>
      <p className="text-gray-700 mb-1">Genre: {movie.Genre}</p>
      <p className="text-gray-700 mb-1">Director: {movie.Director}</p>
      <p className="text-gray-700 mb-1">Actors: {movie.Actors}</p>
      <p className="text-gray-700 mb-4">{movie.Plot}</p>
    </div>
  );
}

export default MovieDetailModal;
