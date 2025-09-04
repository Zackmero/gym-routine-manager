import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController.js";

const router = Router();

//!Authentication Routes
//* POST /auth/login -> Log in and obtain JWT 
router.post("/login", loginUser);

//* POST /auth/register -> Register a new user
router.post("/register", registerUser);

export default router;
