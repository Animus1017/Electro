import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../services/operations/authAPI";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const LoginForm = ({ setReset }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const onSubmit = (data) => {
    dispatch(login(data.email, data.password, navigate));
  };
  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-5 ">
        {/* email */}
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
      <div className="flex items-center justify-between text-richblack-800">
        <Link
          to="/"
          className="hover:text-yellow-100 duration-300 transition-all"
        >
          Return to Store
        </Link>
        <button
          onClick={() => setReset(true)}
          className="hover:text-yellow-100 duration-300 transition-all"
        >
          Forgot Password
        </button>
      </div>
      <button
        className="text-sm font-bold  transition-all duration-300 py-[14px] w-fit px-8 rounded-3xl text-richblack-800 bg-yellow-100 hover:bg-richblack-800 hover:text-white"
        type="submit"
        disabled={loading}
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
