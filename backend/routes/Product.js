// Import the required modules
const express = require("express");

// Importing Middlewares
const { auth, isAdmin, isCustomer } = require("../middlewares/auth");
const {
  createProduct,
  updateProduct,
  getProductById,
  deleteProduct,
  getAllProducts,
  addVariant,
  removeVariant,
  addImageToVariant,
  removeImageFromVariant,
} = require("../controllers/Products");
const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReviews");
const {
  createCategory,
  getAllCategory,
  updateCategory,
} = require("../controllers/Category");

const router = express.Router();

// Import the Controllers

// Course Controllers Import

// Categories Controllers Import

// Rating Controllers Import

// ********************************************************************************************************
//                                      Product routes
// ********************************************************************************************************

// Products can Only be Created by Admin
router.post("/createProduct", auth, isAdmin, createProduct);
//Edit a Product
router.put("/editProduct", auth, isAdmin, updateProduct);
// Get all Bought Courses
router.get("/getAllProducts", getAllProducts);
// Get Details for a Specific Products
router.put("/getProductDetails", getProductById);
// Add color code for a product
router.put("/addVariant", auth, isAdmin, addVariant);
// Remove color code from a product
router.put("/removeVariant", auth, isAdmin, removeVariant);
// Add image to color code of a product
router.put("/addImage", auth, isAdmin, addImageToVariant);
// Remove image from color code of a product
router.put("/removeImage", auth, isAdmin, removeImageFromVariant);

// Delete a Product
router.delete("/deleteProduct", auth, isAdmin, deleteProduct);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", getAllCategory);
router.get("/updateCategory", auth, isAdmin, updateCategory);
// router.get("/getCategoryPageDetails", categoryPageDetails);

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isCustomer, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);

module.exports = router;
