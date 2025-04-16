// import React from "react";
// import Footer from "../components/common/Footer";
// import HomeSlider from "../components/core/HomePage/HomeSlider";
// import delivery from "../assets/homepage icons/delivery.svg";
// import feedback from "../assets/homepage icons/feedback.svg";
// import returnImg from "../assets/homepage icons/return.svg";
// import payment from "../assets/homepage icons/payment.svg";
// import ActivitySection from "../components/core/HomePage/ActivitySection";
// import TradeSection from "../components/core/HomePage/TradeSection";
// import ReviewsSection from "../components/core/HomePage/ReviewsSection";
// import FaqsSection from "../components/core/HomePage/FaqsSection";

// const Home = () => {
//   return (
//     <div>
//       <div className="flex flex-col items-center gap-8">
//         <div className="flex flex-col items-center gap-8 w-full">
//           <p className="text-[42px] font-thin flex flex-col items-center text-center px-4">
//             Sails through work and play. <br />
//             <span className="font-bold">Designed to go places.</span>
//           </p>

//           {/* HomeSlider container with max-width */}
//           <div className="w-full max-w-[1400px] mx-auto px-4">
//             <HomeSlider />
//           </div>
//         </div>

//         <div className="w-full flex flex-wrap justify-around gap-4 px-6 py-10">
//           <div className="flex gap-4 items-center min-w-[200px]">
//             <img src={delivery} alt="delivery" className="w-10 h-10" />
//             <div className="flex flex-col">
//               <h4 className="font-bold text-richblack-700">Free Delivery</h4>
//               <p className="text-richblack-700">from $50</p>
//             </div>
//           </div>

//           <div className="flex gap-4 items-center min-w-[200px]">
//             <img src={feedback} alt="feedback" className="w-10 h-10" />
//             <div className="flex flex-col">
//               <h4 className="font-bold text-richblack-700">99% Customer</h4>
//               <p className="text-richblack-700">Feedbacks</p>
//             </div>
//           </div>

//           <div className="flex gap-4 items-center min-w-[200px]">
//             <img src={returnImg} alt="return" className="w-10 h-10" />
//             <div className="flex flex-col">
//               <h4 className="font-bold text-richblack-700">365 Days</h4>
//               <p className="text-richblack-700">for free return</p>
//             </div>
//           </div>

//           <div className="flex gap-4 items-center min-w-[200px]">
//             <img src={payment} alt="payment" className="w-10 h-10" />
//             <div className="flex flex-col">
//               <h4 className="font-bold text-richblack-700">Payment</h4>
//               <p className="text-richblack-700">Secure System</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ActivitySection with max-width */}
//       <div className="w-full max-w-[1400px] mx-auto px-4">
//         <ActivitySection />
//       </div>

//       {/* TradeSection with max-width */}
//       <div className="w-full max-w-[1400px] mx-auto px-4">
//         <TradeSection />
//       </div>

//       <div className="w-full max-w-[1400px] mx-auto px-4">
//         <ReviewsSection />
//       </div>

//       <div className="w-full max-w-[1400px] mx-auto px-4">
//         <FaqsSection />
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Home;

import React from "react";
import Footer from "../components/common/Footer";
import HomeSlider from "../components/core/HomePage/HomeSlider";
import delivery from "../assets/homepage icons/delivery.svg";
import feedback from "../assets/homepage icons/feedback.svg";
import returnImg from "../assets/homepage icons/return.svg";
import payment from "../assets/homepage icons/payment.svg";
import ActivitySection from "../components/core/HomePage/ActivitySection";
import TradeSection from "../components/core/HomePage/TradeSection";
import ReviewsSection from "../components/core/HomePage/ReviewsSection";
import FaqsSection from "../components/core/HomePage/FaqsSection";

const Home = () => {
  return (
    <div>
      {/* Hero Text and Slider */}
      <div className="flex flex-col items-center gap-8 py-10">
        <div className="flex flex-col items-center gap-8 w-full">
          <p className="text-[42px] font-thin flex flex-col items-center text-center px-4">
            Sails through work and play. <br />
            <span className="font-bold">Designed to go places.</span>
          </p>

          <div className="w-full max-w-[1400px] mx-auto px-4">
            <HomeSlider />
          </div>
        </div>

        {/* Icons Row */}
        <div className="w-full flex flex-wrap justify-around gap-4 px-6 py-10">
          {[
            { icon: delivery, title: "Free Delivery", desc: "from $50" },
            { icon: feedback, title: "99% Customer", desc: "Feedbacks" },
            { icon: returnImg, title: "365 Days", desc: "for free return" },
            { icon: payment, title: "Payment", desc: "Secure System" },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-center min-w-[200px]">
              <img src={item.icon} alt={item.title} className="w-10 h-10" />
              <div className="flex flex-col">
                <h4 className="font-bold text-richblack-700">{item.title}</h4>
                <p className="text-richblack-700">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Section */}
      <div className="w-full max-w-[1400px] mx-auto px-4 mb-20">
        <ActivitySection />
      </div>

      {/* Trade Section */}
      <div className="w-full max-w-[1400px] mx-auto px-4 my-20">
        <TradeSection />
      </div>

      {/* Reviews Section */}
      <div className="w-full max-w-[1400px] mx-auto px-4 my-20">
        <ReviewsSection />
      </div>

      {/* FAQs Section */}
      <div className="w-full max-w-[1400px] mx-auto px-4 my-20">
        <FaqsSection />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
