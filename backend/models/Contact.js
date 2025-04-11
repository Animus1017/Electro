const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  name: {
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
  phoneNo: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    trim: true,
  },
});

const Contact = model("Contact", contactSchema);
module.exports = Contact;
