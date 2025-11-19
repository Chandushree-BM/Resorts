import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import cloudinary from "./Config/Cloudinary.js";
import Review from "./models/Review.js";
import authRoutes from "./routes/auth.js";      // ✅ Correct auth routes file
import auth from "./middlewares/auth.js";       // ✅ Token verification middleware
import userRoutes from "./routes/userroutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Auth (Signup & Login)
app.use("/api/auth", authRoutes);
// ✅ User Profile routes
app.use("/api/user", userRoutes);

// ✅ Multer for file upload
const upload = multer({ storage: multer.memoryStorage() });

// ✅ Add Review
app.post("/reviews", auth, upload.single("image"), (req, res) => {
  const { name, location, text, rating } = req.body;

  const stream = cloudinary.uploader.upload_stream(
    { folder: "reviews" },
    async (err, result) => {
      if (err) return res.status(500).json({ error: err });

      const newReview = await Review.create({
        name,
        location,
        text,
        rating,
        image: result.secure_url,
        userId: req.user.id,       // ✅ stores owner of review
      });

      res.json(newReview);
    }
  );

  stream.end(req.file.buffer);
});

// ✅ Update Review
app.put("/reviews/:id", auth, async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ message: "Not found" });
  if (review.userId.toString() !== req.user.id) return res.status(403).json({ message: "Not allowed" });

  Object.assign(review, req.body);
  await review.save();
  res.json(review);
});

// ✅ Delete Review
app.delete("/reviews/:id", auth, async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ message: "Not found" });
  if (review.userId.toString() !== req.user.id) return res.status(403).json({ message: "Not allowed" });

  await review.deleteOne();
  res.json({ message: "Deleted ✅" });
});

// ✅ Fetch Reviews
// ✅ Test Cloudinary FIRST
app.get("/test-cloud", async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload("https://picsum.photos/200");
    return res.json(result);
  } catch (error) {
    return res.json({ error: error.message });
  }
});

// ✅ Fetch Reviews
app.get("/reviews", async (req, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 });
  res.json(reviews);
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log("✅ Server running on port", process.env.PORT || 5000)
    );
  })
  .catch(err => console.log(err));
