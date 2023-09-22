import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function MangaInformation() {
  const { id } = useParams();
  const [description, setDescription] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.jikan.moe/v4/manga/${id}`)
      .then((response) => {
        setDescription(response.data.data);
      })
      .catch((error) => {
        console.error(
          `Errore nella richiesta API https://api.jikan.moe/v4/manga/${id}`,
          error
        );
      });
  }, [id]);

  if (!description) {
    return <p>Caricamento in corso...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center">{description.title}</h1>
      {description.images && description.images.jpg && (
        <img
          className="mx-auto my-4 rounded-lg shadow-lg"
          src={description.images.jpg.large_image_url}
          alt={description.title}
        />
      )}
      <p className="text-lg text-justify">{description.synopsis}</p>
    </div>
  );
}

export default MangaInformation;
