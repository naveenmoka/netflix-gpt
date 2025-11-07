import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div
      className="relative flex-shrink-0 w-[160px] h-[240px] md:w-[200px] md:h-[300px]
                 rounded-md overflow-hidden cursor-pointer group 
                 transform transition-transform duration-300 hover:scale-105"
    >
      {/* Movie Poster */}
      <img
        alt="Movie Card"
        src={IMG_CDN_URL + posterPath}
        className="w-full mt-3 ml-2  h-full object-cover rounded-md shadow-md 
                   group-hover:shadow-2xl group-hover:brightness-110"
      />

      {/* Hover Overlay (optional visual touch) */}
      <div
        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 
                   transition-opacity duration-300 flex items-center justify-center text-white text-sm font-medium"
      >
        View Details
      </div>
    </div>
  );
};

export default MovieCard;
