import React from "react";
import faq from "../../../assets/images/electro-faq-h16.png";
import Button from "./Button";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
const data = [
  {
    question: "Can I pay for my Electric Bike in parts?",
    answer:
      "Yes, you can ride Joyor in the rain with the general slippery road precautions. Do not ride or place the scooter anywhere with a water level higher then 5cm, in order to avoid potential damage of the battery and other parts, Electric scooter models with big 10″ wheels X and Y are more stable on the slippery roads than electric scooter models with smaller wheels H1, A and series. You can check other Joyor electric scooter safety instructions in the User Manual.",
  },
  {
    question: "Does Electro ship to Europe outside United Kingdom?",
    answer:
      "Yes, you can ride Joyor in the rain with the general slippery road precautions. Do not ride or place the scooter anywhere with a water level higher then 5cm, in order to avoid potential damage of the battery and other parts, Electric scooter models with big 10″ wheels X and Y are more stable on the slippery roads than electric scooter models with smaller wheels H1, A and series. You can check other Joyor electric scooter safety instructions in the User Manual.",
  },
  {
    question: "How can I try Electric Bike?",
    answer:
      "Yes, you can ride Joyor in the rain with the general slippery road precautions. Do not ride or place the scooter anywhere with a water level higher then 5cm, in order to avoid potential damage of the battery and other parts, Electric scooter models with big 10″ wheels X and Y are more stable on the slippery roads than electric scooter models with smaller wheels H1, A and series. You can check other Joyor electric scooter safety instructions in the User Manual.",
  },
  {
    question: "How long is the Electric Bike battery life?",
    answer:
      "Yes, you can ride Joyor in the rain with the general slippery road precautions. Do not ride or place the scooter anywhere with a water level higher then 5cm, in order to avoid potential damage of the battery and other parts, Electric scooter models with big 10″ wheels X and Y are more stable on the slippery roads than electric scooter models with smaller wheels H1, A and series. You can check other Joyor electric scooter safety instructions in the User Manual.",
  },
  {
    question: "Can I use Electric Bike in the rain?",
    answer:
      "Yes, you can ride Joyor in the rain with the general slippery road precautions. Do not ride or place the scooter anywhere with a water level higher then 5cm, in order to avoid potential damage of the battery and other parts, Electric scooter models with big 10″ wheels X and Y are more stable on the slippery roads than electric scooter models with smaller wheels H1, A and series. You can check other Joyor electric scooter safety instructions in the User Manual.",
  },
];
const FaqsSection = () => {
  return (
    <div className="flex justify-between gap-20 items-center flex-col-reverse md:flex-row">
      <div className="w-full md:w-1/2 relative">
        <img src={faq} alt="faq" className="w-full h-full cursor-pointer" />
        {/* Yellow Box */}
        <div className="bg-yellow-50 text-richblack-700 py-5 px-12 rounded-2xl w-full md:w-1/2 absolute md:-bottom-[3%] md:left-[5%] mt-6 md:mt-0">
          <div className="flex flex-col gap-4 items-start ">
            <h3 className="text-2xl font-medium text-richblack-700">
              Trust our Experience We Gained Since 1999
            </h3>
            <p className="text-[15px] text-richblack-700">
              Don’t hesitate to ask our team.
            </p>
            <Button active={false} linkto="/" className="bg-yellow-50">
              START NEW CHAT
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col gap-10">
        <h2 className="text-4xl font-medium text-richblack-700">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col gap-2">
          {data.map((item, index) => (
            <div key={index}>
              <details className="group">
                <summary className="cursor-pointer list-none text-lg text-richblack-700 font-medium flex gap-3 items-center ">
                  <FaPlus className="group-open:hidden text-sm text-richblack-700 " />
                  <FaMinus className="[&:not(group-open)]:hidden group-open:inline text-sm text-richblack-700" />
                  {item.question}
                </summary>
                <p className="text-justify text-[15px] text-richblack-700 p-3 rounded-lg mt-2 ml-6 bg-pure-greys-5">
                  {item.answer}
                </p>
              </details>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqsSection;
