import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  adults: { type: Number, required: true, min: 1 },
  children: { type: Number, default: 0 },
  nights: { type: Number, required: true },
  priceAdultAtBooking: { type: Number, required: true },
  priceChildAtBooking: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'payment_done', 'approved', 'rejected', 'completed'],
    default: 'pending'
  },
  guestName: { type: String, required: true },
  guestEmail: { type: String, required: true },
  guestPhone: { type: String, required: true },
  specialRequests: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Booking", bookingSchema);
