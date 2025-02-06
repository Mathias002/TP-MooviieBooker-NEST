import { useState } from "react";
import axios from "axios";
import React from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      // Stocker le token dans le localStorage
      localStorage.setItem("token", response.data.token);
      console.log(response.data.token);

      // Redirection vers le Dashboard après connexion
      window.location.href = "/movies";
    } catch (err) {
      setError("Email ou mot de passe incorrect !");
    }
  };

  return (
    <div className="container px-4 mx-auto flex justify-center items-center h-screen">
      <div className="max-w-lg w-full bg-white p-6 rounded shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold">Sign in</h2>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block mb-2 font-extrabold">Email</label>
            <input
              className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded"
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-extrabold">Password</label>
            <input
              className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded"
              type="password"
              placeholder="**********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="inline-block w-full py-4 px-6 mb-6 text-center text-lg leading-6 text-white font-extrabold bg-indigo-800 hover:bg-indigo-900 border-3 border-indigo-900 shadow rounded transition duration-200"
          >
            Sign in
          </button>
          <p className="text-center font-extrabold">
            Don’t have an account?{" "}
            <a className="text-red-500 hover:underline" href="/signup">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
