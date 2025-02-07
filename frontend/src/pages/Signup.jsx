import React, { useState } from "react";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [roles] = useState("USER");  // Champ role masqué avec valeur par défaut "USER"
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Tous les champs doivent être remplis.");
      return;
    }

    try {
      const response = await fetch("https://tp-mooviiebooker-nest.onrender.com/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, roles }),  // Ajout du champ role
      });

      if (response.ok) {
        console.log("Utilisateur inscrit !");
        window.location.href = "/login";
      } else {
        setError("Erreur lors de l'inscription. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
      setError("Une erreur est survenue. Veuillez réessayer plus tard.");
    }
  };

  return (
    <div className="w-96 backdrop-blur-lg bg-opacity-80 rounded-lg shadow-lg p-5 bg-gray-900 text-white">
      <h2 className="text-2xl font-bold pb-5">SignUp</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 text-sm font-medium">Your name</label>
          <input
            type="text"
            id="name"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
            placeholder="Your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)} 
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</label>
          <input
            type="email"
            id="email"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
            placeholder="andrew@mail.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-sm font-medium">Your password</label>
          <input
            type="password"
            id="password"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
            placeholder="*********"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        {/* Champ Role masqué */}
        <input
          type="hidden"
          name="role"
          value={roles}  // Valeur "USER" par défaut
        />

        {error && <p className="text-red-500 pb-5">{error}</p>}

        <div className="flex items-center justify-between mb-4">
          <button
            type="submit"
            className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 px-5 w-full sm:w-auto"
          >
            Register
          </button>
          <div className="flex items-center text-sm">
            <p>Already have an account?</p>
            <a className="text-red-500 hover:underline" href="/login">
              Login
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
