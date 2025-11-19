import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tagline: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  location: { type: String, required: true },
  target: { type: String, required: true },
  image: { type: String },
  available: { type: Boolean, default: true },
  description: { type: String, required: true },
  highlights: [String],
  inclusions: [String],
  exclusions: [String],
  addOns: [{
    name: String,
    price: Number
  }],
  mealPlan: { type: String },
  policies: [String],
  itinerary: [{
    day: Number,
    title: String,
    activities: [String]
  }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Package", packageSchema);
