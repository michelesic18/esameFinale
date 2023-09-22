import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import image from "./assets/600v3.png";

function SignIn() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleClick = () => {
    navigate("/Login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validatePassword = (password) => {
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
      return regex.test(password);
    };

    if (formData.password !== formData.confirmPassword) {
      setMessage("Le password devono corrispondere");
      return;
    }

    if (!validatePassword(formData.password)) {
      setMessage(
        "La password deve essere lunga almeno 6 caratteri e contenere almeno una lettera maiuscola, una minuscola, un numero e un carattere speciale"
      ); 
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/sign-in",
        formData
      );

      setMessage("Dati registrati ti stiamo per mandare alla pagina di login");
      setSuccess(true);
    } catch (error) {
      setMessage("Si è verificato un errore durante l'invio dei dati");
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  return (
    <div className=" flex justify-center flex-col items-center bg-white min-h-screen ">
      <h1 className="text-white text-4xl font-bold py-14">
        <img src={image} alt="" />
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <label className="block mb-4">
          <div className="text-gray-700 font-semibold mb-2">nome e cognome</div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </label>

        <label className="block mb-4">
          <div className="text-gray-700 font-semibold mb-2">email</div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </label>

        <label className="block mb-4">
          <div className="text-gray-700 font-semibold mb-2">età</div>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </label>

        <label className="block mb-4">
          <div className="text-gray-700 font-semibold mb-2">
            crea una nuova password
          </div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </label>

        <label className="block mb-6">
          <div className="text-gray-700 font-semibold mb-2">
            conferma nuova password
          </div>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </label>

        <label className="block">
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full transition duration-300 ease-in-out"
          >
            Invia
          </button>
        </label>
        {message && (
          <p
            className={`mt-4 p-2 rounded text-center text-white ${
              success ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default SignIn;
