import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ✅ Register Controller (Direct Email/Password - No Firebase)
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists ⚠️" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      authProvider: 'email'
    });

    await newUser.save();
    console.log("New user registered:", email);

    return res.status(201).json({ message: "Account created successfully ✅" });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({ message: "Server error ❌" });
  }
};

// ✅ Login Controller (Direct Email/Password - No Firebase)
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found 🚫" });
    }

    // Check if user has a password (email/password user)
    if (!user.password) {
      return res.status(400).json({ message: "This account uses Google Sign-in. Please sign in with Google." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials ❌" });
    }
<<<<<<< HEAD

    console.log("User logged in:", email);
=======
>>>>>>> 9eb7f07959a8affa24bbe4da891f187d0566a55b

    // ✅ Create JWT with User ID (used for ownership)
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful 🎉",
      token, // ✅ Send token to frontend
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      }
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ message: "Server error ❌" });
  }
};

// ✅ Google Authentication Controller
export const googleAuth = async (req, res) => {
  try {
    const { username, email, firebaseUid } = req.body;

    if (!email || !firebaseUid) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user for Google sign-in
      user = new User({
        username: username || email.split('@')[0],
        email,
        firebaseUid,
        authProvider: 'google'
      });
      await user.save();
    } else if (!user.firebaseUid) {
      // Update existing user with Firebase UID
      user.firebaseUid = firebaseUid;
      user.authProvider = 'google';
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Google authentication successful 🎉",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      }
    });

  } catch (error) {
    console.error("GOOGLE AUTH ERROR:", error);
    return res.status(500).json({ message: "Server error ❌" });
  }
};
