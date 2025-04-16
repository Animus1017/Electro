import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import OtpInput from "react-otp-input";
import { IoMdTimer } from "react-icons/io";
import Spinner from "../../common/Spinner";
import { sendOtp, signUp } from "../../../services/operations/authAPI";
const VerifyEmail = ({ setOtpSent }) => {
  const { loading, signupData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  console.log(signupData);
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(signupData, otp);
    const { firstName, lastName, email, password, accountType } = signupData;
    dispatch(
      signUp(accountType, firstName, lastName, email, password, otp, navigate)
    );
  };
  useEffect(() => {
    if (!signupData) navigate("/register");
  }, []);
  return loading ? (
    <Spinner />
  ) : (
    <div className="flex flex-col gap-6 w-4/6 ">
      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <div className="w-full">
          <OtpInput
            value={otp}
            onChange={(value) => {
              const cleanedOtp = value.replace(/[^0-9]/g, "");
              setOtp(cleanedOtp);
            }}
            numInputs={6}
            containerStyle="flex justify-between w-full"
            renderInput={(props) => (
              <input
                {...props}
                placeholder="-"
                className="w-12 h-12 p-2 bg-richblack-50  outline-none 
                   rounded-lg text-center shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset] focus:shadow-[0px_0px_0px_2px_#E7C009]"
                style={{ boxSizing: "border-box" }}
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-3">
          <button
            className="text-sm font-bold  transition-all duration-300 py-[14px] w-fit px-8 rounded-3xl text-richblack-800 bg-yellow-100 hover:bg-richblack-800 hover:text-white"
            type="submit"
          >
            Verify email
          </button>
          <div className="p-3 flex justify-between text-richblack-800">
            <Link
              to="/login"
              className=" flex gap-2 font-medium items-center hover:text-yellow-100 duration-300 transition-all"
            >
              <FaArrowLeftLong className="text-lg" />
              Back to Login
            </Link>
            <button
              className="flex gap-2 font-medium items-center  hover:text-yellow-100 duration-300 transition-all"
              onClick={() => dispatch(sendOtp(signupData?.email, setOtpSent))}
            >
              <IoMdTimer className="text-lg" />
              Resend it
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VerifyEmail;
