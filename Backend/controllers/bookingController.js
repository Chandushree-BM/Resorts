import Booking from "../models/Booking.js";

// ✅ Check availability
export const bookPackage = async (req, res) => {
  try {
    const { packageId, checkIn, checkOut, guests } = req.body;
    const userId = req.user.id;

    // Check overlapping bookings
    const conflict = await Booking.findOne({
      packageId,
      status: { $ne: "cancelled" },
      $or: [
        { checkIn: { $lt: checkOut }, checkOut: { $gt: checkIn } }
      ]
    });

    if (conflict) {
      return res.status(400).json({ message: "This package is not available for selected dates" });
    }

    const booking = new Booking({
      user: userId,
      packageId,
      checkIn,
      checkOut,
      guests,
    });

    await booking.save();
    res.status(201).json({ message: "Booking successful", booking });

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ✅ Admin: Approve booking
export const approveBooking = async (req, res) => {
  const { bookingId } = req.params;
  await Booking.findByIdAndUpdate(bookingId, { status: "approved" });
  res.json({ message: "Booking Approved ✅" });
};

// ✅ Admin: Cancel booking
export const cancelBooking = async (req, res) => {
  const { bookingId } = req.params;
  await Booking.findByIdAndUpdate(bookingId, { status: "cancelled" });
  res.json({ message: "Booking Cancelled ❌" });
};

// ✅ User View Bookings
export const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id }).populate("packageId");
  res.json(bookings);
};

// ✅ Admin View All
export const getAllBookings = async (req, res) => {
  const bookings = await Booking.find().populate("user packageId");
  res.json(bookings);
};
