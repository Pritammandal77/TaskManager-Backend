import jwt from "jsonwebtoken";
import { User } from "../models/auth.model.js";

export const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken; // get token from cookie
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    // verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // get user from DB
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    // attach full user object to request
    req.user = user;
    next(); // continue to the next middleware/controller
  } catch (err) {
    console.log("Error")
    console.error(err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

