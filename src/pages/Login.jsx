import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/core/Auth/LoginForm";
import Spinner from "../components/common/Spinner";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa6";
import ForgotPassword from "../components/core/Auth/ForgotPassword";

const Login = () => {
  const [reset, setReset] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { loading } = useSelector((state) => state.auth);
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="flex flex-col gap-7 text-richblack-800">
      <div className="w-11/12 mx-auto">
        <span className="text-sm">
          <Link
            to="/"
            className="hover:text-yellow-100 duration-300 transition-all"
          >
            Home
          </Link>{" "}
          / Account
        </span>
      </div>
      <div className="w-11/12 max-w-maxContent mx-auto gap-16 flex">
        <div className="flex flex-col gap-8 flex-grow">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl font-bold">
                {reset ? "Reset Password" : "Login"}
              </h1>
              <div className="h-[1.5px] w-full flex">
                <div className="bg-yellow-100 h-full w-1/4"></div>
                <div className="bg-richblack-50 h-full w-3/4"></div>
              </div>
              <p className="text-richblack-800 text-sm">
                {emailSent
                  ? "We've sent you an email with a link to update your password."
                  : reset
                  ? "We will send you an email to reset your password."
                  : "Welcome back! Sign in to your account"}
              </p>
            </div>
            {reset ? (
              <ForgotPassword
                setReset={setReset}
                setEmailSent={setEmailSent}
                emailSent={emailSent}
              />
            ) : (
              <LoginForm setReset={setReset} />
            )}
          </div>
        </div>
        <div className="border border-richblack-50"></div>
        <div className="flex flex-col gap-5 flex-grow items-start">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold">Create New Account</h1>
            <div className="h-[1.5px] w-full flex">
              <div className="bg-yellow-100 h-full w-1/3"></div>
              <div className="bg-richblack-50 h-full w-2/3"></div>
            </div>
            <p className="text-richblack-800 text-sm">
              Create your own Account
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-lg">Sign up today and you'll be able to :</p>
            <ul className="flex flex-col gap-2">
              <li className="flex items-center gap-1 text-sm">
                {" "}
                <FaCheck className="text-green-50" /> Speed your way through the
                checkout
              </li>
              <li className="flex items-center gap-1 text-sm">
                <FaCheck className="text-green-50" /> Track your orders easily
              </li>
              <li className="flex items-center gap-1 text-sm">
                <FaCheck className="text-green-50" /> Keep a record of all your
                purchases
              </li>
            </ul>
          </div>
          <button
            disabled={loading}
            className="text-sm font-bold  transition-all duration-300 py-[14px] w-fit px-8 rounded-3xl text-richblack-800 bg-yellow-100 hover:bg-richblack-800 hover:text-white"
          >
            <Link to="/register">Register</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
