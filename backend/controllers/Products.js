const User = require("../models/User");
const Category = require("../models/Category");
const mediaUpload = require("../utils/mediaUploader");
const Products = require("../models/Products");
const mediaDestroy = require("../utils/mediaDestroyer");
require("dotenv").config();

exports.createProduct = async (req, res) => {
  try {
    // Extract data from request body
    let {
      productName,
      productDescription,
      shortDescription,
      companyName,
      manufacturer,
      modelNumber,
      features,
      categories,
      tags,
      specifications,
      technicalDetails,
      status,
      isFeatured,
      isNewArrival,
      isBestSeller,
    } = req.body;

    // Extract pricing information
    let { basePrice, discountPercentage, discountExpiry } =
      req.body.pricing || {};

    // Parse JSON strings if needed
    if (typeof features === "string") features = JSON.parse(features);
    if (typeof specifications === "string")
      specifications = JSON.parse(specifications);
    if (typeof categories === "string") categories = JSON.parse(categories);
    if (typeof tags === "string") tags = JSON.parse(tags);
    if (typeof technicalDetails === "string")
      technicalDetails = JSON.parse(technicalDetails);

    // Ensure categories is an array
    if (!Array.isArray(categories)) {
      categories = [categories];
    }

    // Get inventory variant data
    let inventoryVariants = req.body.variants;
    if (typeof inventoryVariants === "string") {
      inventoryVariants = JSON.parse(inventoryVariants);
    }

    // Get user ID from request
    const id = req.user.id;

    // Validation check for required fields
    if (
      !productName ||
      !productDescription ||
      !companyName ||
      !basePrice ||
      !categories ||
      !req.files
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    // Check if the user exists
    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if all categories exist
    for (const categoryId of categories) {
      const categoryDetails = await Category.findById(categoryId);
      if (!categoryDetails) {
        return res.status(404).json({
          success: false,
          message: `Category with ID ${categoryId} not found`,
        });
      }
    }

    // Process product variants
    const processedVariants = [];

    // Handle case where inventory variants are provided
    if (
      req.files &&
      Object.keys(req.files).length > 0 &&
      Array.isArray(inventoryVariants)
    ) {
      for (const variant of inventoryVariants) {
        const { sku, colorName, colorCode, size, storage } = variant;
        const imageFieldName = `image_${sku}`;

        // Check if images for this variant exist in the request
        if (req.files[imageFieldName]) {
          const variantImages = req.files[imageFieldName];
          let uploadedImages = [];

          // Handle multiple images for this variant
          if (Array.isArray(variantImages)) {
            for (const image of variantImages) {
              const uploadedImage = await mediaUpload(
                image,
                process.env.FOLDER_NAME
              );
              uploadedImages.push(uploadedImage.url);
            }
          } else {
            // Handle single image
            const uploadedImage = await mediaUpload(
              variantImages,
              process.env.FOLDER_NAME
            );
            uploadedImages.push(uploadedImage.url);
          }

          // Add this variant with its images to the processedVariants array
          processedVariants.push({
            sku,
            colorName,
            colorCode,
            size,
            storage,
            images: uploadedImages,
            price: variant.price || basePrice, // Use variant price or fall back to base price
          });
        } else {
          return res.status(400).json({
            success: false,
            message: `No images provided for variant with SKU ${sku}`,
          });
        }
      }
    } else {
      // Fallback for simple case with one variant
      if (req.files.productImages) {
        const variantImages = req.files.productImages;
        let uploadedImages = [];

        // Handle multiple images
        if (Array.isArray(variantImages)) {
          for (const image of variantImages) {
            const uploadedImage = await mediaUpload(
              image,
              process.env.FOLDER_NAME
            );
            uploadedImages.push(uploadedImage.url);
          }
        } else {
          const uploadedImage = await mediaUpload(
            variantImages,
            process.env.FOLDER_NAME
          );
          uploadedImages.push(uploadedImage.url);
        }

        // Create a default variant
        processedVariants.push({
          sku: `SKU-${Date.now()}`,
          colorName: req.body.colorName || "Default",
          colorCode: req.body.colorCode || "#000000",
          size: req.body.size || "",
          storage: req.body.storage || "",
          images: uploadedImages,
          price: basePrice,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "At least one product variant with images is required",
        });
      }
    }

    // Create the product with the new schema structure
    const product = new Products({
      productName,
      productDescription,
      shortDescription,
      companyName,
      manufacturer,
      modelNumber,
      pricing: {
        basePrice,
        discountPercentage: discountPercentage || 0,
        discountExpiry,
      },
      inventory: {
        variants: processedVariants,
        availability: req.body.availability || "In Stock",
      },
      features: features || [],
      specifications: specifications || {},
      technicalDetails: technicalDetails || {},
      categories,
      tags: tags || [],
      status: status || "Active",
      isFeatured: isFeatured || false,
      isNewArrival: isNewArrival || false,
      isBestSeller: isBestSeller || false,
    });

    await product.save();

    // Update all categories with the new product
    const categoryUpdatePromises = categories.map((categoryId) => {
      return Category.findByIdAndUpdate(
        categoryId,
        { $push: { products: product._id } },
        { new: true }
      );
    });

    await Promise.all(categoryUpdatePromises);

    res.status(200).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating Product",
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { productId, categories, ...updates } = req.body;
    const { role } = req.user;

    // Find the product by ID
    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if the user is authorized to update the product
    if (role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to update this product",
      });
    }

    // Handle pricing updates
    if (updates.pricing) {
      let pricing = updates.pricing;
      if (typeof pricing === "string") {
        pricing = JSON.parse(pricing);
      }

      // Update individual pricing fields if provided
      if (pricing.basePrice) product.pricing.basePrice = pricing.basePrice;
      if (pricing.discountPercentage !== undefined)
        product.pricing.discountPercentage = pricing.discountPercentage;
      if (pricing.discountExpiry)
        product.pricing.discountExpiry = pricing.discountExpiry;

      // salePrice is calculated automatically by the schema
    }

    // Handle inventory updates
    if (updates.inventory) {
      let inventory = updates.inventory;
      if (typeof inventory === "string") {
        inventory = JSON.parse(inventory);
      }

      if (inventory.availability) {
        product.inventory.availability = inventory.availability;
      }

      // Note: Variants are handled separately for better control
    }

    // Handle other updates
    for (const key in updates) {
      if (
        updates.hasOwnProperty(key) &&
        key !== "pricing" &&
        key !== "inventory" &&
        key !== "variants"
      ) {
        if (
          key === "features" ||
          key === "tags" ||
          key === "specifications" ||
          key === "technicalDetails"
        ) {
          product[key] =
            typeof updates[key] === "string"
              ? JSON.parse(updates[key])
              : updates[key];
        } else {
          product[key] = updates[key];
        }
      }
    }

    // Update categories if provided
    if (categories) {
      let parsedCategories = categories;
      if (typeof categories === "string") {
        parsedCategories = JSON.parse(categories);
      }

      // Ensure categories is an array
      if (!Array.isArray(parsedCategories)) {
        parsedCategories = [parsedCategories];
      }

      // Get old categories to remove product from
      const oldCategories = product.categories;

      // Remove product from old categories
      if (oldCategories && oldCategories.length > 0) {
        const removePromises = oldCategories.map((categoryId) => {
          return Category.findByIdAndUpdate(categoryId, {
            $pull: { products: product._id },
          });
        });
        await Promise.all(removePromises);
      }

      // Validate if new categories exist
      for (const categoryId of parsedCategories) {
        const categoryExists = await Category.findById(categoryId);
        if (!categoryExists) {
          return res.status(400).json({
            success: false,
            message: `Invalid category ID: ${categoryId}`,
          });
        }
      }

      // Assign new categories
      product.categories = parsedCategories;

      // Add product to new categories
      const addPromises = parsedCategories.map((categoryId) => {
        return Category.findByIdAndUpdate(categoryId, {
          $push: { products: product._id },
        });
      });
      await Promise.all(addPromises);
    }

    // Save the updated product
    await product.save();

    // Fetch the updated product with populated fields
    const updatedProduct = await Products.findById(productId)
      .populate("categories")
      .populate("ratingAndReview")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating product",
      error: error.message,
    });
  }
};

