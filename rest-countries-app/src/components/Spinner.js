import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
      </div>
    </div>
  );
};

export default Spinner;
