import express from "express";
import { generateShippingLabel } from "../controllers/index.js";

const router = express.Router();

router.post("/", generateShippingLabel);

export default router;
