import { z } from "zod";
export const loginSchema = z.object({
    email: z.string().email("Must be a valid email"),
    password: z.string().min(3, "The password must be at least 3 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;