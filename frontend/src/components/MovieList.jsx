import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [dateSeance, setDateSeance] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 8;

  const fetchFilteredMovies = async (param) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token manquant. Vous devez vous connecter.");
        return;
      }

      const response = await fetch(`http://localhost:3000/movies/popular/${param}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des films");
      }

      const data = await response.json();
      setMovies(data);
      
    } catch (error) {
      console.error("Erreur de récupération des films :", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchFilteredMovies("");
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    fetchFilteredMovies(value);
    setCurrentPage(1);
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const displayPopUpDateReservation = (movieId) => {
    setSelectedMovieId(movieId);
    setShowPopup(true);
  };

  const createReservation = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Vous devez être connecté pour réserver un film.");
      return;
    }

    // Vérifier le format de la date avec une regex
    const regex = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/;
    if (!regex.test(dateSeance)) {
      alert("Veuillez entrer une date au format DD/MM/YYYY HH:MM");
      return;
    }

    // Ajouter automatiquement ":00" pour les secondes
    const dateSeanceFormatted = dateSeance + ":00";

    try {
      const response = await fetch(`http://localhost:3000/reservation/${selectedMovieId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          dateSeance: dateSeanceFormatted, // Ajout des secondes
          movieId: selectedMovieId,
          userId: localStorage.getItem("userId"),
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création de la réservation.");
      }

      alert("Réservation effectuée avec succès !");
      setShowPopup(false);
      setDateSeance("");

    } catch (error) {
      console.error("Erreur de réservation :", error);
      setError(error.message);
    }
  };

  return (
    <div style={{ margin: "8rem 0" }}>
      {error && <div className="text-red-500 text-center">{error}</div>}

      {/* Champ de recherche */}
      <div className="w-full max-w-xs mx-auto" style={{ margin: "1rem auto 2rem auto" }}>
        <input
          type="text"
          placeholder="Rechercher un film..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          style={{ color: "white" }}
        />
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="mx-2 px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Précédent
        </button>
        <span className="text-white mx-4">Page {currentPage} / {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="mx-2 px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Suivant
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {currentMovies.length > 0 ? (
          currentMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} displayPopUpDateReservation={displayPopUpDateReservation} />
          ))
        ) : (
          <p style={{ color: "white", fontWeight: "bold" }}>Aucun film trouvé.</p>
        )}
      </div>

      {/* Popup de réservation */}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-2">Réserver une séance</h2>
            <input
              type="text"
              value={dateSeance}
              onChange={(e) => setDateSeance(e.target.value)}
              placeholder="DD/MM/YYYY HH:MM"
              className="border p-2 rounded w-full mb-2 text-white"
            />
            <div className="flex justify-between">
              <button onClick={createReservation} className="bg-green-500 text-white px-4 py-2 rounded">
                Valider
              </button>
              <button onClick={() => setShowPopup(false)} className="bg-red-500 text-white px-4 py-2 rounded">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviesList;
