import React from "react";
import { Globe, Languages, LocateFixed } from "lucide-react";

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

const languages = [
  "Afar", "Afrikaans", "Albanian", "Amharic", "Arabic", "Aragonese", "Armenian", "Assamese",
  "Aymara", "Azerbaijani", "Bambara", "Belarusian", "Bengali", "Bislama", "Bosnian", "Bulgarian",
  "Burmese", "Catalan", "Cebuano", "Chichewa", "Chinese", "Czech", "Danish", "Dhivehi", "Dutch",
  "Dzongkha", "English", "Estonian", "Fijian", "Filipino", "Finnish", "French", "Galician", "Georgian",
  "German", "Greek", "Guarani", "Gujarati", "Haitian Creole", "Hausa", "Hebrew", "Hindi", "Hiri Motu",
  "Hungarian", "Icelandic", "Igbo", "Indonesian", "Irish", "Italian", "Japanese", "Javanese", "Kannada",
  "Kazakh", "Khmer", "Kinyarwanda", "Korean", "Kurdish", "Kyrgyz", "Lao", "Latvian", "Lithuanian",
  "Luxembourgish", "Macedonian", "Malagasy", "Malay", "Malayalam", "Maltese", "Manx", "Marathi",
  "Marshallese", "Mongolian", "Nauru", "Navajo", "Nepali", "Niuean", "Norwegian", "Nyanja", "Oriya",
  "Pashto", "Persian", "Polish", "Portuguese", "Punjabi", "Quechua", "Romanian", "Russian", "Samoan",
  "Sanskrit", "Serbian", "Seychellois Creole", "Shona", "Sindhi", "Sinhala", "Slovak", "Slovene",
  "Somali", "Sotho", "Spanish", "Swahili", "Swati", "Swedish", "Tahitian", "Tajik", "Tamil", "Tatar",
  "Telugu", "Thai", "Tigrinya", "Tongan", "Tswana", "Turkish", "Turkmen", "Tuvaluan", "Ukrainian",
  "Urdu", "Uzbek", "Vietnamese", "Welsh", "Wolof", "Xhosa", "Yoruba", "Zulu"
];

function SearchFilter({ region, setRegion, setLanguage, code, setCode }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-center">

      {/* Region Filter */}
      <div className="relative w-full md:w-1/4">
        <Globe className="absolute top-3.5 left-3 text-gray-400 w-5 h-5" />
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="pl-10 pr-4 py-3 w-full border text-gray-500 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        >
          <option value="">All Regions</option>
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* Language Filter */}
      <div className="relative w-full md:w-1/4">
        <Languages className="absolute top-3.5 left-3 text-gray-400 w-5 h-5" />
        <select
          onChange={(e) => setLanguage(e.target.value)}
          className="pl-10 pr-4 py-3 w-full border text-gray-500 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        >
          <option value="">All Languages</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      {/* Country Code Search */}
      <div className="relative w-full md:w-1/4">
        <LocateFixed className="absolute top-3.5 left-3 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Search by country code (e.g. LKA)"
          className="pl-10 pr-4 py-3 w-full border text-gray-500 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>
    </div>
  );
}

export default SearchFilter;
