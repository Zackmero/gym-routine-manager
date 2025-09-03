"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
//!Authentication Routes
//* POST /auth/login -> Log in and obtain JWT 
router.post("/login", authController_1.loginUser);
//* POST /auth/register -> Register a new user
router.post("/register", authController_1.registerUser);
exports.default = router;
