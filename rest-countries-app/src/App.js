// ✅ Already complete – no further updates needed.

import React, { useEffect, useState } from "react";
import {
  getAllCountries,
  getCountryByName,
  getCountriesByRegion,
  getCountryByCode,
} from "./api";
import CountryCard from "./components/CountryCard";
import CountryDetails from "./components/CountryDetails";
import SearchFilter from "./components/SearchFilter";
import { Search, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NoCountriesFound from "./components/NoCountriesFound";
import Swal from "sweetalert2";
import Spinner from "./components/Spinner";
import FloatingHeart from "./components/FloatingHeart";
import { Player } from "@lottiefiles/react-lottie-player";
import worldAnimation from "../src/assets/Animation - 1745812572888.json";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [language, setLanguage] = useState("");
  const [selected, setSelected] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [code, setCode] = useState("");
  const [showHeart, setShowHeart] = useState(false);
  const [heartPosition, setHeartPosition] = useState({ x: 0, y: 0 });

  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [inputName, setInputName] = useState("");

  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const [loading, setLoading] = useState(false);

  const fetchCountries = async () => {
    setLoading(true);
    try {
      let res;
      if (code) {
        res = await getCountryByCode(code);
      } else if (search) {
        res = await getCountryByName(search);
      } else if (region) {
        res = await getCountriesByRegion(region);
      } else {
        res = await getAllCountries();
      }

      let filtered = Array.isArray(res.data) ? res.data : [res.data];

      if (language) {
        filtered = filtered.filter((country) =>
          Object.values(country.languages || {}).some((lang) =>
            lang.toLowerCase().includes(language.toLowerCase())
          )
        );
      }

      setCountries(filtered);
    } catch (err) {
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    if (!inputName) return;
    localStorage.setItem("username", inputName);
    setUsername(inputName);
    setInputName("");
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername("");
    setFavorites([]);
    setShowOnlyFavorites(false);
  };

  const toggleFavorite = (country, event) => {
    if (!username) {
      Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: "Please log in to add favorites.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    const updated = favorites.includes(country.cca3)
      ? favorites.filter((code) => code !== country.cca3)
      : [...favorites, country.cca3];

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));

    if (!favorites.includes(country.cca3)) {
      const { clientX, clientY } = event;
      setHeartPosition({ x: clientX, y: clientY });
      setShowHeart(true);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, [search, region, language, code]);

  let displayedCountries = [...countries];
  if (showOnlyFavorites) {
    displayedCountries = displayedCountries.filter((c) =>
      favorites.includes(c.cca3)
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-teal-500 backdrop-blur-md shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <motion.h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight flex items-center gap-2">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-20 h-25" // Adjust size here
            >
              <Player
                autoplay
                loop
                src={worldAnimation}
                style={{ height: "100%", width: "100%" }}
              />
            </motion.div>
            Country Explorer
          </motion.h1>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-72">
              <Search className="absolute top-3.5 left-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search countries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-full text-sm text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300 ease-in-out"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3"
          >
            {username ? (
              <>
                <p className="text-gray-700 text-sm">
                  👋 Welcome, <strong>{username}</strong>
                </p>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-400 text-white px-3 py-1 rounded-lg shadow text-sm transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  className="px-3 py-1.5 border rounded-md text-sm"
                />
                <button
                  onClick={handleLogin}
                  className="bg-green-500 hover:bg-green-400 text-white px-3 py-1 rounded-lg shadow text-sm transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Login
                </button>
              </>
            )}
          </motion.div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              className="bg-gray-100 border-t py-4 px-4 shadow-inner"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="max-w-7xl mx-auto">
                <SearchFilter
                  region={region}
                  setRegion={setRegion}
                  setLanguage={setLanguage}
                  code={code}
                  setCode={setCode}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {username && (
        <div className="max-w-7xl mx-auto px-4 pt-4">
          <button
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            className="text-sm bg-yellow-500 hover:bg-yellow-400 text-white px-3 py-2 rounded shadow"
          >
            {showOnlyFavorites ? "Show All Countries" : "Show Favorites 💖"}
          </button>
        </div>
      )}

      <main className="flex-grow max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <Spinner />
        ) : displayedCountries.length === 0 && !loading ? (
          <NoCountriesFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedCountries.map((country) => (
              <motion.div
                key={country.cca3}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <CountryCard
                  country={country}
                  onClick={setSelected}
                  onFavorite={(e) => toggleFavorite(country, e)}
                  isFavorite={favorites.includes(country.cca3)}
                />
              </motion.div>
            ))}
            {showHeart && (
              <FloatingHeart
                x={heartPosition.x}
                y={heartPosition.y}
                onComplete={() => setShowHeart(false)}
              />
            )}
          </div>
        )}
      </main>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
          >
            <CountryDetails
              country={selected}
              onClose={() => setSelected(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="bg-white border-t py-4 text-center text-gray-500 text-sm shadow-inner">
        <div className="max-w-7xl mx-auto px-4">
          Made with 💙 by <strong>asho</strong> | &copy;{" "}
          {new Date().getFullYear()} | Powered by REST Countries API
        </div>
      </footer>
    </div>
  );
}

export default App;