exports.addVariant = async (req, res) => {
  try {
    const { productId, sku, colorName, colorCode, size, storage, price } =
      req.body;

    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if the SKU already exists
    const existingSku = product.inventory.variants.find(
      (variant) => variant.sku === sku
    );

    if (existingSku) {
      return res.status(400).json({
        success: false,
        message: "SKU already exists",
      });
    }

    // Handle image upload for the new variant
    const imageFieldName = `image_${sku}`;
    let uploadedImages = [];

    if (req.files && req.files[imageFieldName]) {
      const variantImages = req.files[imageFieldName];

      // Handle multiple images
      if (Array.isArray(variantImages)) {
        for (const image of variantImages) {
          const uploadedImage = await mediaUpload(
            image,
            process.env.FOLDER_NAME
          );
          uploadedImages.push(uploadedImage.url);
        }
      } else {
        // Handle single image
        const uploadedImage = await mediaUpload(
          variantImages,
          process.env.FOLDER_NAME
        );
        uploadedImages.push(uploadedImage.url);
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "At least one image is required for the new variant",
      });
    }

    // Add the new variant to the product inventory
    product.inventory.variants.push({
      sku,
      colorName,
      colorCode,
      size,
      storage,
      images: uploadedImages,
      price: price || product.pricing.basePrice,
    });

    await product.save();

    res.status(200).json({
      success: true,
      message: "Variant added successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error adding variant",
      error: error.message,
    });
  }
};

