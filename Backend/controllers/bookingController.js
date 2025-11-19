import Booking from "../models/booking.js";
import Package from "../models/Package.js";
import User from "../models/user.js";

export const createBooking = async (req, res) => {
  try {
    const { packageId, checkIn, checkOut, adults, children, guestName, guestEmail, guestPhone, specialRequests } = req.body;
    
    // Fetch package to get current pricing
    const pkg = await Package.findById(packageId);
    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }

    if (!pkg.available) {
      return res.status(400).json({ message: "Package is not available" });
    }

    // Calculate nights
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

    if (nights < 1) {
      return res.status(400).json({ message: "Invalid dates" });
    }

    // Calculate total (backend computation only)
    const priceAdult = pkg.price || 0;
    const priceChild = pkg.priceChild || Math.floor(priceAdult * 0.7);
    const totalAmount = (priceAdult * adults + priceChild * children) * nights;

    const booking = new Booking({
      userId: req.user.id,
      packageId,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      adults,
      children: children || 0,
      nights,
      priceAdultAtBooking: priceAdult,
      priceChildAtBooking: priceChild,
      totalAmount,
      guestName,
      guestEmail,
      guestPhone,
      specialRequests,
      status: 'pending'
    });

    await booking.save();
    
    return res.status(201).json({ 
      message: "Booking created successfully", 
      booking 
    });
  } catch (error) {
    console.error("CREATE BOOKING ERROR:", error);
    return res.status(500).json({ message: "Error creating booking" });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate('packageId')
      .sort({ createdAt: -1 });
    
    return res.status(200).json(bookings);
  } catch (error) {
    console.error("GET USER BOOKINGS ERROR:", error);
    return res.status(500).json({ message: "Error fetching bookings" });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('packageId')
      .populate('userId', 'username email');
    
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Ensure user can only access their own bookings (unless admin)
    if (booking.userId._id.toString() !== req.user.id && !req.adminUser) {
      return res.status(403).json({ message: "Access denied" });
    }

    return res.status(200).json(booking);
  } catch (error) {
    console.error("GET BOOKING ERROR:", error);
    return res.status(500).json({ message: "Error fetching booking" });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('packageId')
      .populate('userId', 'username email phone')
      .sort({ createdAt: -1 });
    
    return res.status(200).json(bookings);
  } catch (error) {
    console.error("GET ALL BOOKINGS ERROR:", error);
    return res.status(500).json({ message: "Error fetching bookings" });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['pending', 'approved', 'rejected', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = status;
    booking.updatedAt = new Date();
    await booking.save();

    return res.status(200).json({ 
      message: "Booking status updated", 
      booking 
    });
  } catch (error) {
    console.error("UPDATE BOOKING STATUS ERROR:", error);
    return res.status(500).json({ message: "Error updating booking status" });
  }
};
