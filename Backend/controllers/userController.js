import User from "../models/user.js";

// Get Profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("Fetching profile for user ID:", userId);
    
    const user = await User.findById(userId).select("-password");
    
    if (!user) {
      console.log("User not found for ID:", userId);
      return res.status(404).json({ message: "User not found" });
    }
    
    console.log("Profile found:", user);
    return res.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Update Profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, email } = req.body;
    
    console.log("Updating profile for user ID:", userId);
    console.log("New data:", { username, email });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Profile updated:", updatedUser);
    return res.json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};
