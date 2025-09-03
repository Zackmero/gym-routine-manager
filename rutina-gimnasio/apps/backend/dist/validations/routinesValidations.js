"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routineUpdateSchema = exports.routineCreateSchema = void 0;
const zod_1 = require("zod");
exports.routineCreateSchema = zod_1.z.object({
    title: zod_1.z.string().min(3, "Title must be at least 3 characters"),
    description: zod_1.z.string().min(5, "Description is required, must be at least 5 characters"),
    level: zod_1.z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
    userId: zod_1.z.number().int().positive().optional(),
});
exports.routineUpdateSchema = zod_1.z.object({
    title: zod_1.z.string().min(3, "Title must be at least 3 characters").optional(),
    description: zod_1.z.string().min(5, "Description is required, must be at least 5 characters").optional(),
    level: zod_1.z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]).optional(),
    userId: zod_1.z.number().int().positive().optional(),
});
