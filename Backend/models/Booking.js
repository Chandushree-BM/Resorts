import mongoose from "mongoose";


const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: String, required: true },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package", // must match your Package model name
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
