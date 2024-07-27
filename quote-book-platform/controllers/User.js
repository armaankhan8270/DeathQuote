// controllers/userController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const profileImage = req.file ? req.file.filename : "default-profile.jpg";
    const user = new User({ username, password, email, profileImage });
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error creating user", details: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: { _id: user._id, email: user.email, username: user.username },
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error fetching user", details: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const updateData = { username, email };
    if (req.file) {
      updateData.profileImage = req.file.filename;
    }
    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    }).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error updating user", details: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error deleting user", details: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }
    user.password = newPassword;
    await user.save();
    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error changing password", details: error.message });
  }
};
