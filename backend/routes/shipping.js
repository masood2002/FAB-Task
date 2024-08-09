import express from "express";
import { getShippingLabel } from "../controllers/index.js";

const router = express.Router();

router.post("/", getShippingLabel);

export default router;
