import React from "react";
import { Globe, Users, Landmark, Heart } from "lucide-react";

function CountryCard({ country, onClick, isFavorite, onFavorite }) {
  return (
    <div
      className="bg-gradient-to-br from-white to-gray-100 border border-gray-200 shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 ease-in-out relative"
    >
      {/* Favorite Button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent card click event
          onFavorite(e, country); // Pass the click event and country
        }}
        className={`absolute top-3 right-3 p-2 rounded-full ${
          isFavorite ? "bg-pink-100 text-pink-600" : "bg-gray-100 text-gray-400"
        } hover:scale-110 transition`}
        title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      >
        <Heart fill={isFavorite ? "currentColor" : "none"} className="w-5 h-5" />
      </button>

      {/* Main Card */}
      <div onClick={() => onClick(country)} className="cursor-pointer">
        <img
          className="w-full h-48 object-cover rounded-t-2xl"
          src={country.flags?.png}
          alt={country.name?.common}
        />
        <div className="p-5 space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">{country.name?.common}</h2>

          <div className="flex items-center text-sm text-gray-600">
            <Landmark className="w-4 h-4 mr-2 text-indigo-500" />
            <strong className="mr-1">Capital:</strong> {country.capital?.[0] || "N/A"}
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Globe className="w-4 h-4 mr-2 text-green-500" />
            <strong className="mr-1">Region:</strong> {country.region}
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-2 text-rose-500" />
            <strong className="mr-1">Population:</strong> {country.population.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryCard;
