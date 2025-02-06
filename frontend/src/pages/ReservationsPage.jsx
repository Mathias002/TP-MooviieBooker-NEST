import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa"; // Import de l'icône poubelle

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(""); // Pour gérer les erreurs

  useEffect(() => {
    // Fonction pour récupérer les réservations de l'utilisateur
    const fetchReservations = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Vous devez être connecté pour voir vos réservations.");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/reservation/my_reservation", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erreur de récupération des réservations");
        }

        const data = await response.json();
        setUserInfo(data); // Sauvegarder les informations de l'utilisateur
        setReservations(data.reservations); // Sauvegarder les réservations
      } catch (error) {
        console.error("Erreur lors de la récupération des réservations :", error);
        setError(error.message); // Afficher le message d'erreur si la requête échoue
      }
    };

    fetchReservations(); // Appeler la fonction pour récupérer les réservations
  }, []);

  // Fonction pour supprimer une réservation
  const handleDeleteReservation = async (idReservation) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Vous devez être connecté pour supprimer une réservation.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/reservation/my_reservation/delete/${idReservation}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de la réservation");
      }

      // Mettre à jour les réservations après la suppression
      setReservations((prevReservations) =>
        prevReservations.filter((reservation) => reservation.reservationId !== idReservation)
      );
      setError(""); // Réinitialiser les erreurs si tout se passe bien
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      setError(error.message);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {error && <div className="text-red-500 text-center">{error}</div>}
      
      {userInfo ? (
        <div>
          <h1 className="text-2xl font-bold text-center mb-6">
            Réservations de {userInfo.userName}
          </h1>

          <div className="space-y-4">
            {reservations.length > 0 ? (
              reservations.map((reservation) => (
                <div key={reservation.reservationId} className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={reservation.filmDetails.poster_path}
                        alt={reservation.filmDetails.title}
                        className="w-16 h-24 rounded-md object-cover"
                      />
                      <div className="ml-4">
                        <h2 className="text-xl font-bold">{reservation.filmDetails.title}</h2>
                        <p className="text-sm text-gray-500">
                          Date de la séance: {new Date(reservation.dateSeance).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <button
                        onClick={() => handleDeleteReservation(reservation.reservationId)}
                        className="text-red-500 mt-2 p-2 rounded-full hover:bg-red-200"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Aucune réservation trouvée.</p>
            )}
          </div>
        </div>
      ) : (
        <p>Chargement des informations...</p>
      )}
    </div>
  );
};

export default ReservationsPage;
