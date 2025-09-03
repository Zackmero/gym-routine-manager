import { Response } from "express";
import { AuthRequest } from "../middleware/authenticateToken";
import prisma from "../prisma/client";
import { routineCreateSchema, routineUpdateSchema } from "../validations/routinesValidations";



//! Get all routines for authenticated user
export const getRoutines = async (req: AuthRequest, res: Response) => {

    try {
        const userId = req.userId;

        //* Page list
        // const page = parseInt(req.query.page as string) || 1;
        // const limit = parseInt(req.query.page as string) || 5;
        // const skip = (page - 1) * limit;



        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const routines = await prisma.routine.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });

        //* Count total pages
        const total = await prisma.routine.count({
            where: { userId },
        });

        res.json(routines);
        // res.json({
        //     page,
        //     limit,
        //     total,
        //     totalPages: Math.ceil(total / limit),
        //     routines,
        // });

    } catch (error) {
        console.error("[Get Routines Error]:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//! POST a new routine for authenticated user
export const createRoutine = async (req: AuthRequest, res: Response) => {

    try {
        const { title, description, level } = req.body;
        const userId = req.userId;

        //* Zod validation
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
                userId: userId!,
            }
        });
        console.log("Routine Created:", newRoutine);

        res.status(201).json({ message: "Routine created successfully", routine: newRoutine })
    } catch (error) {
        console.error("[Create Routine Error]:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//! PUT to update a routine by ID for authenticated user
export const updateRoutine = async (req: AuthRequest, res: Response) => {
    try {
        const routineId = parseInt(req.params.id, 10);
        const { title, description, level } = req.body;
        const userId = req.userId;

        //* Zod validation
        const validation = routineUpdateSchema.safeParse(req.body);

        //* Fetch the routine to verify ownership
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

        res.json({ message: "Routine updated successfully", routine: updateRoutine })
    } catch (error) {
        console.error("[Update Routine Error]:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//! DELETE  a routine by ID for authenticated user
export const deleteRoutine = async (req: AuthRequest, res: Response) => {
    try {
        const routineId = parseInt(req.params.id, 10);
        const userId = req.userId;

        //* Fetch the routine to verify ownership
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

        res.json({ message: "Routine deleted successfully", routine: deleteRoutine });
    } catch (error) {
        console.error("[Delete Routine Error]:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};