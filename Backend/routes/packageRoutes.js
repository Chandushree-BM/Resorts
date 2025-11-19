import express from "express";
import {
  getAllPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage
} from "../controllers/packageController.js";

const router = express.Router();

// Public routes
router.get("/", getAllPackages);
router.get("/:id", getPackageById);

// Admin routes (add auth middleware later)
router.post("/", createPackage);
router.put("/:id", updatePackage);
router.delete("/:id", deletePackage);

export default router;
