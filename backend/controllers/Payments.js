const User = require("../models/User");
const Products = require("../models/Products");
const { default: mongoose } = require("mongoose");
const { instance } = require("../config/razorpay");
const mailSender = require("../utils/mailSender");
const crypto = require("crypto");
const { log } = require("console");
const Payments = require("../models/Payments");
const {
  productOrderedEmail,
} = require("../mail templates/productOrderedEmail");
const {
  paymentSuccessEmail,
} = require("../mail templates/paymentSuccessEmail");
// exports.capturePayment = async (req, res) => {
//   try {
//     const { courseId } = req.body;
//     const { id } = req.user;
//     if (!courseId)
//       return res.status(400).json({
//         success: false,
//         message: "Please provide courseId and userId",
//       });
//     const course = await Courses.findById(courseId);
//     if (!course)
//       return res.status(404).json({
//         success: false,
//         message: "Course not found",
//       });
//     const uid = new mongoose.Types.ObjectId(id);
//     if (course.courseStudents.includes(uid))
//       return res.status(400).json({
//         success: false,
//         message: "User already enrolled in this course",
//       });
//     const amount = course.coursePrice;
//     const currency = "INR";
//     const options = {
//       amount: amount * 100,
//       currency: currency,
//       receipt: Math.random(Date.now()).toString(),
//       notes: {
//         courseId: courseId,
//         userId: uid,
//       },
//     };
//     const paymentResponse = instance.orders.create(options);
//     return res.status(200).json({
//       success: true,
//       courseName: course.courseName,
//       courseDescription: course.courseDescription,
//       thumbnail: course.courseThumbnail,
//       orderId: paymentResponse.id,
//       currency: paymentResponse.currency,
//       amount: paymentResponse.amount,
//     });
//   } catch (err) {
//     console.error(err.message);
//     return res.status(500).json({
//       success: false,
//       message: "Server Error",
//       error: err.message,
//     });
//   }
// };

// exports.verifySignature = async (req, res) => {
//   try {
//     const webhookSecret = "12345678";
//     const signature = req.headers["x-razorpay-signature"];
//     const shasum = crypto.createHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");
//     if (digest === signature) {
//       const { courseId, userId } = req.body.payload.payment.entity.notes;
//       const enrolledCourse = await Courses.findByIdAndUpdate(
//         courseId,
//         {
//           $push: { courseStudents: userId },
//         },
//         { new: true }
//       );
//       if (!enrolledCourse)
//         return res.status(404).json({
//           success: false,
//           message: "Course not found",
//         });
//       const enrolledStudent = await User.findByIdAndUpdate(
//         userId,
//         {
//           $push: { courses: courseId },
//         },
//         { new: true }
//       );
//       if (!enrolledStudent)
//         return res.status(404).json({
//           success: false,
//           message: "User not found",
//         });
//       const mailResponse = await mailSender(
//         enrolledStudent.email,
//         "Course Enrollment email from StudyNotion",
//         courseEnrollmentEmail(
//           enrolledCourse.courseName,
//           `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
//         )
//       );
//       if (!mailResponse)
//         return res.status(500).json({
//           success: false,
//           message: "Failed to send email",
//         });
//       return res.status(200).json({
//         success: true,
//         message: "Payment verified and course enrolled successfully",
//       });
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid webhook signature",
//       });
//     }
//   } catch (error) {
//     console.error(error.message);
//     return res.status(500).json({
//       success: false,
//       message: "Server Error",
//       error: error.message,
//     });
//   }
// };

// exports.capturePayment = async (req, res) => {
//   try {
//     const { products } = req.body;

//     const { id } = req.user;
//     if (products.length === 0)
//       return res
//         .status(400)
//         .json({ success: false, message: "Please provide products" });
//     let totalAmount = 0;
//     for (const productId of products) {
//       const product = await Products.findById(productId);
//       if (!product)
//         return res
//           .status(404)
//           .json({ success: false, message: `${product.productName} not found` });
//       const userId = new mongoose.Types.ObjectId(id);
//       if (product.productCustomers.includes(userId))
//         return res.status(400).json({
//           success: false,
//           message: `User already enrolled in ${course.courseName}`,
//         });
//       totalAmount += course.coursePrice;
//     }
//     const currency = "INR";
//     const options = {
//       amount: totalAmount * 100,
//       currency: currency,
//       receipt: Math.random(Date.now()).toString(),
//     };
//     const paymentResponse = await instance.orders.create(options);
//     console.log("Payment Response:", paymentResponse);
//     return res.status(200).json({
//       success: true,
//       message: paymentResponse,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       success: false,
//       message: "Could not initiate order",
//       error: err.message,
//     });
//   }
// };

exports.capturePayment = async (req, res) => {
  try {
    const { products } = req.body;
    const { id } = req.user;
    if (!products || products.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide products" });
    }

    let totalAmount = 0;

    for (const item of products) {
      const { productId, quantity } = item;

      const product = await Products.findById(productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product with ID ${productId} not found`,
        });
      }

      totalAmount += product.productPrice * (quantity || 1);
    }

    const currency = "INR";
    const options = {
      amount: totalAmount * 100,
      currency: currency,
      receipt: `receipt_${Date.now()}`,
    };

    const paymentResponse = await instance.orders.create(options);
    console.log("Payment Response:", paymentResponse);

    return res.status(200).json({
      success: true,
      message: paymentResponse,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Could not initiate order",
      error: err.message,
    });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const amount = req.body?.amount;
    const products = req.body?.products;
    const { id } = req.user;
    if (
      !razorpay_payment_id ||
      !razorpay_order_id ||
      !razorpay_signature ||
      !products ||
      !id
    )
      return res
        .status(400)
        .json({ success: false, message: "Invalid payment details" });
    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");
    if (expectedSignature === razorpay_signature) {
      await orderProducts(
        products,
        id,
        razorpay_order_id,
        razorpay_payment_id,
        amount,
        res
      );
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Signature" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to verify payment",
      error: error.message,
    });
  }
};

async function orderProducts(
  products,
  userId,
  razorpay_order_id,
  razorpay_payment_id,
  amount,
  res
) {
  try {
    if (!products.length || !userId)
      return res
        .status(400)
        .json({ success: false, message: "Invalid product or user details" });
    for (const productId of products) {
      const boughtProduct = await Products.findByIdAndUpdate(
        productId,
        {
          $push: { productCustomers: userId },
        },
        { new: true }
      );
      if (!boughtProduct)
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });

      const customer = await User.findByIdAndUpdate(
        userId,
        {
          $push: { orders: productId },
        },
        { new: true }
      );
      if (!customer)
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      const mailResponse = await mailSender(
        customer.email,
        "Order email from Electro",
        productOrderedEmail(
          boughtProduct.productName,
          `${customer.firstName} ${customer.lastName}`
        )
      );
      if (!mailResponse)
        return res.status(500).json({
          success: false,
          message: "Failed to send email",
        });
    }
    const payment = await Payments.create({
      userId: userId,
      productIds: products,
      amount: amount / 100,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
    if (!payment)
      return res.status(500).json({
        success: false,
        message: "Failed to create payment record",
      });

    return res.status(200).json({
      success: true,
      message: "Payment successful and products ordered successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to place order",
      error: error.message,
    });
  }
}
exports.fetchAllPaymentsData = async (req, res) => {
  try {
    const payments = await Payments.find().populate("productIds");
    return res.status(200).json({
      success: true,
      message: "All payments fetched successfully",
      payments: payments,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch payments data",
      error: error.message,
    });
  }
};

exports.sendPaymentSuccessEmail = async (req, res) => {
  try {
    const { orderId, paymentId, amount } = req.body;
    console.log("issue", req.body, req.user);

    const { id } = req.user;
    if (!orderId || !paymentId || !amount || !id)
      return res
        .status(400)
        .json({ success: false, message: "Invalid payment details" });
    const user = await User.findById(id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    const mailResponse = await mailSender(
      user.email,
      "Payment Recieved email from Electro",
      paymentSuccessEmail(
        `${user.firstName} ${user.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    );
    if (!mailResponse)
      return res.status(500).json({
        success: false,
        message: "Failed to send email",
      });
    return res.status(200).json({
      success: true,
      message: "Payment success email sent successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};
