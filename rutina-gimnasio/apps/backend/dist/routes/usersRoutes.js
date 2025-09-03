"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateToken_1 = require("../middleware/authenticateToken");
const client_1 = __importDefault(require("../prisma/client"));
const router = (0, express_1.Router)();
//! Get details of current user
router.get("/me", authenticateToken_1.authenticationToken, async (req, res) => {
    try {
        const user = await client_1.default.user.findUnique({
            where: { id: req.userId },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            }
        });
        if (!user) {
            return res.status(500).json({ message: "User not found" });
        }
        res.json(user);
    }
    catch (error) {
        console.error("[Get Users Error]:", error);
        res.status(500).json({ message: "Internal sever error" });
    }
});
exports.default = router;
