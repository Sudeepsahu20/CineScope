import React from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.imdbID}`}>
      <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transform hover:scale-105 transition cursor-pointer">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
          alt={movie.Title}
          className="w-full h-64 object-cover"
        />
        <div className="p-2 text-center">
          <h2 className="font-bold text-lg">{movie.Title}</h2>
          <p className="text-gray-600">{movie.Year}</p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
