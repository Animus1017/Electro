const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const mediaDestroy = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    return error;
  }
};
module.exports = mediaDestroy;
