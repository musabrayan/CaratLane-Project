import express from "express";

import { getStores, getStorePulse } from "../controllers/storeController.js";

const router = express.Router();

router.get("/pulse", getStorePulse);
router.get("/", getStores);

export default router;