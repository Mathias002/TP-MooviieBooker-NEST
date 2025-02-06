import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie, createReservation }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`movies/movie/${movie.id}`)} // Redirection vers la page de détails
      className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800 text-white cursor-pointer transition-transform transform hover:scale-105"
    >
      <img className="w-full" src={movie.poster_url} alt={movie.title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{movie.title}</div>
        <p className="text-gray-400 text-base">
          {movie.overview.length > 100 ? movie.overview.substring(0, 100) + "..." : movie.overview}
        </p>
      </div>
      <div className="px-6 py-4">
        {movie.genres.map((genre, index) => (
          <span key={index} className="inline-block bg-gray-600 rounded-full px-3 py-1 text-sm font-semibold text-gray-200 mr-2">
            #{genre}
          </span>
        ))}
      </div>
      <div className="px-6 py-4 flex justify-end">
        <button
          onClick={(e) => {
            e.stopPropagation(); // Empêche la navigation quand on clique sur le bouton
            createReservation(movie.id);
          }}
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-full flex items-center"
        >
          <FaCalendarAlt className="mr-2" /> Réserver
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
