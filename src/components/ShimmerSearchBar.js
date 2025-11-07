import React from "react";

const ShimmerSearchBar = () => {
  return (
    <div className="px-6 py-4 animate-pulse">
      {/* Title shimmer */}
      <div className="h-6 w-40 bg-gray-800 rounded-md mb-4"></div>

      {/* Movie card shimmer row */}
      <div className="flex space-x-4 overflow-x-scroll scrollbar-hide">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="w-[160px] h-[240px] md:w-[200px] md:h-[300px] bg-gray-800 rounded-md"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ShimmerSearchBar;
