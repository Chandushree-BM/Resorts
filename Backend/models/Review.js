import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  name: String,
  location: String,
  text: String,
  rating: Number,
  image: String,
  userId: {
  type: mongoose.Schema.Types.ObjectId,
  required: true,
  ref: "User",
},


}, { timestamps: true });

export default mongoose.model("Review", reviewSchema);