exports.removeVariant = async (req, res) => {
  try {
    const { productId, sku } = req.body;
    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Find the variant with the specified SKU
    const variantToRemove = product.inventory.variants.find(
      (variant) => variant.sku === sku
    );

    if (!variantToRemove) {
      return res.status(400).json({
        success: false,
        message: "SKU not found in product inventory",
      });
    }

    // Don't allow removing the last variant
    if (product.inventory.variants.length <= 1) {
      return res.status(400).json({
        success: false,
        message:
          "Cannot remove the last product variant. A product must have at least one variant.",
      });
    }

    // Extract public IDs from the images to delete
    const publicIdsToDelete = variantToRemove.images.map((imageUrl) => {
      const parts = imageUrl.split("/");
      const filename = parts.pop();
      return process.env.FOLDER_NAME + "/" + filename.split(".")[0]; // Include folder name if needed
    });

    // Delete the images from Cloudinary
    if (publicIdsToDelete.length > 0) {
      for (const publicId of publicIdsToDelete) {
        await mediaDestroy(publicId);
      }
    }

    // Remove the variant from inventory.variants
    product.inventory.variants = product.inventory.variants.filter(
      (variant) => variant.sku !== sku
    );

    await product.save();

    res.status(200).json({
      success: true,
      message: "Variant and associated images removed successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error removing variant",
      error: error.message,
    });
  }
};

exports.addImageToVariant = async (req, res) => {
  try {
    const { productId, sku } = req.body;
    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Find the variant with the specified SKU
    const existingVariant = product.inventory.variants.find(
      (variant) => variant.sku === sku
    );

    if (!existingVariant) {
      return res.status(400).json({
        success: false,
        message: "SKU not found in product inventory",
      });
    }

    // Handle image upload for the existing variant
    const imageFieldName = `image_${sku}`;
    if (!req.files || !req.files[imageFieldName]) {
      return res.status(400).json({
        success: false,
        message: "An image is required for the variant",
      });
    }

    const newImage = req.files[imageFieldName];
    let uploadedImage;

    if (Array.isArray(newImage)) {
      // If multiple images provided, take the first one
      uploadedImage = await mediaUpload(newImage[0], process.env.FOLDER_NAME);
    } else {
      uploadedImage = await mediaUpload(newImage, process.env.FOLDER_NAME);
    }

    const newImageUrl = uploadedImage.url;

    // Append the new image URL to the existing variant's images
    existingVariant.images.push(newImageUrl);
    await product.save();

    res.status(200).json({
      success: true,
      message: "Image added to variant successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error adding image to variant",
      error: error.message,
    });
  }
};

