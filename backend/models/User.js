const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    accountType: {
      type: String,
      required: true,
      enum: ["Admin", "Customer"],
    },
    additionalDetails: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: "Profile",
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Products",
      },
    ],
    token: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    paymentHistory: {
      type: Schema.Types.ObjectId,
      ref: "Payments",
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
module.exports = User;
