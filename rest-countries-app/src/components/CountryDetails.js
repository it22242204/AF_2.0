import React, { useEffect, useState } from "react";
import Lottie from "react-lottie"; // Import Lottie
import {
  X,
  Users,
  Landmark,
  Globe,
  Languages,
  Map,
  Route,
  Clock,
  DollarSign,
  Shield,
  CalendarDays,
  ScrollText,
} from "lucide-react";
import { getCountryByCode } from "../api";
import Spinner from "./Spinner";

// Import the JSON file (animation file)
import animationData from "../assets/Animation - 1745465880697.json";

function CountryDetails({ country, onClose }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await getCountryByCode(country.cca3);
        setDetails(res.data[0]);
      } catch (err) {
        console.error("Error fetching country details:", err);
        setDetails(country); // fallback
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [country]);

  const data = details || country;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 backdrop-blur-sm transition-all">
      {/* Add Lottie animation as background */}
      <div className="absolute inset-0 z-0">
        <Lottie options={{
          animationData: animationData,
          loop: true,
          autoplay: true,
        }} height="100%" width="100%" />
      </div>

      <div className="bg-gradient-to-br from-white to-gray-100 rounded-3xl shadow-2xl max-w-2xl w-full p-8 relative animate-fade-in overflow-y-auto max-h-[90vh] z-10">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        {loading ? (
          <Spinner/>
        ) : (
          <div className="text-center space-y-4">
            <img
              className="w-32 h-20 mx-auto object-cover rounded shadow"
              src={data.flags?.png}
              alt={data.name?.common}
            />
            <h2 className="text-3xl font-bold text-gray-800">{data.name?.common}</h2>
            <p className="text-sm text-gray-600 italic">({data.name?.official})</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-left text-gray-700 mt-6">
              <InfoRow icon={<Landmark className="text-indigo-500" />} label="Capital" value={data.capital?.[0] || "N/A"} />
              <InfoRow icon={<Globe className="text-green-600" />} label="Region" value={data.region} />
              <InfoRow icon={<Map className="text-blue-500" />} label="Subregion" value={data.subregion || "N/A"} />
              <InfoRow icon={<Users className="text-rose-500" />} label="Population" value={data.population?.toLocaleString()} />
              <InfoRow icon={<ScrollText className="text-purple-500" />} label="Area" value={`${data.area?.toLocaleString()} km²`} />
              <InfoRow icon={<Languages className="text-yellow-600" />} label="Languages" value={data.languages ? Object.values(data.languages).join(", ") : "N/A"} />
              <InfoRow icon={<DollarSign className="text-emerald-600" />} label="Currencies" value={
                data.currencies
                  ? Object.values(data.currencies)
                      .map((cur) => `${cur.name} (${cur.symbol})`)
                      .join(", ")
                  : "N/A"
              } />
              <InfoRow icon={<Clock className="text-orange-400" />} label="Timezones" value={data.timezones?.join(", ") || "N/A"} />
              <InfoRow icon={<Route className="text-cyan-500" />} label="Borders" value={data.borders?.join(", ") || "None"} />
              <InfoRow icon={<Shield className="text-gray-600" />} label="UN Member" value={data.unMember ? "Yes" : "No"} />
              <InfoRow icon={<CalendarDays className="text-pink-500" />} label="Start of Week" value={data.startOfWeek || "N/A"} />
              <InfoRow icon={<Map className="text-teal-500" />} label="Maps" value={
                <a href={data.maps?.googleMaps} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                  View on Google Maps
                </a>
              } />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable Row Component
const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-2">
    <span className="mt-1">{icon}</span>
    <div>
      <div className="font-semibold">{label}</div>
      <div>{value}</div>
    </div>
  </div>
);

export default CountryDetails;
