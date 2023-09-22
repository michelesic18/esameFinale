import React, { useState } from "react";
import axios from "axios";
import RandomAnime from "./RandomAnime";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

function Search() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [randomAnime, setRandomAnime] = useState(null);
  const [data, setData] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    if (query.trim() === "") {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime?q=${query}`
      );
      const searchData = response.data.data;
      setSearchResults(searchData);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };
                                      //FUNZIONE PER VEDER UN ANIME CASUALE
  const fetchRandomAnime = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await api.get("https://api.jikan.moe/v4/random/anime");
      const data = response.data.data;
      setRandomAnime(data);
    } catch (error) {
      console.error("Error in Random Anime API request:", error);
    }
  };
                                          //qui ho cercato di mandare gli anime preferiti in /profile non riuscito va in errore
  const handleAdd = (id, title) => {
    axios
      .get("http://localhost:3000/user")
      .then((response) => {
        if (response.data.user) {
          const newFavorites = [...response.data.user.favorites, { id, title }];
          axios
            .post("http://localhost:3000/profile", { favorites: newFavorites })
            .then((response) => {
              console.log("Preferiti aggiornati con successo");
            })
            .catch((error) => {
              console.error(
                "Errore durante l'aggiornamento dei preferiti:",
                error
              );
            });
        } else {
          alert("Devi essere loggato per aggiungere ai preferiti");
        }
      })
      .catch((error) => {
        console.error(
          "Errore durante la richiesta dei dati dell'utente:",
          error
        );
      });
  };

  return (
    <div className="flex flex-col lg:flex-row ">
      <div className="w-full lg:w-[6rem] lg:flex-col lg:flex lg:h-screen">
        <NavBar />
      </div>
      <div className="flex flex-col w-full lg:min-w-0 lg:flex-1 items-center ">
        <h1 className="pb-8 font-extrabold text-4xl">search anime</h1>
        <div className="flex items-center border-2 border-gray-300 rounded-lg p-2 w-96">
          <input
            type="text"
            placeholder="Search for anime..."
            value={query}
            onChange={handleInputChange}
            className="flex-1 outline-none"
          />
          <button
            onClick={handleSearch}
            disabled={query.trim() === ""}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out"
          >
            Search
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="mt-4 ">
            {searchResults.length > 0 ? (
              <div className="flex flex-col text-center">
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {searchResults.map((result) => (
                    <li
                      key={result.mal_id}
                      className="border border-gray-300 rounded-lg shadow-lg overflow-hidden"
                    >
                      <Link to={`/anime/${result.mal_id}`} className="block">
                        <img
                          src={result.images.jpg.image_url}
                          alt={result.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-bold truncate">
                            {result.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Score: {result.score}
                          </p>
                        </div>
                      </Link>
                      <button
                        onClick={() => handleAdd(result.mal_id, result.title)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mb-4 mx-auto"
                      >
                        Aggiungi ai preferiti
                      </button>{" "}
    
                    </li>
                  ))}
                </ul>
              </div>
            ) : query.trim() === "" ? null : (
              <p>nessun risultato trovato</p>
            )}
          </div>
        )}
        <div className="flex justify-center mt-4">
          <RandomAnime animeData={randomAnime} onReload={fetchRandomAnime} />
        </div>
      </div>
    </div>
  );
}
export default Search;
