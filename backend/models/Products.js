const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
      index: true, // Add index for better search performance
    },
    productDescription: {
      type: String,
      required: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: 200, // For quick product card display
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    manufacturer: {
      type: String,
      trim: true,
    },
    modelNumber: {
      type: String,
      trim: true,
    },
    ratingAndReview: [
      {
        type: Schema.Types.ObjectId,
        ref: "RatingAndReviews",
      },
    ],
    pricing: {
      basePrice: {
        type: Number,
        required: true,
      },
      discountPercentage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
      },
      salePrice: {
        type: Number,
        default: function () {
          return (
            this.pricing.basePrice * (1 - this.pricing.discountPercentage / 100)
          );
        },
      },
      discountExpiry: {
        type: Date,
      },
    },
    inventory: {
      variants: [
        {
          sku: {
            type: String,
            unique: true,
          },
          colorName: {
            type: String,
            trim: true,
          },
          colorCode: {
            type: String,
            trim: true,
          },
          size: {
            type: String,
            trim: true,
          },
          storage: {
            type: String,
            trim: true,
          },
          images: {
            type: [String],
            required: true,
          },
          price: {
            type: Number,
            default: function () {
              return this.parent().pricing.basePrice;
            },
          },
        },
      ],
      availability: {
        type: String,
        enum: ["In Stock", "Out of Stock", "Preorder", "Discontinued"],
        default: "In Stock",
      },
    },
    purchasers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    features: {
      type: [String],
      trim: true,
    },
    specifications: {
      type: Map,
      of: Schema.Types.Mixed,
      default: {},
      // This allows for structured specs like:
      // { "processor": "Intel i7", "RAM": "16GB", "storage": "512GB SSD" }
    },
    technicalDetails: {
      dimensions: {
        length: { type: Number },
        width: { type: Number },
        height: { type: Number },
        unit: { type: String, default: "cm" },
      },
      weight: {
        value: { type: Number },
        unit: { type: String, default: "kg" },
      },
      powerConsumption: { type: String },
      connectivity: [{ type: String }], // ["Bluetooth", "WiFi", "USB-C"]
      operatingSystem: { type: String },
      warranty: {
        period: { type: Number }, // months
        type: { type: String },
        description: { type: String },
      },
    },
    // shipping: {
    //   dimensions: {
    //     length: { type: Number },
    //     width: { type: Number },
    //     height: { type: Number },
    //     unit: { type: String, default: "cm" },
    //   },
    //   weight: {
    //     value: { type: Number },
    //     unit: { type: String, default: "kg" },
    //   },
    //   freeShipping: { type: Boolean, default: false },
    //   estimatedDelivery: { type: String },
    // },
    // seo: {
    //   metaTitle: { type: String },
    //   metaDescription: { type: String },
    //   keywords: [{ type: String }],
    //   slug: {
    //     type: String,
    //     unique: true,
    //     index: true,
    //   },
    // },
    relatedProducts: [{ type: Schema.Types.ObjectId, ref: "Products" }],
    accessories: [{ type: Schema.Types.ObjectId, ref: "Products" }],
    // popularity: {
    //   viewCount: { type: Number, default: 0 },
    //   salesCount: { type: Number, default: 0 },
    //   wishlistCount: { type: Number, default: 0 },
    // },
    status: {
      type: String,
      enum: ["Active", "Draft", "Archived"],
      default: "Active",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isNewArrival: {
      type: Boolean,
      default: false,
    },
    isBestSeller: {
      type: Boolean,
      default: false,
    },
    productCustomers: [
      { type: Schema.Types.ObjectId, ref: "User", required: true },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for calculated current price
productSchema.virtual("currentPrice").get(function () {
  if (this.pricing.discountExpiry && new Date() > this.pricing.discountExpiry) {
    return this.pricing.basePrice;
  }
  return this.pricing.salePrice;
});

// Index for search functionality
productSchema.index({
  productName: "text",
  shortDescription: "text",
  productDescription: "text",
  tags: "text",
});

const Products = model("Products", productSchema);
module.exports = Products;
