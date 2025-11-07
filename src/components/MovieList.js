import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-6 py-4 my-3">
      {/* Section Title */}
      <h1 className="text-xl md:text-3xl cursor-pointer font-semibold text-white mb-3 hover:text-red-500 transition-colors duration-300">
        {title}
      </h1>

      {/* Scrollable Movie Row */}
      <div className="flex overflow-x-scroll scrollbar-hide space-x-4 pb-4">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} posterPath={movie.poster_path} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
