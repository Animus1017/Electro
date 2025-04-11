import React, { useState } from "react";
import { Link } from "react-router-dom";
import VerifyEmail from "../components/core/Auth/VerifyEmail";
import SignupForm from "../components/core/Auth/SignupForm";

const Register = () => {
  const [otpSent, setOtpSent] = useState(false);
  return (
    <div className="flex flex-col gap-8 ">
      <div className="w-11/12 mx-auto">
        <span className="text-sm">
          <Link
            to="/"
            className="hover:text-yellow-100 duration-300 transition-all"
          >
            Home
          </Link>{" "}
          / Create Account
        </span>
      </div>
      <div className="w-11/12 max-w-maxContent mx-auto gap-6">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold">
              {otpSent ? "Verify Email" : "Create New Account"}
            </h1>
            <div className="h-[1.5px] w-full flex">
              <div className="bg-yellow-100 h-full w-1/3"></div>
              <div className="bg-richblack-50 h-full w-2/3"></div>
            </div>
            <p className="text-richblack-800 text-sm">
              {otpSent
                ? "We will send you an otp to verify your email."
                : "Create your own Account"}
            </p>
          </div>
          {otpSent ? <VerifyEmail /> : <SignupForm />}
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Register;
