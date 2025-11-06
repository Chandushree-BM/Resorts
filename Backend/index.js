import express from "express";
import authRoutes from "./routes/auth.js";
import packageRoutes from "./routes/packageRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

<<<<<<< HEAD
const router = express.Router();
=======
dotenv.config();
>>>>>>> 1748df4a116702741114635adf2b7809a24931ac

// ✅ Auth routes only
router.use("/api/auth", authRoutes);

<<<<<<< HEAD
export default router;
=======
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
>>>>>>> 1748df4a116702741114635adf2b7809a24931ac
