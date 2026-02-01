import jwt from "jsonwebtoken";
import { User } from "../models/auth.model.js";

export const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    req.user = user;
    next();
  } catch (err) {
    console.log("Error")
    console.error(err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

