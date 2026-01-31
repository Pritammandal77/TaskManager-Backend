import jwt from "jsonwebtoken";
import { User } from "../models/auth.model.js";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";

import {
  accessTokenOptions,
  refreshTokenOptions,
} from "../utils/cookieOptions.js";


export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    await User.create({ email, password });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" });
  }
};


export const getCurrentUser = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    res
      .cookie("accessToken", accessToken, accessTokenOptions)
      .cookie("refreshToken", refreshToken, refreshTokenOptions)
      .status(200)
      .json({
        success: true,
        user: { id: user._id, email: user.email },
      });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decoded.userId);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const newAccessToken = generateAccessToken(user._id);

    res
      .cookie("accessToken", newAccessToken, accessTokenOptions)
      .status(200)
      .json({ success: true });
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired refresh token" });
  }
};


export const logoutUser = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      const user = await User.findOne({ refreshToken });
      if (user) {
        user.refreshToken = null;
        await user.save();
      }
    }

    res
      .clearCookie("accessToken", accessTokenOptions)
      .clearCookie("refreshToken", refreshTokenOptions)
      .status(200)
      .json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
