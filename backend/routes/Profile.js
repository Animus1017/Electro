const express = require("express");
const router = express.Router();
const { auth, isCustomer } = require("../middlewares/auth");
const {
  deleteProfile,
  updateProfile,
  getProfile,
  getBoughtProducts,
  createProfile,
} = require("../controllers/Profile");

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", auth, isCustomer, deleteProfile);
router.post("/createProfile", auth, isCustomer, createProfile);
router.put("/updateProfile", auth, isCustomer, updateProfile);
router.get("/getUserDetails", auth, getProfile);
// Get Enrolled Courses
router.get("/getBoughtProducts", auth, isCustomer, getBoughtProducts);

module.exports = router;
