import React from "react";

const Spinner = () => {
  return (
    <div className="w-full h-full flex justify-center items-center flex-grow">
      <div
        className="animate-spin inline-block w-16 h-16 border-8 border-current border-t-transparent 0 rounded-full text-richblack-50"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
