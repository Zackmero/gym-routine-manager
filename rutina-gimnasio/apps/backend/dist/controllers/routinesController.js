import prisma from "../prisma/client.js";
import { routineCreateSchema, routineUpdateSchema } from "../validations/routinesValidations.js";
export const getRoutines = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const routines = await prisma.routine.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });
        const total = await prisma.routine.count({
            where: { userId },
        });
        return res.json(routines);
    }
    catch (error) {
        console.error("[Get Routines Error]:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
export const createRoutine = async (req, res) => {
    try {
        const { title, description, level } = req.body;
        const userId = req.userId;
        const validaiton = routineCreateSchema.safeParse(req.body);
        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        if (!validaiton.success) {
            return res.status(400).json({ message: "Please provide title, description and level for the routine" });
        }
        const newRoutine = await prisma.routine.create({
            data: {
                title,
                description,
                level,
                userId: userId,
            }
        });
        console.log("Routine Created:", newRoutine);
        return res.status(201).json({ message: "Routine created successfully", routine: newRoutine });
    }
    catch (error) {
        console.error("[Create Routine Error]:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
export const updateRoutine = async (req, res) => {
    try {
        const routineId = parseInt(req.params.id, 10);
        const { title, description, level } = req.body;
        const userId = req.userId;
        const validation = routineUpdateSchema.safeParse(req.body);
        const routine = await prisma.routine.findUnique({
            where: { id: routineId }
        });
        if (!validation.success) {
            return res.status(400).json({ message: "Update error validation" });
        }
        if (!routine) {
            return res.status(404).json({ message: "Routine not found" });
        }
        if (routine.userId !== userId) {
            return res.status(403).json({ message: "You are not authorized to edit this routine" });
        }
        const updateRoutine = await prisma.routine.update({
            where: { id: routineId },
            data: { title, description, level },
        });
        return res.json({ message: "Routine updated successfully", routine: updateRoutine });
    }
    catch (error) {
        console.error("[Update Routine Error]:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
export const deleteRoutine = async (req, res) => {
    try {
        const routineId = parseInt(req.params.id, 10);
        const userId = req.userId;
        const routine = await prisma.routine.findUnique({
            where: { id: routineId }
        });
        if (!routine) {
            return res.status(404).json({ message: "Routine not found" });
        }
        if (routine.userId !== userId) {
            return res.status(403).json({ message: "You are not authorized to edit this routine" });
        }
        const deleteRoutine = await prisma.routine.delete({
            where: { id: routineId },
        });
        return res.json({ message: "Routine deleted successfully", routine: deleteRoutine });
    }
    catch (error) {
        console.error("[Delete Routine Error]:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
