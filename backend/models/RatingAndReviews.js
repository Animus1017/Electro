const { Schema, model } = require("mongoose");

const feedbackSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Products",
    required: true,
    index: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  review: {
    type: String,
    required: true,
    maxlength: 500,
  },
});

const RatingAndReviews = model("RatingAndReviews", feedbackSchema);
module.exports = RatingAndReviews;
