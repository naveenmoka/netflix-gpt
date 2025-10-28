import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video px-24 pt-[15%] absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="py-6 text-sm w-1/4">{overview}</p>
      <div>
        <button className="bg-white text-black p-2 px-8 text-lg hover:bg-opacity-50 rounded-lg">
          ▶ Play
        </button>
        <button className="bg-gray-500 mx-2 text-white p-2 px-8 text-lg  hover:bg-opacity-50 rounded-lg">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
