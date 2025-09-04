import { Response } from "express";
import { AuthRequest } from "../middleware/authenticateToken";
export declare const getRoutines: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createRoutine: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateRoutine: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteRoutine: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
