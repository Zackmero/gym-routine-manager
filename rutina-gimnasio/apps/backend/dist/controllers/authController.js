"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = __importDefault(require("../prisma/client"));
//! Register: create a new user into database --------------------------------------------------------
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        //* Check if user alreaty exists
        const existingUser = await client_1.default.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }
        //* Encrypt hash password
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        //* Save new user in DB
        const newUser = await client_1.default.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        console.log(newUser);
        return res
            .status(201)
            .json({ message: "User registered successfully", user: newUser });
    }
    catch (error) {
        console.error("[Register Error]", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.registerUser = registerUser;
//! Login: Auithentication and response with generate JWT token -----------------------------------------------
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        //* Find user by emal
        const user = await client_1.default.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials: email not found" });
        }
        //* Compare entered password with hash password
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials: password incorrect" });
        }
        //* Generate JWT token with id user
        const token = jsonwebtoken_1.default.sign({ sub: user.id }, //^ sub = subject (user ID)
        process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (error) {
        console.error("[Login Error]", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.loginUser = loginUser;
