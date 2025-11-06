import express from "express";
import {
  bookPackage,
  approveBooking,
  cancelBooking,
  getMyBookings,
  getAllBookings,
} from "../controllers/bookingController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// User Access
router.post("/book", authMiddleware, bookPackage);
router.get("/my-bookings", authMiddleware, getMyBookings);

// Admin Access
router.put("/approve/:bookingId", authMiddleware, approveBooking);
router.put("/cancel/:bookingId", authMiddleware, cancelBooking);
router.get("/all", authMiddleware, getAllBookings);

export default router;
