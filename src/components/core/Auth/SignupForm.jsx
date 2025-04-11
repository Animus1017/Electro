import React from "react";
import { useForm } from "react-hook-form";
const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <form
      className="flex flex-col gap-6 md:gap-9"
      //   onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-5 ">
        {/* firstname and lastname */}
        <label className="flex flex-col gap-[6px] w-full">
          <p className="flex gap-[2px] text-sm text-richblack-5 items-start">
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
          <p className="flex gap-[2px] text-sm text-richblack-5 items-start">
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
          <p className="flex gap-[2px] text-sm text-richblack-5 items-start">
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
          <div className="flex gap-[2px] text-sm text-richblack-5 items-start">
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
        className="rounded-lg p-3 bg-yellow-50 font-medium text-richblack-900 shadow-[-0.5px_-1.5px_0px_0px_#0000001F_inset]"
        type="submit"
      >
        Register
      </button>
    </form>
  );
};

export default SignupForm;
