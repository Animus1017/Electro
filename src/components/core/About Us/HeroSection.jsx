import React from "react";
import hero from "../../../assets/aboutus/hero section banner.png";

const HeroSection = () => {
  return (
    <div className="relative mb-20">
      <img src={hero} alt="" className="w-full h-auto object-cover" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-richblack-800">
          About us
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-richblack-800 mt-4 max-w-2xl">
          Passion may be a friendly or eager interest in or admiration for a
          proposal, cause, discovery, or activity or love to a feeling of
          unusual excitement.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
