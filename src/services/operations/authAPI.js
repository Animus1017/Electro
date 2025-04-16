import { toast } from "react-hot-toast";
// import { resetCart } from "../../slices/cartSlice";
import { endpoints } from "../apis";
import { setLoading, setToken } from "../../redux/slices/authSlice";
import { apiConnector } from "../apiConnector";
import { setUser } from "../../redux/slices/profileSlice";
const COOKIE_NAME = process.env.REACT_APP_COOKIE_NAME || "Electro";
const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;

export function sendOtp(email, setOtpSent) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      });
      console.log("SENDOTP API RESPONSE............", response);

      console.log(response.data.success);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      setOtpSent(true);
    } catch (error) {
      console.log("SENDOTP API ERROR............", error);
      toast.error(error?.response?.data?.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      console.log("LOGIN API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successfull");
      dispatch(setToken(response.data.token));

      dispatch(setUser(response.data.data));
      localStorage.setItem(COOKIE_NAME, JSON.stringify(response.data.token));
      navigate("/account");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error(error?.response?.data?.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function logoutFn(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    // dispatch(resetCart());
    localStorage.removeItem(COOKIE_NAME);
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };
}

export function sendResetPasswordToken(email, setEmailSent) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      });

      console.log("RESETPASSTOKEN RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setEmailSent(true);
    } catch (error) {
      console.log("RESETPASSTOKEN ERROR............", error);
      toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}

export function resetPassword(
  setLinkSent,
  password,
  confirmPassword,
  token,
  setEmail
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      });
      console.log("RESETPASSWORD RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password Reset Successfully");
      setLinkSent(true);
      setEmail(response.data?.data);
    } catch (error) {
      console.log("RESETPASSWORD ERROR............", error);
      toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}
export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    // console.log(
    //   firstName,
    //   lastName,
    //   email,
    //   password,
    //   confirmPassword,
    //   accountType,
    //   otp
    // );

    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        otp,
      });
      console.log("REGISTER API RESPONSE............", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Registered Successfully");
      navigate("/login");
    } catch (error) {
      console.log("REGISTER API ERROR............", error);
      toast.error(error?.response?.data?.message);
      navigate("/register");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
