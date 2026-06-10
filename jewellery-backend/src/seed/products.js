import dotenv from "dotenv";
import mongoose from "mongoose";

import Product from "../models/Product.js";
import { products } from "../data/product.js";

dotenv.config();

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Connected");

    await Product.deleteMany({});

    console.log("Old Products Deleted");

    await Product.insertMany(products);

    console.log("Products Seeded Successfully");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProducts();