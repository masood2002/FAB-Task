// server.js
import express from "express";
import bodyParser from "body-parser";
import { router } from "./routes/index.js";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/shipping", router);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
