import React, { useState, useEffect } from "react";
import axios from "axios";

function RandomAnime({ onReload }) {
  const [animeData, setAnimeData] = useState(null);
  const [isReloading, setIsReloading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const fetchRandomAnime = async () => {
    setIsReloading(true);

    try {
      const response = await axios.get("https://api.jikan.moe/v4/random/anime");
      const data = response.data.data;
      setAnimeData(data);
      setIsVisible(true);
    } catch (error) {
      console.error("Errore nella richiesta API Random Anime:", error);
    } finally {
      setIsReloading(false);
    }
  };

  const handleReloadClick = async () => {
    if (!isReloading) {
      fetchRandomAnime();
    }
  };

  if (!isVisible) {
    return (
      <div>
        <button
          className="bg-red-700 rounded-lg p-4"
          onClick={handleReloadClick}
          disabled={isReloading}
        >
          {isReloading ? "Caricamento..." : "non sai cosa cercare? cliccami"}
        </button>
      </div>
    );
  }

  const { title, images } = animeData;
  const large_image_url = images?.jpg?.large_image_url || "";

  return (
    <div>
      <div className="flex justify-center py-4">
        <button
          className="bg-red-800 p-4 rounded-xl"
          onClick={handleReloadClick}
          disabled={isReloading}
        >
          {isReloading ? "Caricamento..." : "cliccami"}
        </button>
      </div>
      <img src={large_image_url} alt={title} />
      <h1 className=" text-lg font-semibold text-center pt-4">{title} </h1>
    </div>
  );
}

export default RandomAnime;
