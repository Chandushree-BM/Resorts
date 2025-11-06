import express from "express";
import Package from "../models/Package.js";

const router = express.Router();

router.get("/", async (_, res) => {
  const packages = await Package.find();
  res.json(packages);
});

export default router;
