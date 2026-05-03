import * as z from "zod";

export const loginSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(6, "min 6 caracters"),
});

export const registerSchema = z.object({
  username: z.string().min(3, "min 3 caracters"),
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(6, "min 6 caracters"),
});
