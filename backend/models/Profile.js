const { Schema, model } = require("mongoose");

const profileSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  company: {
    type: String,
    trim: true,
  },
  address1: {
    type: String,
    trim: true,
  },
  address2: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  country: {
    type: String,
    trim: true,
  },
  province: {
    type: String,
    trim: true,
  },
  zipCode: {
    type: Number,
    trim: true,
  },
  phone: {
    type: Number,
    trim: true,
  },
  defaultShippingAddress: {
    type: Boolean,
    default: false,
  },
});

const Profile = model("Profile", profileSchema);
module.exports = Profile;
