const { Schema, model } = require("mongoose");

const paymentsSchema = new Schema({
  productIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Payments = model("Payments", paymentsSchema);
module.exports = Payments;
