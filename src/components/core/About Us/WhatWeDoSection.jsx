import React from "react";
import whatwedo1 from "../../../assets/aboutus/what we do 1.png";
import whatwedo2 from "../../../assets/aboutus/what we do 2.png";
import whatwedo3 from "../../../assets/aboutus/what we do 3.png";

const WhatWeDoSection = () => {
  return (
    <div>
      <div className="flex flex-wrap justify-center gap-8 px-6 mb-20 text-center text-richblack-800">
        <div className="w-full sm:w-[45%] lg:w-[30%]">
          <img src={whatwedo1} alt="" className="mx-auto" />
          <h3 className="text-lg sm:text-xl font-bold p-3">
            What we really do?
          </h3>
          <p className="text-sm sm:text-base px-2">
            Donec libero dolor, tincidunt id laoreet vitae, ullamcorper eu
            tortor. Maecenas pellentesque, dui vitae iaculis mattis, tortor nisi
            faucibus magna, vitae ultrices lacus purus vitae metus.
          </p>
        </div>
        <div className="w-full sm:w-[45%] lg:w-[30%]">
          <img src={whatwedo2} alt="" className="mx-auto pt-1" />
          <h3 className="text-lg sm:text-xl font-bold p-3">
            What we really do?
          </h3>
          <p className="text-sm sm:text-base px-2">
            Donec libero dolor, tincidunt id laoreet vitae, ullamcorper eu
            tortor. Maecenas pellentesque, dui vitae iaculis mattis, tortor nisi
            faucibus magna, vitae ultrices lacus purus vitae metus.
          </p>
        </div>
        <div className="w-full sm:w-[45%] lg:w-[30%]">
          <img src={whatwedo3} alt="" className="mx-auto" />
          <h3 className="text-lg sm:text-xl font-bold p-3">
            What we really do?
          </h3>
          <p className="text-sm sm:text-base px-2">
            Donec libero dolor, tincidunt id laoreet vitae, ullamcorper eu
            tortor. Maecenas pellentesque, dui vitae iaculis mattis, tortor nisi
            faucibus magna, vitae ultrices lacus purus vitae metus.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatWeDoSection;
