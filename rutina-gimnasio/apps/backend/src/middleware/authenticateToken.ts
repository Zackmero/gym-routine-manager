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

// ✅ CORREGIDO: Agregado tipo de retorno ': void'
export const authenticationToken = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void => {
    //* Extract token from Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    //* Check if token exists
    if (!token) {
        res.status(401).json({ message: "Access token missing" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        // Verificación de tipo más simple
        if (typeof decoded === 'object' && decoded && 'sub' in decoded) {
            req.userId = (decoded as any).sub;
            next();
        } else {
            res.status(403).json({ message: "Invalid token structure" });
            return;
        }
    } catch (error) {
        res.status(403).json({ message: "Invalid token or expired" });
        return;
    }
};