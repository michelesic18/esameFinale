
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/user")
      .then((response) => {
        if (response.data.user) {
          setUser(response.data.user);
          setFavorites(response.data.user.favorites);
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error(
          "Errore durante la richiesta dei dati dell'utente:",
          error
        );
      });
  }, []);
                //qui gestisco il logout
  const handleLogout = () => {
    fetch("http://localhost:3000/logout", { method: "POST" })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("errore durante il logout ");
      });
  };
                  //funzione per tenere traccia degli anime preferiti non funzionante
  const handleRemove = (id) => {
    const newFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(newFavorites);
    axios
      .put("http://localhost:3000/user/favorites", { favorites: newFavorites })
      .then((response) => {
        console.log("Preferiti aggiornati con successo");
      })
      .catch((error) => {
        console.error("Errore durante l'aggiornamento dei preferiti:", error);
      });
  };
                                //qui ho cercato di cancellare l'account una volta loggati va in errore
  const handleDelete = () => {
    setShowConfirm(true); 
  };

  
  const handleConfirm = () => {
    axios
      .delete("http://localhost:3000/user")
      .then((response) => {
        console.log("Account eliminato con successo");
        navigate("/"); 
      })
      .catch((error) => {
        console.error("Errore durante l'eliminazione dell'account:", error);
      });
  };

  return (
    <div className="flex h-screen">
      <div className="w-[8rem] flex flex-col h-screen ">
        <NavBar isLoggedIn={true} />
      </div>
      <div className="flex flex-col justify-center items-center w-screen bg-gray-900">
        {" "}

        <h1 className="text-4xl font-bold text-white">Profilo</h1>{" "}
     
        <button
          onClick={handleLogout}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4"
        >
          Logout
        </button>{" "}
 
        <h2 className="text-3xl font-bold text-white mt-8">
          Anime preferiti
        </h2>{" "}
    
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {favorites.map((fav) => (
            <li
              key={fav.id}
              className="border border-gray-300 rounded-lg shadow-lg overflow-hidden bg-white"
            >
              {" "}
         
              <p className="text-lg font-bold truncate p-4">{fav.title}</p>
              <button
                onClick={() => handleRemove(fav.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mb-4 mx-auto"
              >
                Rimuovi dai preferiti
              </button>{" "}
          
            </li>
          ))}
        </ul>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-4"
        >
          Delete account
        </button>{" "}
       
        {showConfirm && ( 
          <div className="bg-white p-4 rounded-lg shadow-lg mt-4">
            <p className="text-lg font-bold">
              Sei sicuro di voler eliminare il tuo account?
            </p>
            <p className="text-sm text-gray-500">
              Questa azione è irreversibile e perderai tutti i tuoi dati.
            </p>
            <button
              onClick={handleConfirm}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-4"
            >
              Conferma
            </button>{" "}
   
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
