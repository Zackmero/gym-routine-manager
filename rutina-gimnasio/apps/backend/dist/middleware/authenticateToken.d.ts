import { NextFunction, Request, Response } from "express";
export interface AuthRequest extends Request {
    userId?: number;
}
export declare const authenticationToken: (req: AuthRequest, res: Response, next: NextFunction) => void;
