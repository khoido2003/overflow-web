import { z } from "zod";

// Sign In
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

// Sign Up
export const registerSchema = z
  .object({
    email: z.string().email({
      message: "Email is required!",
    }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters!" }),

    passwordConfirm: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),

    name: z.string().min(1, {
      message: "Name is required!",
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Password don't match!",
    path: ["passwordConfirm"],
  });

///////////////////////////////////////////////

// TYPES

export type loginPayload = z.infer<typeof loginSchema>;
export type registerPayload = z.infer<typeof registerSchema>;
