import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import sliderImage1 from "../../../assets/images/electro-slideshow-h16-1.png";
import sliderImage2 from "../../../assets/images/electro-slideshow-h16-2.png";
import Button from "./Button";
import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";

const imgSrc = [sliderImage1, sliderImage2];

const HomeSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden flex flex-col items-center">
      <Swiper
        ref={swiperRef}
        spaceBetween={0}
        effect={"fade"}
        fadeEffect={{ crossFade: true }} // Enable cross fade for proper transition
        navigation={false}
        pagination={{ clickable: false }}
        onSlideChange={handleSlideChange}
        modules={[EffectFade, Navigation]}
        className="w-full h-full"
      >
        {imgSrc.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={img}
                alt={`slider-${index}`}
                className="w-full h-full object-contain"
              />

              {/* Yellow Content Box with fade animation */}
              <div
                className={`hidden md:block transition-opacity duration-700 ease-in-out absolute bottom-10 right-[5%] bg-yellow-100 text-richblack-700 py-5 px-12 rounded-2xl w-fit
                  ${activeIndex === index ? "opacity-100" : "opacity-0"}`}
              >
                <div className="flex flex-col gap-1 items-start">
                  <p className="text-[15px]">New Arrival!</p>
                  <h3 className="text-[26px] font-bold">M3 Super Sprint</h3>
                  <p className="text-sm">
                    13-inch ultimate on-the-go laptop, 15-inch for multitasking.
                  </p>
                  <p className="text-3xl font-medium">$109,900.00</p>
                  <Button active={false} linkto="/" className="bg-yellow-100">
                    START BUYING
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Prev Button */}
      <button
        onClick={handlePrev}
        className={`z-10 transition-all duration-300 bg-richblack-700 hover:bg-black p-5 rounded-full absolute left-[3%] top-[45%] ${
          activeIndex === 0 ? "opacity-50 cursor-not-allowed" : "opacity-100"
        }`}
        disabled={activeIndex === 0}
      >
        <LiaAngleLeftSolid className="text-white text-2xl" />
      </button>

      {/* Custom Next Button */}
      <button
        onClick={handleNext}
        className={`z-10 transition-all duration-300 bg-richblack-700 hover:bg-black p-5 rounded-full absolute right-[3%] top-[45%] ${
          activeIndex === imgSrc.length - 1
            ? "opacity-50 cursor-not-allowed"
            : "opacity-100"
        }`}
        disabled={activeIndex === imgSrc.length - 1}
      >
        <LiaAngleRightSolid className="text-white text-2xl" />
      </button>

      {/* Custom Pagination Dots */}
      <div className="flex gap-4 mt-6">
        {imgSrc.map((_, index) => (
          <div
            key={index}
            onClick={() => swiperRef.current.swiper.slideTo(index)}
            className={`cursor-pointer transition-all duration-500 rounded-3xl h-2 ${
              activeIndex === index
                ? "bg-yellow-100 w-10"
                : "bg-richblack-300 w-2"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HomeSlider;
