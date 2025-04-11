const RatingAndReviews = require("../models/RatingAndReviews");
const Products = require("../models/Products");
const { default: mongoose } = require("mongoose");
exports.createRating = async (req, res) => {
  try {
    const { productId, rating, review } = req.body;
    const userId = req.user.id;
    const product = await Products.findOne({
      _id: productId,
      productCustomers: {
        $elemMatch: {
          $eq: userId,
        },
      },
    });
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "User has not bought the product" });
    const existingRating = await RatingAndReviews.findOne({
      user: userId,
      product: productId,
    });
    if (existingRating)
      return res.status(400).json({
        success: false,
        message: "User has already rated this product",
      });
    const newRating = new RatingAndReviews({
      user: userId,
      rating,
      review,
      product: productId,
    });
    await newRating.save();
    const updatedProduct = await Products.findByIdAndUpdate(
      productId,
      {
        $push: { ratingAndReview: newRating._id },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Rating created successfully",
      product: updatedProduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getAverageRating = async (req, res) => {
  try {
    const { productId } = req.body;
    const result = RatingAndReviews.accumulate([
      {
        $match: { product: new mongoose.Types.ObjectId(productId) },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);
    if (result.length > 0) {
      res.status(200).json({
        success: true,
        message: "Average rating retrieved successfully",
        averageRating: result[0].averageRating,
      });
    }
    res.status(404).json({
      success: false,
      message: "No ratings found for this product",
      averageRating: 0,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: err.message });
  }
};
exports.getAllRating = async (req, res) => {
  try {
    const ratings = await RatingAndReviews.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "product",
        select: "productName",
      })
      .exec();
    res.status(200).json({
      success: true,
      message: "Ratings retrieved successfully",
      ratings,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};
