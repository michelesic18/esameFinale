import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function AnimeInfomation() {
  const { id } = useParams();
  const [description, setDescription] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.jikan.moe/v4/anime/${id}`) //qui gestisco la richiesta per visualizzare info sugli anime
      .then((response) => {
        setDescription(response.data.data);
      })
      .catch((error) => { //in casi di errore
        console.error(
          `Errore nella richiesta API https://api.jikan.moe/v4/anime/${id}`,
          error
        );
      });

    axios
      .get(`https://api.jikan.moe/v4/anime/${id}/reviews`) //tramite queta richiesta prendo le recensioni
      .then((response) => {
        setReviews(response.data.data);
      })
      .catch((error) => {
        console.error(
          `Errore nella richiesta API https://api.jikan.moe/v4/anime/${id}/reviews`,
          error
        );
      });
  }, [id]);
                // qui ho creato un bottone per far cambiare colore allo sfondo
  const [bgColor, setBgColor] = useState("bg-gray-100"); 

  if (!description) {
    return <p>Caricamento in corso...</p>;
  }

  const changeBgColor = () => {
    const colors = [
      "bg-red-100",
      "bg-yellow-100",
      "bg-green-100",
      "bg-blue-100",
      "bg-indigo-100",
      "bg-purple-100",
      "bg-pink-100",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(randomColor);
  };
                        //fine componente cambia colore
                        //RETURN
  return (
    <div className={`container mx-auto px-4 py-8 ${bgColor}`}>
      <h1 className="text-4xl font-bold text-center">{description.title}</h1>
      {description.images && description.images.jpg && (
        <img
          className="mx-auto my-4 rounded-lg shadow-lg"
          src={description.images.jpg.large_image_url}
          alt={description.title}
        />
      )}

      <p className="text-lg text-justify">{description.synopsis}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto mt-4"
        onClick={changeBgColor}
      >
        Cambia colore
      </button>
    </div>
  );
}

export default AnimeInfomation;
