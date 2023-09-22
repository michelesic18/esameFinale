import React, { useState, useEffect } from "react";
import axios from "axios";
import { setupCache } from "axios-cache-adapter";
import NavBar from "./NavBar";
import AnimeMangaCard from "./AnimeMangaCard";
import title2 from "./assets/600v3.png";
import BackgroundImage from "./assets/header.jpeg";

function Home() {
  const [animeList, setAnimeList] = useState([]);
  const [mangaList, setMangaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollLeft, setScrollLeft] = useState(0);
  // ho provato a gestire le cache non so se funzionano bene
  const cache = setupCache({
    maxAge: 15 * 60 * 1000,
    store: {
      getItem: (key) => localStorage.getItem(key),
      setItem: (key, value) => localStorage.setItem(key, value),
      removeItem: (key) => localStorage.removeItem(key),
    },
  });

  const api = axios.create({
    adapter: cache.adapter,
  });

  const fetchAnimeData = async (url, delay) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, delay));
      const response = await api.get(url);
      const data = response.data.data;
      return data;
    } catch (error) {
      return null;
    }
  };
    // qui ho dato dei tempi diversi di caricamento perchè api in uso registrava al massimo 3 richieste al secondo o andava in crash
  useEffect(() => {
    const fetchData = async () => {
      const [animeData, mangaData] = await Promise.all([
        fetchAnimeData("https://api.jikan.moe/v4/top/anime", 0),
        fetchAnimeData("https://api.jikan.moe/v4/top/manga", 1000),
      ]);

      if (animeData && mangaData) {
        setAnimeList(animeData);
        setMangaList(mangaData);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
              // qui ho provato a gestire lo scroll orizzontale
  const handleHorizontalScroll = (event) => {
    setScrollLeft(scrollLeft + event.deltaY);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row bg-gray-900 ">
        <div className="lg:w-[8rem] lg:flex-col lg:flex lg:h-screen  ">
          <NavBar isLoggedIn={false} />
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="relative flex flex-col w-full lg:min-w-0 lg:flex-1">
            <div
              className="absolute inset-0 bg-center bg-no-repeat bg-cover"
              style={{ backgroundImage: `url(${BackgroundImage})` }}
              onWheel={handleHorizontalScroll}
            >
              <h1 className="flex justify-center">
                <img src={title2} alt="" />
              </h1>
              <AnimeMangaCard
                title="Popular Anime"
                list={animeList}
                type="anime"
                style={{ overflowX: "auto" }}
              />
              <AnimeMangaCard
                title="Popular Manga"
                list={mangaList}
                type="manga"
                style={{ overflowX: "auto" }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
