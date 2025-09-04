import { Router } from "express";
import { createRoutine, deleteRoutine, getRoutines, updateRoutine } from "../controllers/routinesController";
import { authenticationToken } from "../middleware/authenticateToken";
const router = Router();
router.get("/", authenticationToken, getRoutines);
router.post("/", authenticationToken, createRoutine);
router.put("/:id", authenticationToken, updateRoutine);
router.delete("/:id", authenticationToken, deleteRoutine);
export default router;
