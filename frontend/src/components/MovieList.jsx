import { useEffect, useState } from "react";
import MovieCard from "./MovieCard"; // Assurez-vous d'importer le composant MovieCard

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(""); // Pour gérer les erreurs

  // Fonction pour récupérer les films filtrés
  const fetchFilteredMovies = async (param) => {
    try {
      // Récupérer le token dans le localStorage
      const token = localStorage.getItem("token");

      // Vérifier si le token existe
      if (!token) {
        setError("Token manquant. Vous devez vous connecter.");
        return;
      }

      const response = await fetch(`http://localhost:3000/movies/popular/${param}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Ajouter le token dans les headers
        },
      });

      // Vérifier si la réponse est OK
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des films");
      }

      const data = await response.json();
      setMovies(data); // Assigne les films récupérés dans l'état
      
    } catch (error) {
      console.error("Erreur de récupération des films :", error);
      setError(error.message); // Afficher un message d'erreur si la requête échoue
    }
  };

  // Utilisation de useEffect pour récupérer les films au chargement de la page
  useEffect(() => {
    fetchFilteredMovies(""); // Appel initial pour récupérer tous les films
  }, []);

  // Gérer la recherche et filtrage en temps réel
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value); // Mettre à jour la valeur de la recherche

    // Si le champ de recherche est vide, récupérer tous les films, sinon les filtrer
    fetchFilteredMovies(value);
  };

  // Fonction pour créer une réservation
  const createReservation = async (idFilm) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Vous devez être connecté pour réserver un film.");
      return;
    }

    const dateSeance = "2024-02-05 14:30"; // Par exemple, tu peux mettre une valeur statique, ou la récupérer d'un champ de formulaire

    try {
      const response = await fetch(`http://localhost:3000/reservation/${idFilm}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          dateSeance: dateSeance, // Passer la dateSeance dans le corps de la requête
          movieId: idFilm,
          userId: localStorage.getItem("userId"), // Exemple: si tu stockes l'ID de l'utilisateur
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création de la réservation.");
      }

      const data = await response.json();
      alert("Réservation effectuée avec succès !");
    } catch (error) {
      console.error("Erreur de réservation :", error);
      setError(error.message);
    }
  };

  return (
    <div>
      {error && <div className="text-red-500 text-center">{error}</div>}

      {/* Champ de recherche */}
      <div className="w-full max-w-xs mx-auto mb-4">
        <input
          type="text"
          placeholder="Rechercher un film..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          style={{ color: 'white'}}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} createReservation={createReservation} />
          ))
        ) : (
          <p>Aucun film trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default MoviesList;
