// Import the required modules
const express = require("express");
const router = express.Router();

const {
  capturePayment,
  verifyPayment,
  sendPaymentSuccessEmail,
  fetchAllPaymentsData,
} = require("../controllers/Payments");
const { auth, isCustomer } = require("../middlewares/auth");
router.post("/capturePayment", auth, isCustomer, capturePayment);
router.post("/verifyPayment", auth, isCustomer, verifyPayment);
router.post(
  "/sendPaymentSuccessEmail",
  auth,
  isCustomer,
  sendPaymentSuccessEmail
);
router.get("/fetchPaymentsData", auth, isCustomer, fetchAllPaymentsData);

module.exports = router;
