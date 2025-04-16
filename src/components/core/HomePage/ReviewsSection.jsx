import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const reviews = [
  {
    review:
      "“Excellent product, delivered sooner than said. Smooth easy purchase. Pleasant cycling experience.”",
    author: "George Croft",
    date: "01/01/2025",
  },
  {
    review:
      "“Amazing quality! Highly recommend this for anyone looking for a smooth ride.”",
    author: "Sarah Johnson",
    date: "10/12/2024",
  },
  {
    review:
      "“Absolutely love it! Exceeded my expectations. Will buy again for sure.”",
    author: "Michael Brown",
    date: "05/08/2024",
  },
];

const ReviewsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <div className="w-full mx-auto flex flex-col items-center gap-8">
      <Swiper
        ref={swiperRef}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        onSlideChange={handleSlideChange}
        modules={[EffectFade]}
        className="w-full"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col gap-12 items-center">
              <div className="flex flex-col items-center gap-5">
                <div className="text-2xl text-yellow-50 tracking-[-.5rem]">
                  ⭐⭐⭐⭐⭐
                </div>
                <p className="text-3xl text-richblack-700 text-center w-4/6">
                  {review.review}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-richblack-700">{review.author}</p>
                <p className="text-sm text-richblack-700">{review.date}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Dots */}
      <div className="flex gap-4 mt-6">
        {reviews.map((_, index) => (
          <div
            key={index}
            onClick={() => swiperRef.current.swiper.slideTo(index)}
            className={`cursor-pointer transition-all duration-500 rounded-3xl h-2 ${
              activeIndex === index
                ? "bg-yellow-50 w-8"
                : "bg-richblack-300 w-2"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;
