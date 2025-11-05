import express from "express";
import Package from "../models/Package.js";

const router = express.Router();

// ✅ Get all packages (User side)
router.get("/", async (req, res) => {
  const pkgs = await Package.find();
  res.json(pkgs);
});

// ✅ Get single package (View page)
router.get("/:id", async (req, res) => {
  const pkg = await Package.findById(req.params.id);
  if (!pkg) return res.status(404).json({ message: "Package Not Found" });
  res.json(pkg);
});

// ✅ Add new package (Admin only)
router.post("/", async (req, res) => {
  try {
    const pkg = new Package(req.body);
    await pkg.save();
    res.status(201).json(pkg);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Delete package
router.delete("/:id", async (req, res) => {
  await Package.findByIdAndDelete(req.params.id);
  res.json({ message: "Package deleted" });
});

export default router;
