import User from "../models/user.js";
import cloudinary from "../Config/Cloudinary.js";

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

    const updateData = { username, email };

    // If an image file is uploaded, push it to Cloudinary and store URL
    if (req.file) {
      try {
        const uploadResult = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "avatars" },
            (err, result) => {
              if (err) return reject(err);
              resolve(result);
            }
          );
          stream.end(req.file.buffer);
        });
        updateData.profilePic = uploadResult.secure_url;
      } catch (uploadErr) {
        console.error("Error uploading profile image:", uploadErr);
        return res.status(500).json({ message: "Image upload failed", error: uploadErr.message });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
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
