import dotenv from "dotenv";
import mongoose from "mongoose";

import Store from "../models/Store.js";
import { stores } from "../data/stores.js";

dotenv.config();

const seedStores = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);

		console.log("MongoDB Connected");

		await Store.deleteMany({});

		console.log("Old Stores Deleted");

		await Store.insertMany(stores);

		console.log("Stores Seeded Successfully");

		process.exit(0);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

seedStores();
