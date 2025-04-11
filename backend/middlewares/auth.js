const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.auth = (req, res, next) => {
  try {
    const token =
      req.body?.token ||
      req.cookies[process.env.COOKIE_NAME] ||
      req.header("Authorization").replace("Bearer ", "");
    console.log("here", token);

    if (!token)
      return res
        .status(401)
        .json({ status: false, message: "No token provided" });
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      console.log(decoded);

      req.user = decoded;
    } catch (err) {
      return res
        .status(401)
        .json({ status: false, message: "Token expired", error: err.message });
    }
    next();
  } catch (err) {
    res
      .status(401)
      .json({ status: false, message: "Token invalid", error: err.message });
  }
};

exports.isCustomer = (req, res, next) => {
  try {
    if (req.user.role !== "Customer")
      return res
        .status(401)
        .json({ status: false, message: "Protected route for customer only" });
    next();
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "Admin")
      return res
        .status(401)
        .json({ status: false, message: "Protected route for admin only" });
    next();
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};
