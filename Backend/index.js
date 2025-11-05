import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import packageRoutes from "./routes/packageRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json()); // 👈 VERY IMPORTANT — must be BEFORE routes!

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/bookings", bookingRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error("❌ Database Error: ", err));
