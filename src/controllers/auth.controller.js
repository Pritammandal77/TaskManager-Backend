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

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiREsponse.js";


export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "All fields are required");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new ApiError(400, "User already exists");
    }

    await User.create({ email, password });

    return res
      .status(201)
      .json(
        new ApiResponse(201, {}, "User registered successfully")
      );

  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(
        new ApiResponse(
          error.statusCode || 500,
          null,
          error.message || "Something went wrong"
        )
      );
  }
};


export const getCurrentUser = async (req, res) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, req.user, "User fetched successfully")
      );

  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(
        new ApiResponse(
          error.statusCode || 500,
          null,
          error.message || "Something went wrong"
        )
      );
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      throw new ApiError(401, "Invalid credentials");
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    return res
      .cookie("accessToken", accessToken, accessTokenOptions)
      .cookie("refreshToken", refreshToken, refreshTokenOptions)
      .status(200)
      .json(
        new ApiResponse(
          200,
          { id: user._id, email: user.email },
          "Login successful"
        )
      );

  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(
        new ApiResponse(
          error.statusCode || 500,
          null,
          error.message || "Something went wrong"
        )
      );
  }
};


export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new ApiError(401, "Unauthorized");
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decoded.userId);
    if (!user || user.refreshToken !== refreshToken) {
      throw new ApiError(403, "Forbidden");
    }

    const newAccessToken = generateAccessToken(user._id);

    return res
      .cookie("accessToken", newAccessToken, accessTokenOptions)
      .status(200)
      .json(
        new ApiResponse(200, {}, "Access token refreshed")
      );

  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(
        new ApiResponse(
          error.statusCode || 500,
          null,
          error.message || "Invalid or expired refresh token"
        )
      );
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

    return res
      .clearCookie("accessToken", accessTokenOptions)
      .clearCookie("refreshToken", refreshTokenOptions)
      .status(200)
      .json(
        new ApiResponse(200, {}, "Logged out successfully")
      );

  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(
        new ApiResponse(
          error.statusCode || 500,
          null,
          error.message || "Something went wrong"
        )
      );
  }
};
