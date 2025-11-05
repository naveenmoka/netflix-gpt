import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
//import genAI from "../utils/genai";
import { GoogleGenAI } from "@google/genai";
import { API_OPTIONS, GEMINI_KEY } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

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

  const hangleGptSearchClick = async () => {
    console.log(searchText.current.value);
    const ai = new GoogleGenAI({
      apiKey: GEMINI_KEY,
    });

    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies  for the query" +
      searchText.current.value +
      ".only give me names of 5 movies, comma seperated like the example result given ahead. Example Result : MAD, MAD Square, Jaathiratnalu, nuvvu naaku nachav, dhee ";

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: gptQuery,
    });
    const gptMovies = response.text.split(",").map((movie) => movie.trim());
    console.log(gptMovies);

    const promiseArray = gptMovies.map((movie) => searchMovieTMBD(movie));
    const tmbdResults = await Promise.all(promiseArray);
    console.log(tmbdResults);
    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmbdResults })
    );
  };
  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center ">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={hangleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
