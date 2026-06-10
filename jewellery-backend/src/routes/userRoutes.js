import express from "express";
import {
  toggleReserveBag,
  getReserveBag,
  recordProductView,
  getJourney,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/reserve", protect, toggleReserveBag);
router.get("/reserve", protect, getReserveBag);
router.post("/journey/view", protect, recordProductView);
router.get("/journey", protect, getJourney);

export default router;
