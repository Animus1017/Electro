import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { ACCOUNT_TYPE } from "../../../utils/constant";
import { setSignupData } from "../../../redux/slices/authSlice";
import { sendOtp } from "../../../services/operations/authAPI";
const SignupForm = ({ setOtpSent }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const onSubmit = (data) => {
    console.log("here");

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(data.password)) {
      toast.error("Invalid password format");
      return;
    }
    const signupData = { ...data, accountType };
    dispatch(setSignupData(signupData));
    dispatch(sendOtp(data.email, setOtpSent));
  };
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.CUSTOMER);
  const [searchParam, setSearchParam] = useSearchParams();
  useEffect(() => {
    setAccountType(
      searchParam.get("user") ? ACCOUNT_TYPE.ADMIN : ACCOUNT_TYPE.CUSTOMER
    );
  }, [searchParam]);
  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-5 ">
        {/* firstname and lastname */}
        <label className="flex flex-col gap-[6px] w-full">
          <p className="flex gap-[2px] text-sm  items-start">
            First Name<sup className="text-base">*</sup>
          </p>
          <input
            type="text"
            className="rounded-3xl p-3 outline-none w-full border border-richblack-50"
            {...register("firstName", { required: true })}
          />
          {errors.firstName && (
            <span className="-mt-1 text-xs text-pink-200">
              First Name is required**
            </span>
          )}
        </label>
        <label className="flex flex-col gap-[6px] w-full">
          <p className="flex gap-[2px] text-sm  items-start">
            Last Name<sup className="text-base">*</sup>
          </p>
          <input
            type="text"
            className="rounded-3xl p-3 outline-none w-full border border-richblack-50"
            {...register("lastName", { required: true })}
          />
          {errors.lastName && (
            <span className="-mt-1 text-xs text-pink-200">
              Last Name is required**
            </span>
          )}
        </label>

        {/* email */}
        <label className="flex flex-col gap-[6px]">
          <p className="flex gap-[2px] text-sm  items-start">
            Email<sup className="text-base">*</sup>
          </p>
          <input
            type="email"
            className="rounded-3xl p-3 outline-none w-full border border-richblack-50"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="-mt-1 text-xs text-pink-200">
              Email is required**
            </span>
          )}
        </label>
        {/* password */}
        <label className="flex flex-col gap-[6px] w-full">
          <div className="flex gap-[2px] text-sm  items-start">
            Password<sup className="text-base">*</sup>{" "}
          </div>
          <input
            type="password"
            className="rounded-3xl p-3 outline-none w-full border border-richblack-50"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="-mt-1 text-xs text-pink-200">
              Password is required**
            </span>
          )}
        </label>
      </div>
      <button
        className="text-sm font-bold  transition-all duration-300 py-[14px] w-fit px-8 rounded-3xl text-richblack-800 bg-yellow-100 hover:bg-richblack-800 hover:text-white"
        type="submit"
        disabled={loading}
      >
        Register
      </button>
    </form>
  );
};

export default SignupForm;
