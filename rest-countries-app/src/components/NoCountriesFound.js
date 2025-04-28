import React from "react";
import Lottie from "lottie-react";
import noCountriesFoundAnimation from '../assets/eTcHYjNsyI.json'; 

const NoCountriesFound = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-20 text-gray-600">
      <Lottie
        animationData={noCountriesFoundAnimation} // Using the imported JSON data
        loop
        style={{ width: 300, height: 300 }}
      />
      <h2 className="text-2xl font-semibold mt-4">No countries found</h2>
      <p className="text-sm text-gray-400 mt-1">
        Try adjusting your search or filter options.
      </p>
    </div>
  );
};

export default NoCountriesFound;
