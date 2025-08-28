import { z } from "zod";


export const routineCreateSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(5, "Description is required, must be at least 5 characters"),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
  userId: z.number().int().positive().optional(),
});

export const routineUpdateSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").optional(),
  description: z.string().min(5, "Description is required, must be at least 5 characters").optional(),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]).optional(),
  userId: z.number().int().positive().optional(),
});


export type RoutineFormDataCreate = z.infer<typeof routineCreateSchema>;

export type RoutineFormDataUpdate = z.infer<typeof routineUpdateSchema>;
