const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const productsRoutes = require("./routes/Product");
const paymentsRoutes = require("./routes/Payments");
const profileRoutes = require("./routes/Profile");
const contactRoute = require("./routes/Contact");

const connectDB = require("./config/db");
const cloudinaryConnect = require("./config/cloudinary");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
require("dotenv").config();
const PORT = process.env.PORT || 4000;

connectDB();
cloudinaryConnect();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3000/"],
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/products", productsRoutes);
app.use("/api/v1/payment", paymentsRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/reach", contactRoute);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Your server is up and running...",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
