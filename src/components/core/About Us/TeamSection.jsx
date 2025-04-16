import React from "react";
import team1 from "../../../assets/aboutus/team 1.png";
import team2 from "../../../assets/aboutus/team 2.png";
import team3 from "../../../assets/aboutus/team 3.png";
import team4 from "../../../assets/aboutus/team 4.png";
import team5 from "../../../assets/aboutus/team 5.png";
import team6 from "../../../assets/aboutus/team 6.png";

const TeamSection = () => {
  return (
    <div className="flex flex-wrap justify-center gap-14 text-center mb-14 bg-pure-greys-5 py-20 px-10 text-richblack-800">
      <div>
        <img src={team1} alt="" className="rounded-full w-44 h-44" />
        <h3 className="font-bold text-xl p-1">Thomas Snow</h3>
        <p className="text-sm">Ceo Founder</p>
      </div>
      <div>
        <img src={team2} alt="" className="rounded-full w-44 h-44" />
        <h3 className="font-bold text-xl p-1">Anna Baranov</h3>
        <p className="text-sm">Client Care</p>
      </div>
      <div>
        <img src={team3} alt="" className="rounded-full w-44 h-44" />
        <h3 className="font-bold text-xl p-1">Andrei Kowalsy</h3>
        <p className="text-sm">Support Boss</p>
      </div>
      <div>
        <img src={team4} alt="" className="rounded-full w-44 h-44" />
        <h3 className="font-bold text-xl p-1">Pamela Doe</h3>
        <p className="text-sm">Delivery Driver</p>
      </div>
      <div>
        <img src={team5} alt="" className="rounded-full w-44 h-44" />
        <h3 className="font-bold text-xl p-1">Susan McCain</h3>
        <p className="text-sm">Packaging Girl</p>
      </div>
      <div className="mb-5">
        <img src={team6} alt="" className="rounded-full w-44 h-44" />
        <h3 className="font-bold text-xl p-1">See Details</h3>
      </div>
    </div>
  );
};

export default TeamSection;
