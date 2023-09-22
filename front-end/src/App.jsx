// app.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Search from "./components/Search";
import AnimeInformation from "./components/AnimeInformation";
import MangaInformation from "./components/MangaInformation";
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <h1 className="text-4xl font-bold mr-4">caricamento in corso...</h1>
        <div className="animate-spin h-16 w-16 rounded-full bg-indigo-500"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/anime/:id" element={<AnimeInformation />} />
        <Route path="/manga/:id" element={<MangaInformation />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
