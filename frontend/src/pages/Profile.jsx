import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Vous devez être connecté pour voir votre profil.");
          return;
        }

        const response = await fetch("https://tp-mooviiebooker-nest.onrender.com/auth/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des informations utilisateur.");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error);
        setError(error.message);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login"); // Redirige vers la page de connexion
  };

  return (
    <div>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        {error && <div className="text-red-500 text-center">{error}</div>}

        {user ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Profil Utilisateur</h2>
            <p><strong>Nom :</strong> {user.name}</p>
            <p><strong>Email :</strong> {user.email}</p>
            <a className="text-red-500 hover:underline" href="/reservation/my_reservation">
                Mes reservations
            </a>
            <br></br>
            <button
              onClick={handleLogout}
              className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
              Déconnexion
            </button>
          </div>
        ) : (
          <p className="text-center" style={{color: 'white', fontWeight: 'bold'}}>Chargement des informations...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
