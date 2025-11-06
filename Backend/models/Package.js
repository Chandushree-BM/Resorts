import mongoose from "mongoose";

const PackageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true },
    short: { type: String, required: true },
    icon: { type: String, required: true }, // we'll store icon name string like "FaHotel"
  },
  { timestamps: true }
);

export default mongoose.model("Package", PackageSchema);
