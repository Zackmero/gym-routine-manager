import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../prisma/client.js";

//! Register: create a new user into database --------------------------------------------------------
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    //* Check if user alreaty exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    //* Encrypt hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //* Save new user in DB
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
  } catch (error) {
    console.error("[Register Error]", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//! Login: Auithentication and response with generate JWT token -----------------------------------------------
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;


    //* Find user by emal
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials: email not found" });
    }


    //* Compare entered password with hash password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials: password incorrect" });
    }

    //* Generate JWT token with id user
    const token = jwt.sign(
      { sub: user.id },  //^ sub = subject (user ID)
      process.env.JWT_SECRET as string, {
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
  } catch (error) {
    console.error("[Login Error]", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