exports.removeImageFromVariant = async (req, res) => {
  try {
    const { productId, sku, imageUrl } = req.body;
    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Find the variant with the specified SKU
    const existingVariant = product.inventory.variants.find(
      (variant) => variant.sku === sku
    );

    if (!existingVariant) {
      return res.status(400).json({
        success: false,
        message: "SKU not found in product inventory",
      });
    }

    // Don't allow removing the last image
    if (existingVariant.images.length <= 1) {
      return res.status(400).json({
        success: false,
        message:
          "Cannot remove the last image. A variant must have at least one image.",
      });
    }

    // Validate that the imageUrl exists in the variant's images
    if (!imageUrl || !existingVariant.images.includes(imageUrl)) {
      return res.status(400).json({
        success: false,
        message: "Image URL not found for the specified variant",
      });
    }

    // Extract publicId from the imageUrl to delete
    const parts = imageUrl.split("/");
    const filename = parts.pop();
    const publicId = process.env.FOLDER_NAME + "/" + filename.split(".")[0]; // Include folder name if needed

    // Delete the image from Cloudinary
    await mediaDestroy(publicId);

    // Remove the image URL from the variant's images
    existingVariant.images = existingVariant.images.filter(
      (url) => url !== imageUrl
    );

    await product.save();

    res.status(200).json({
      success: true,
      message: "Image removed from variant successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error removing image from variant",
      error: error.message,
    });
  }
};

