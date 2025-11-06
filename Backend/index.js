import express from "express";
<<<<<<< HEAD
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userRoutes from "./routes/userroutes.js";
=======
>>>>>>> 9eb7f07959a8affa24bbe4da891f187d0566a55b
import authRoutes from "./routes/auth.js";
import packageRoutes from "./routes/packageRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

<<<<<<< HEAD
dotenv.config();
const app = express();
=======
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
>>>>>>> 9eb7f07959a8affa24bbe4da891f187d0566a55b
app.use(cors());
app.use(express.json()); // 👈 VERY IMPORTANT — must be BEFORE routes!

<<<<<<< HEAD
// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
=======
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
>>>>>>> 9eb7f07959a8affa24bbe4da891f187d0566a55b
