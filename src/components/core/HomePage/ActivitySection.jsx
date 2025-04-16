import React from "react";
import computer from "../../../assets/activity/electro-cat-h16-1.png";
import smartwatch from "../../../assets/activity/electro-cat-h16-2.png";
import earphones from "../../../assets/activity/electro-cat-h16-3.png";
import camera from "../../../assets/activity/electro-cat-h16-4.png";
import { useNavigate } from "react-router-dom";
const data = [
  {
    title: "Computers",
    img: computer,
    linkto: "/",
  },
  {
    title: "Smartwatches",
    img: smartwatch,
    linkto: "/",
  },
  {
    title: "Earphones",
    img: earphones,
    linkto: "/",
  },
  {
    title: "Sport Cameras",
    img: camera,
    linkto: "/",
  },
];

const ActivitySection = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-10">
      <h2 className="text-[32px] text-richblack-700">Whats Your Activity</h2>
      <div className="flex gap-5">
        {data.map((item, index) => (
          <div key={index} className="relative group">
            <div
              className="relative cursor-pointer"
              onClick={() => navigate(item.linkto)}
            >
              <img src={item.img} alt={item.title} />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.2),rgba(255,255,255,0.2))] transform origin-bottom scale-y-0 transition-transform duration-500 group-hover:scale-y-100 z-20"></div>
            </div>

            <div className="text-white absolute bottom-0 p-5">
              <h3 className="text-[26px]">{item.title}</h3>
              <p className="text-[15px]">from $599</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivitySection;
