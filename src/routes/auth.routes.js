import { Router } from "express";
import { getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";


const authRouter = Router()

authRouter.post("/register", registerUser);

authRouter.post("/login", loginUser);

// authRouter.post("/refresh", verifyJWT, refreshAccessToken);
authRouter.post("/refresh", requireAuth, refreshAccessToken);

authRouter.post("/logout", logoutUser);

// authRouter.get("/me", verifyJWT, getCurrentUser);
authRouter.get("/me", requireAuth, getCurrentUser);

export default authRouter