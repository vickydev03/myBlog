import z from "zod";

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(1),
    name: z.string(),
    confirmPassword: z.string().min(1),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // This sets the error on the confirmPassword field
  });

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),

});
