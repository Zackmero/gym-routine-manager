import { Router } from "express";
import { createRoutine, deleteRoutine, getRoutines, updateRoutine } from "../controllers/routinesController.js";
import { authenticationToken } from "../middleware/authenticateToken.js";

const router = Router();

//* Get routines
router.get("/", authenticationToken, getRoutines);

//* Create routine
router.post("/", authenticationToken, createRoutine);

//* Update Routine
router.put("/:id", authenticationToken, updateRoutine);

//* Delete Routine
router.delete("/:id", authenticationToken, deleteRoutine);



export default router;