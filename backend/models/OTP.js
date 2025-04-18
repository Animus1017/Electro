const { Schema, model } = require("mongoose");
const otpTemplate = require("../mail templates/otpTemplate");
const mailSender = require("../utils/mailSender");
// const mailSender = require("../utils/mailSender");
// const otpTemplate = require("../mailTemplates/emailVerificationTemplate");

const otpSchema = new Schema({
  otp: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 60 * 5,
  },
});

otpSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const mailResponse = await mailSender(
        this.email,
        "Verification email from Electro",
        otpTemplate(this.otp)
      );
      if (!mailResponse) {
        throw new Error("Failed to send verification email");
      }
      console.log(`Verification email sent to ${this.email}`);
    } catch (err) {
      console.error(err.message);
    }
  }
  next();
});

const OTP = model("OTP", otpSchema);
module.exports = OTP;
