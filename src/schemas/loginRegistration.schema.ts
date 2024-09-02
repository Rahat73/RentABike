import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string({
    required_error: "Password is required",
  }),
});

export const registrationSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters long"),
  phone: z
    .string({
      required_error: "Phone number is required",
    })
    .min(10, "Invalid phone number (minimum length should be 10)"),
  address: z.string({
    required_error: "Address is required",
  }),
});
