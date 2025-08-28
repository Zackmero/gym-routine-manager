import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

//! Middleware to protect private routes -----------------------------------------
export interface AuthRequest extends Request {
    userId?: number;
}

interface JwtPayload {
    sub: number;
    iat: number;
    exp: number;
}

function isJwtPayload(decoded: string | object): decoded is JwtPayload {
    return typeof decoded === 'object' && decoded != null && 'sub' in decoded;
}

export const authenticationToken = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    //* Extract token from Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    //* Check if token exists
    if (!token) {
        return res.status(401).json({ message: "Access token missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        if (!isJwtPayload(decoded)) {
            return res.status(403).json({ message: "Invalid token structure" });
        }

        req.userId = decoded.sub;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token or expired" });
    }
};