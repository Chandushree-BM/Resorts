import express from "express";
import { verifyUser } from "../middleware/authMiddleware.js";
import { 
  createBooking, 
  getUserBookings, 
  getBookingById 
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/create", verifyUser, createBooking);
router.get("/user", verifyUser, getUserBookings);
router.get("/:id", verifyUser, getBookingById);

export default router;
