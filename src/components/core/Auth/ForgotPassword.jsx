import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../common/Spinner";
import { useForm } from "react-hook-form";
import { sendResetPasswordToken } from "../../../services/operations/authAPI";

const ForgotPassword = ({ setReset, setEmailSent, emailSent }) => {
  //   const [email, setEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    // setEmail(data.email);
    dispatch(sendResetPasswordToken(data.email, setEmailSent));
  };
  if (emailSent) {
    return <div></div>;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <label className="flex flex-col gap-[6px]">
        <p className="flex gap-[2px] text-sm  items-start">
          Email Address<sup className="text-base">*</sup>
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
      <div className="flex gap-5 items-center">
        <button
          className="text-sm font-bold  transition-all duration-300 py-[14px] w-fit px-8 rounded-3xl text-richblack-800 bg-yellow-100 hover:bg-richblack-800 hover:text-white"
          type="submit"
        >
          Submit
        </button>
        <button
          className="text-sm font-bold  transition-all duration-300 py-[14px] w-fit px-8 rounded-3xl bg-richblack-800 hover:bg-black text-white"
          onClick={() => setReset(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ForgotPassword;
