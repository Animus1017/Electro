const Profile = require("../models/Profile");
const User = require("../models/User");
const Products = require("../models/Products");
const RatingAndReviews = require("../models/RatingAndReviews");

require("dotenv").config();
exports.createProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const {
      firstName,
      lastName,
      company,
      address1,
      address2,
      city,
      country,
      province,
      zipCode,
      phone,
      defaultShippingAddress,
    } = req.body;
    if (
      !address1 ||
      !city ||
      !country ||
      !province ||
      !zipCode ||
      !phone ||
      !defaultShippingAddress
    )
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    const user = await User.findById(id).populate("additionalDetails").exec();
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    if (defaultShippingAddress) {
      for (const profile of user.additionalDetails) {
        await Profile.findByIdAndUpdate(profile._id, {
          defaultShippingAddress: false,
        });
      }
    }
    const profile = new Profile({
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      company,
      address1,
      address2,
      city,
      country,
      province,
      zipCode,
      phone,
      defaultShippingAddress,
    });
    const createdProfile = await profile.save();
    user.additionalDetails.push(createdProfile._id);
    await user.save();
    const updatedUser = await user.populate("additionalDetails");
    return res.json({
      success: true,
      message: "Profile created successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create profile",
      error: error.message,
    });
  }
};
exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const { profileId } = updates;
    const { id } = req.user;
    const user = await User.findById(id).populate("additionalDetails").exec();
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    if (updates.defaultShippingAddress) {
      for (const profile of user.additionalDetails) {
        await Profile.findByIdAndUpdate(profile._id, {
          defaultShippingAddress: false,
        });
      }
    }
    const profile = await Profile.findById(profileId);
    if (!profile)
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        profile[key] = updates[key];
      }
    }
    await profile.save();
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        user[key] = updates[key];
      }
    }
    await user.save();
    const updatedUser = await user.populate("additionalDetails");
    console.log(updatedUser);

    return res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id).populate("additionalDetails").exec();
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    return res.json({
      success: true,
      message: "Profile fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const { profileId } = req.body;
    if (!profileId) {
      return res.status(400).json({
        success: false,
        message: "Profile ID is required",
      });
    }
    const user = await User.findById(id);
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    await Profile.findByIdAndDelete(profileId);
    await User.findByIdAndUpdate(id, {
      $pull: { additionalDetails: profileId },
    }).save();

    return res.json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete account",
      error: error.message,
    });
  }
};

exports.getBoughtProducts = async (req, res) => {
  try {
    const { id } = req.user;
    let user = await User.findById(id).populate("orders").exec();
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    user = user.toObject();

    return res.json({
      success: true,
      message: "Bought products fetched successfully",
      boughtProducts: user.products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch bought products",
      error: error.message,
    });
  }
};
