import express from "express";
import authRoutes from "./routes/auth.js";

const router = express.Router();

// ✅ Auth routes only
router.use("/api/auth", authRoutes);

export default router;
