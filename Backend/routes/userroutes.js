import express from "express";
import { getProfile, updateProfile } from "../controllers/userController.js";
import { verifyUser } from "../middleware/authMiddleware.js";
import multer from "multer";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get("/profile", verifyUser, getProfile);
router.put("/profile", verifyUser, upload.single("profilePic"), updateProfile);

export default router;