exports.updateVariant = async (req, res) => {
  try {
    const { productId, sku, updates } = req.body;

    // Parse updates if it's a string
    let variantUpdates = updates;
    if (typeof updates === "string") {
      variantUpdates = JSON.parse(updates);
    }

    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Find the variant with the specified SKU
    const existingVariant = product.inventory.variants.find(
      (variant) => variant.sku === sku
    );

    if (!existingVariant) {
      return res.status(400).json({
        success: false,
        message: "SKU not found in product inventory",
      });
    }

    // Update variant fields
    if (variantUpdates.colorName)
      existingVariant.colorName = variantUpdates.colorName;
    if (variantUpdates.colorCode)
      existingVariant.colorCode = variantUpdates.colorCode;
    if (variantUpdates.size) existingVariant.size = variantUpdates.size;
    if (variantUpdates.storage)
      existingVariant.storage = variantUpdates.storage;
    if (variantUpdates.price) existingVariant.price = variantUpdates.price;

    // If SKU is being changed, verify the new SKU doesn't already exist
    if (variantUpdates.newSku && variantUpdates.newSku !== sku) {
      const skuExists = product.inventory.variants.some(
        (variant) => variant.sku === variantUpdates.newSku
      );

      if (skuExists) {
        return res.status(400).json({
          success: false,
          message: "New SKU already exists in product inventory",
        });
      }

      existingVariant.sku = variantUpdates.newSku;
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: "Variant updated successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating variant",
      error: error.message,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort,
      category,
      search,
      minPrice,
      maxPrice,
      filter,
    } = req.query;

    // Build query
    const query = {};

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Category filter
    if (category) {
      query.categories = category;
    }

    // Price range filter
    if (minPrice !== undefined || maxPrice !== undefined) {
      query["pricing.basePrice"] = {};
      if (minPrice !== undefined)
        query["pricing.basePrice"].$gte = parseFloat(minPrice);
      if (maxPrice !== undefined)
        query["pricing.basePrice"].$lte = parseFloat(maxPrice);
    }

    // Handle special filters
    if (filter) {
      switch (filter) {
        case "featured":
          query.isFeatured = true;
          break;
        case "newArrivals":
          query.isNewArrival = true;
          break;
        case "bestSellers":
          query.isBestSeller = true;
          break;
        case "discount":
          query["pricing.discountPercentage"] = { $gt: 0 };
          // Check if discount hasn't expired
          query.$or = [
            { "pricing.discountExpiry": { $exists: false } },
            { "pricing.discountExpiry": null },
            { "pricing.discountExpiry": { $gt: new Date() } },
          ];
          break;
      }
    }

    // Active products only by default
    query.status = "Active";

    // Build sort object
    let sortOptions = { createdAt: -1 }; // Default sort by newest

    if (sort) {
      switch (sort) {
        case "priceAsc":
          sortOptions = { "pricing.basePrice": 1 };
          break;
        case "priceDesc":
          sortOptions = { "pricing.basePrice": -1 };
          break;
        case "nameAsc":
          sortOptions = { productName: 1 };
          break;
        case "nameDesc":
          sortOptions = { productName: -1 };
          break;
        case "newest":
          sortOptions = { createdAt: -1 };
          break;
        case "oldest":
          sortOptions = { createdAt: 1 };
          break;
      }
    }

    // Execute query with pagination
    const products = await Products.find(query)
      .sort(sortOptions)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .select(
        "productName shortDescription companyName pricing inventory.availability inventory.variants.images categories isFeatured isNewArrival isBestSeller ratingAndReview"
      )
      .populate("categories", "name slug")
      .populate("ratingAndReview")
      .exec();

    // Get total count for pagination
    const totalProducts = await Products.countDocuments(query);

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
      pagination: {
        total: totalProducts,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(totalProducts / parseInt(limit)),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { productId } = req.params || req.body;

    const product = await Products.findById(productId)
      .populate("categories")
      .populate("ratingAndReview")
      .exec();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Get similar products from the same categories
    const similarProducts = await Products.find({
      _id: { $ne: product._id },
      categories: { $in: product.categories },
      status: "Active",
    })
      .limit(4)
      .select("productName shortDescription pricing inventory.variants");

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: {
        product,
        similarProducts,
        currentPrice: product.currentPrice, // This will use the virtual field
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    const id = req.user.id;
    const user = await User.findById(id);

    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (user.accountType !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this product",
      });
    }

    // Delete all variant images from storage
    for (const variant of product.inventory.variants) {
      const publicIdsToDelete = variant.images.map((imageUrl) => {
        const parts = imageUrl.split("/");
        const filename = parts.pop();
        return process.env.FOLDER_NAME + "/" + filename.split(".")[0];
      });

      // Delete the images from Cloudinary
      if (publicIdsToDelete.length > 0) {
        for (const publicId of publicIdsToDelete) {
          await mediaDestroy(publicId);
        }
      }
    }

    // Remove product from all categories
    const productCategories = product.categories;
    for (const categoryId of productCategories) {
      await Category.findByIdAndUpdate(
        categoryId,
        {
          $pull: { products: productId },
        },
        { new: true }
      );
    }

    // Delete the product
    await Products.findByIdAndDelete(productId);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting product",
      error: error.message,
    });
  }
};

exports.getRelatedProducts = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Get related products (from the same categories)
    const relatedProducts = await Products.find({
      _id: { $ne: productId }, // Exclude current product
      categories: { $in: product.categories },
      status: "Active",
    })
      .limit(8)
      .select(
        "productName shortDescription companyName pricing inventory.variants.images categories"
      )
      .populate("categories", "name slug")
      .exec();

    res.status(200).json({
      success: true,
      message: "Related products fetched successfully",
      data: relatedProducts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching related products",
      error: error.message,
    });
  }
};

exports.getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await Products.find({
      isFeatured: true,
      status: "Active",
    })
      .limit(8)
      .select(
        "productName shortDescription companyName pricing inventory.variants.images categories"
      )
      .populate("categories", "name slug")
      .populate("ratingAndReview")
      .exec();

    res.status(200).json({
      success: true,
      message: "Featured products fetched successfully",
      data: featuredProducts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching featured products",
      error: error.message,
    });
  }
};
