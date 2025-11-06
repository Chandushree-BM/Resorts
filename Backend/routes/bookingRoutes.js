import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

// CREATE BOOKING ✅
router.post("/", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json({ message: "Booking Successful ✅", booking: newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Booking Failed ❌" });
  }
});

// GET ALL BOOKINGS ✅ (Admin)
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("package");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Server Error ❌" });
  }
});

export default router;
