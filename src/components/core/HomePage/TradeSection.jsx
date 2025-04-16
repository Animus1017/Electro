// import React from "react";
// import trade from "../../../assets/images/electro-single-banner-h16.png";
// import phone from "../../../assets/images/electro-image-gallery-h16-1.png";
// import headphone from "../../../assets/images/electro-image-gallery-h16-2.png";
// import { useNavigate } from "react-router-dom";
// import Button from "./Button";
// import { LiaAngleRightSolid } from "react-icons/lia";
// const TradeSection = () => {
//   const navigate = useNavigate();
//   return (
//     <div className="flex flex-col gap-6">
//       <div className="relative group rounded-2xl overflow-hidden flex justify-center items-center shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
//         <div className="relative cursor-pointer overflow-hidden">
//           <img src={trade} alt="trade" onClick={() => navigate("/")} />
//           <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.2),rgba(255,255,255,0.2))] transform origin-bottom scale-y-0 transition-transform duration-500 group-hover:scale-y-100 z-20"></div>
//         </div>
//         <div className="flex flex-col items-center gap-10 absolute z-50">
//           <div className="flex flex-col items-center gap-2">
//             <p className="text-2xl text-richblack-700">TRADE YOUR PHONE</p>
//             <p className="text-2xl text-richblack-700">
//               AND RECEIVE UP TO
//               <span className="text-2xl font-bold">$400 DISCOUNT</span>
//             </p>
//             <p className="text-2xl font-bold">FOR NEW DEVICE</p>
//           </div>
//           <Button active={true} linkto="/">
//             READ MORE
//           </Button>
//         </div>
//       </div>
//       <div className="flex justify-between">
//         <div className="relative group rounded-2xl overflow-hidden flex justify-end items-center shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
//           <div className="relative cursor-pointer overflow-hidden">
//             <img
//               src={phone}
//               alt="trade"
//               onClick={() => navigate("/")}
//               className="bg-pure-greys-5"
//             />
//             <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.2),rgba(255,255,255,0.2))] transform origin-bottom scale-y-0 transition-transform duration-500 group-hover:scale-y-100 z-20"></div>
//           </div>
//           <div className="flex flex-col items-center gap-10 absolute z-50 p-6">
//             <div className="flex flex-col">
//               <p className="text-2xl text-richblack-700">TABLETS,</p>
//               <p className="text-2xl text-richblack-700">SMARTPHONES</p>
//               <p className="text-2xl font-bold">AND MORE</p>
//             </div>
//             <div className="flex gap-3 items-center">
//               <p className="text-lg text-richblack-700">
//                 UP <br />
//                 TO
//               </p>
//               <p className="text-[46px] font-bold text-richblack-700">
//                 70
//                 <sup className="text-[28px]">%</sup>
//               </p>
//               <button
//                 className={`transition-all duration-300 h-[30px] w-[30px] flex justify-center items-center rounded-full text-richblack-700 bg-yellow-50 hover:bg-richblack-700 hover:text-white`}
//                 onClick={() => "/"}
//               >
//                 <LiaAngleRightSolid className=" text-2xl" />
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="relative group rounded-2xl overflow-hidden flex items-center shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
//           <div className="relative cursor-pointer overflow-hidden">
//             <img src={headphone} alt="trade" onClick={() => navigate("/")} />
//             <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.2),rgba(255,255,255,0.2))] transform origin-bottom scale-y-0 transition-transform duration-500 group-hover:scale-y-100 z-20"></div>
//           </div>
//           <div className="flex flex-col gap-10 absolute z-50 p-6">
//             <div className="flex flex-col gap-2">
//               <p className="text-2xl font-bold text-richblack-700">
//                 AUDIO STUDIO
//               </p>
//               <p className="text-2xl text-richblack-700">WIRELESS</p>
//             </div>
//             <Button active={true} linkto="/">
//               BUY NOW
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TradeSection;

import React from "react";
import trade from "../../../assets/images/electro-single-banner-h16.png";
import phone from "../../../assets/images/electro-image-gallery-h16-1.png";
import headphone from "../../../assets/images/electro-image-gallery-h16-2.png";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { LiaAngleRightSolid } from "react-icons/lia";

const TradeSection = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 px-4 md:px-0">
      {/* Top Banner */}
      <div className="relative group rounded-2xl overflow-hidden flex justify-center items-center shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        <div className="relative cursor-pointer overflow-hidden">
          <img src={trade} alt="trade" onClick={() => navigate("/")} />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.2),rgba(255,255,255,0.2))] transform origin-bottom scale-y-0 transition-transform duration-500 group-hover:scale-y-100 z-20"></div>
        </div>
        <div className="flex flex-col items-center gap-10 absolute z-50">
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-richblack-700">TRADE YOUR PHONE</p>
            <p className="text-2xl text-richblack-700">
              AND RECEIVE UP TO{" "}
              <span className="text-2xl font-bold">$400 DISCOUNT</span>
            </p>
            <p className="text-2xl font-bold">FOR NEW DEVICE</p>
          </div>
          <Button active={true} linkto="/">
            READ MORE
          </Button>
        </div>
      </div>

      {/* Two Side Cards */}
      <div className="flex flex-wrap gap-6 justify-between">
        {/* Phone Card */}
        <div className="w-full md:w-[48%] relative group rounded-2xl overflow-hidden flex justify-end items-center shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
          <div className="relative cursor-pointer overflow-hidden">
            <img
              src={phone}
              alt="trade"
              onClick={() => navigate("/")}
              className="bg-pure-greys-5"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.2),rgba(255,255,255,0.2))] transform origin-bottom scale-y-0 transition-transform duration-500 group-hover:scale-y-100 z-20"></div>
          </div>
          <div className="flex flex-col items-center gap-10 absolute z-50 p-6">
            <div className="flex flex-col">
              <p className="text-2xl text-richblack-700">TABLETS,</p>
              <p className="text-2xl text-richblack-700">SMARTPHONES</p>
              <p className="text-2xl font-bold">AND MORE</p>
            </div>
            <div className="flex gap-3 items-center">
              <p className="text-lg text-richblack-700">
                UP <br />
                TO
              </p>
              <p className="text-[46px] font-bold text-richblack-700">
                70
                <sup className="text-[28px]">%</sup>
              </p>
              <button
                className={`transition-all duration-300 h-[30px] w-[30px] flex justify-center items-center rounded-full text-richblack-700 bg-yellow-50 hover:bg-richblack-700 hover:text-white`}
                onClick={() => navigate("/")}
              >
                <LiaAngleRightSolid className=" text-2xl" />
              </button>
            </div>
          </div>
        </div>

        {/* Headphone Card */}
        <div className="w-full md:w-[48%] relative group rounded-2xl overflow-hidden flex items-center shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
          <div className="relative cursor-pointer overflow-hidden">
            <img src={headphone} alt="trade" onClick={() => navigate("/")} />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.2),rgba(255,255,255,0.2))] transform origin-bottom scale-y-0 transition-transform duration-500 group-hover:scale-y-100 z-20"></div>
          </div>
          <div className="flex flex-col gap-10 absolute z-50 p-6">
            <div className="flex flex-col gap-2">
              <p className="text-2xl font-bold text-richblack-700">
                AUDIO STUDIO
              </p>
              <p className="text-2xl text-richblack-700">WIRELESS</p>
            </div>
            <Button active={true} linkto="/">
              BUY NOW
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeSection;
