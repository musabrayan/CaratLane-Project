import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    occasion: {
      type: String,
      required: true,
      enum: [
        "engagement",
        "wedding",
        "anniversary",
        "birthday",
        "first-salary",
        "everyday-luxury",
      ],
    },

    metal: {
      type: String,
      required: true,
    },

    stone: {
      type: String,
      default: "",
    },

    weight: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      required: true,
    },

    story: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    availability: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);