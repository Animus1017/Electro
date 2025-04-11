const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");
const { passwordUpdated } = require("../mail templates/passwordUpdated");
require("dotenv").config();
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        success: false,
        message: "User already exists",
      });
    }
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let response = await OTP.findOne({ otp: otp });
    while (response) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      response = await OTP.findOne({ otp: otp });
    }
    const otpModel = new OTP({
      otp,
      email,
    });
    await otpModel.save();
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp: otp,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password, accountType, otp } = req.body;
    if (!firstName || !lastName || !email || !password || !otp) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    const recentOTP = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    // console.log("here", recentOTP);

    if (!recentOTP.length) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    if (recentOTP[0].otp.toString() !== otp.toString()) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // const newProfile = new Profile({
    //   company: null,
    //   address1: null,
    //   address2: null,
    //   city: null,
    //   country: null,
    //   province: null,
    //   zipCode: null,
    //   phone: null,
    // });
    // const createdProfile = await newProfile.save();
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      // additionalDetails: createdProfile._id,
    });
    createdUser = await newUser.save();
    res.status(200).json({
      success: true,
      message: "User created successfully",
      user: createdUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to hash password",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    let user = await User.findOne({ email }).populate("additionalDetails");

    if (!user)
      return res.status(404).json({
        success: false,
        message: "User is not registed with us.Please SignUp to continue",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: "Incorrect Password" });
    const token = jwt.sign(
      { email: user.email, role: user.accountType, id: user._id },
      process.env.JWT_KEY,
      { expiresIn: "72h" }
    );
    user = user.toObject();
    user.token = token;
    user.password = undefined;
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    return res
      .cookie(process.env.COOKIE_NAME, token, options)
      .status(200)
      .json({
        success: true,
        message: "Logged in successfully",
        data: user,
        token: token,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to authenticate user",
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    if (!oldPassword || !newPassword || !confirmNewPassword)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: "Invalid old password" });
    if (newPassword !== confirmNewPassword)
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    if (newPassword === oldPassword)
      return res.status(400).json({
        success: false,
        message: "New password cannot be the same as old password",
      });
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { password: hashedPassword },
      { new: true }
    );
    try {
      const mailResponse = await mailSender(
        updatedUser.email,
        "Password Change Notification from Electro",
        passwordUpdated(
          updatedUser.email,
          `${updatedUser.firstName} ${updatedUser.lastName}`
        )
      );
      if (!mailResponse) {
        throw new Error("Failed to send password changed email");
      }
      console.log(`PAssword Change success email sent to ${this.email}`);
    } catch (err) {
      console.error(err.message);
    }
    res
      .status(200)
      .json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to change password",
    });
  }
};
