import express from "express";
import cors from "cors";
import path from "path";

import productRoutes from "./routes/productRoutes.js";
import storeRoutes from "./routes/storeRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/reservations", reservationRoutes);

// --- PRODUCTION DEPLOYMENT SETUP ---
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  // Serve the static dist folder from the React app
  app.use(express.static(path.join(__dirname, "../jewellery-discovery/dist")));

  // Any route that doesn't start with /api gets passed to React Router
  app.use((req, res, next) => {
    if (req.method === "GET") {
      res.sendFile(path.resolve(__dirname, "../jewellery-discovery/dist", "index.html"));
    } else {
      next();
    }
  });
} else {
  // Only use 404 handler for API routes in dev, or let dev server handle frontend
  app.use(notFound);
}

app.use(errorHandler);

export default app;