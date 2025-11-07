import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
//import genAI from "../utils/genai";
import { GoogleGenAI } from "@google/genai";
import { API_OPTIONS, GEMINI_KEY } from "../utils/constants";
import {
  addGptMovieResult,
  startLoading,
  stopLoading,
} from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  // 🔍 Fetch movies from TMDB API
  const searchMovieTMBD = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  // 🔥 GPT Search Handler
  const handleGptSearchClick = async () => {
    const query = searchText.current.value?.trim();

    if (!query) return; // prevent empty search

    // 🔥 Start shimmer (loading = true)
    dispatch(startLoading());

    try {
      const ai = new GoogleGenAI({
        apiKey: GEMINI_KEY,
      });

      const gptQuery =
        "Act as a Movie Recommendation system and suggest some movies for the query: " +
        query +
        ". Only give me names of 5 movies, comma separated. Example Result: MAD, MAD Square, Jaathiratnalu, Nuvvu Naaku Nachav, Dhee.";

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: gptQuery,
      });

      // ✅ Extract movie names (split by commas)
      const gptMovies = response.text.split(",").map((movie) => movie.trim());

      console.log("🎬 GPT Suggested Movies:", gptMovies);

      // 🔍 Fetch movie details from TMDB for each suggestion
      const promiseArray = gptMovies.map((movie) => searchMovieTMBD(movie));
      const tmdbResults = await Promise.all(promiseArray);

      console.log("📽️ TMDB Results:", tmdbResults);

      // ✅ Store results in Redux
      dispatch(
        addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
      );
    } catch (error) {
      console.error("❌ GPT Search Error:", error);
      dispatch(stopLoading());
    }
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12 rounded-md shadow-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Input Field */}
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />

        {/* Search Button */}
        <button
          type="button"
          onClick={handleGptSearchClick}
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white font-semibold rounded-md hover:bg-red-800 hover:scale-[1.05] transition-all duration-200"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
