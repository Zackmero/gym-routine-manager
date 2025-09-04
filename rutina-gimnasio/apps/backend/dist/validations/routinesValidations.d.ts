import { z } from "zod";
export declare const routineCreateSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    level: z.ZodEnum<{
        BEGINNER: "BEGINNER";
        INTERMEDIATE: "INTERMEDIATE";
        ADVANCED: "ADVANCED";
    }>;
    userId: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const routineUpdateSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    level: z.ZodOptional<z.ZodEnum<{
        BEGINNER: "BEGINNER";
        INTERMEDIATE: "INTERMEDIATE";
        ADVANCED: "ADVANCED";
    }>>;
    userId: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type RoutineFormDataCreate = z.infer<typeof routineCreateSchema>;
export type RoutineFormDataUpdate = z.infer<typeof routineUpdateSchema>;
