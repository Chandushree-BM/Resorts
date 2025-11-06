



import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  firebaseUid: { type: String, unique: true, sparse: true },
  authProvider: { type: String, enum: ['email', 'google'], default: 'email' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);
