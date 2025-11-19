import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'hidden'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Review", reviewSchema);
