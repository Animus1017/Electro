import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ active, children, linkto }) => {
  const navigate = useNavigate();
  return (
    <button
      className={`text-sm font-bold  transition-all duration-300 py-[10px] w-fit px-6 rounded-3xl ${
        active
          ? "text-richblack-700 bg-yellow-50 hover:bg-richblack-700 hover:text-white"
          : "bg-richblack-700 hover:bg-black text-white"
      }`}
      onClick={() => navigate(linkto)}
    >
      {children}
    </button>
  );
};

export default Button;
