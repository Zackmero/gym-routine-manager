import { Response, Router } from "express";
import { authenticationToken, AuthRequest } from "../middleware/authenticateToken.js";
import prisma from "../prisma/client.js";

const router = Router();

//! Get details of current user
router.get("/me", authenticationToken, async (req: AuthRequest, res): Promise<Response> => {
    try {
        const user = await prisma.user.findUnique({
            where: {id: req.userId},
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            }
        });

        if(!user){
            return res.status(500).json({message: "User not found"});
        }

        return res.json(user);
    } catch (error) {
        console.error("[Get Users Error]:", error);
        return res.status(500).json({ message: "Internal sever error" });
    }
});

export default router;