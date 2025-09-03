"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoutine = exports.updateRoutine = exports.createRoutine = exports.getRoutines = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const routinesValidations_1 = require("../validations/routinesValidations");
//! Get all routines for authenticated user
const getRoutines = async (req, res) => {
    try {
        const userId = req.userId;
        //* Page list
        // const page = parseInt(req.query.page as string) || 1;
        // const limit = parseInt(req.query.page as string) || 5;
        // const skip = (page - 1) * limit;
        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const routines = await client_1.default.routine.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });
        //* Count total pages
        const total = await client_1.default.routine.count({
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
    }
    catch (error) {
        console.error("[Get Routines Error]:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getRoutines = getRoutines;
//! POST a new routine for authenticated user
const createRoutine = async (req, res) => {
    try {
        const { title, description, level } = req.body;
        const userId = req.userId;
        //* Zod validation
        const validaiton = routinesValidations_1.routineCreateSchema.safeParse(req.body);
        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        if (!validaiton.success) {
            return res.status(400).json({ message: "Please provide title, description and level for the routine" });
        }
        const newRoutine = await client_1.default.routine.create({
            data: {
                title,
                description,
                level,
                userId: userId,
            }
        });
        console.log("Routine Created:", newRoutine);
        res.status(201).json({ message: "Routine created successfully", routine: newRoutine });
    }
    catch (error) {
        console.error("[Create Routine Error]:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.createRoutine = createRoutine;
//! PUT to update a routine by ID for authenticated user
const updateRoutine = async (req, res) => {
    try {
        const routineId = parseInt(req.params.id, 10);
        const { title, description, level } = req.body;
        const userId = req.userId;
        //* Zod validation
        const validation = routinesValidations_1.routineUpdateSchema.safeParse(req.body);
        //* Fetch the routine to verify ownership
        const routine = await client_1.default.routine.findUnique({
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
        const updateRoutine = await client_1.default.routine.update({
            where: { id: routineId },
            data: { title, description, level },
        });
        res.json({ message: "Routine updated successfully", routine: updateRoutine });
    }
    catch (error) {
        console.error("[Update Routine Error]:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateRoutine = updateRoutine;
//! DELETE  a routine by ID for authenticated user
const deleteRoutine = async (req, res) => {
    try {
        const routineId = parseInt(req.params.id, 10);
        const userId = req.userId;
        //* Fetch the routine to verify ownership
        const routine = await client_1.default.routine.findUnique({
            where: { id: routineId }
        });
        if (!routine) {
            return res.status(404).json({ message: "Routine not found" });
        }
        if (routine.userId !== userId) {
            return res.status(403).json({ message: "You are not authorized to edit this routine" });
        }
        const deleteRoutine = await client_1.default.routine.delete({
            where: { id: routineId },
        });
        res.json({ message: "Routine deleted successfully", routine: deleteRoutine });
    }
    catch (error) {
        console.error("[Delete Routine Error]:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.deleteRoutine = deleteRoutine;
