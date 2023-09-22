import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Dati del modulo:", formData);
    try {
      console.log("Risposta dal server");

      const response = await axios.post(
        "http://localhost:3000/login",
        formData
      );
      console.log("Risposta dal server:", response.data);

      if (response.data.success) {
        navigate("/profile");

        setFormData({ name: "", password: "" });
        setError(null);
      } else {
        console.error("Errore durante il login:", response.data.message);
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Errore durante il login:", error);
      setError(error.message);
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-center">Login</h1>
      <form
        action="/login"
        method="post"
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg"
      >
        <div className="flex flex-col space-y-4">
          <label className="flex flex-col">
            <span className="text-lg font-semibold">Username</span>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={formData.name}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-lg font-semibold">Password</span>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Accedi
          </button>
        </div>
      </form>
      <div className="flex justify-center mt-4">
        <Link to="/sign-in" className="text-blue-500 hover:text-blue-700">
          <p>Non sei registrato?</p>
          <p>Registrati</p>
        </Link>
      </div>

      {error && (
        <div className="max-w-md mx-auto mt-4 bg-red-100 p-4 rounded-lg border border-red-300">
          <p className="text-red-700">{error}</p>
        </div>
      )}

<div className="flex justify-center mt-4">
      <Link to="/" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Torna alla home
      </Link>
    </div>
    </>
  );
}

export default Login;
