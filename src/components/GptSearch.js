import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptSearchSuggestions from "./GptSearchSuggestions";
import { BG_URL } from "../utils/constants";

const GptSearch = () => {
  return (
    <div>
      <div className="fixed -z-10">
        <img className="h-screen object-cover" src={BG_URL} alt="logo" />
      </div>
      <>
        <GptSearchBar />
        <GptSearchSuggestions />
      </>
    </div>
  );
};

export default GptSearch;
