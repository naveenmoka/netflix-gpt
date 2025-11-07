import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import ShimmerSearchBar from "./ShimmerSearchBar";

const GptSearchSuggestions = () => {
  const { movieResults, movieNames, loading } = useSelector(
    (store) => store.gpt
  );
  if (loading) {
    return (
      <div className="p-4 m-4 bg-black bg-opacity-80 text-white">
        {[...Array(3)].map((_, index) => (
          <ShimmerSearchBar key={index} />
        ))}
      </div>
    );
  }
  if (!movieNames) return null;
  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-80">
      <div>
        {movieNames.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieResults[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default GptSearchSuggestions;
