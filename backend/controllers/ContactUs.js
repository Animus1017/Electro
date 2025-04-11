const mailSender = require("../utils/mailSender");
const Contact = require("../models/Contact");
const { contactUsConfirmation } = require("../mail templates/contactTemplate");
require("dotenv").config();
exports.contactUs = async (req, res) => {
  const { name, email, phoneNo, message } = req.body;
  if (!name || !email || !phoneNo)
    return res
      .status(400)
      .json({ success: false, message: "Please fill all required fields" });
  const existingContact = await Contact.findOne({ email });
  if (existingContact) {
    existingContact.name = name;
    existingContact.phoneNo = phoneNo;
    if (message) existingContact.message = message;
    await existingContact.save();
  } else {
    const contactMessage = {
      name: name,
      email: email,
      phoneNo: phoneNo,
      message: message,
    };
    const newContact = new Contact(contactMessage);
    await newContact.save();
  }
  const userMailResponse = mailSender(
    email,
    "We've Received Your Message!",
    contactUsConfirmation(`${name}`)
  );
  if (!userMailResponse)
    return res
      .status(500)
      .json({ success: false, message: "Failed to send email" });
  return res.status(200).json({ success: true, message: "Message sent" });
};
