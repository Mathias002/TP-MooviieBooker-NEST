import { Link, useNavigate } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/solid";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Vérifie si l'utilisateur est connecté

  return (
    <nav id="navbar" className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center shadow-lg">
      {/* LOGO & LIENS */}
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-xl font-bold hover:text-gray-400">
          🎬 MyMovies
        </Link>
        <Link to="/movies" className="hover:text-gray-400">
          Films
        </Link>
        {token && <Link to="/reservations" className="hover:text-gray-400">Mes Réservations</Link>}
      </div>

      {/* Bulle de Profil */}
      {token ? (
        <button onClick={() => navigate("/profile")} className="relative">
          <UserCircleIcon className="w-10 h-10 text-white hover:text-gray-400" />
        </button>
      ) : (
        <Link to="/login" className="px-4 py-2 rounded-lg">
          Connexion
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
