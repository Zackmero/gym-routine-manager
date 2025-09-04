import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma/client";
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
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
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials: email not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials: password incorrect" });
        }
        const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
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
