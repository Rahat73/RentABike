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
  password: z.string({
    required_error: "Password is required",
  }),
  phone: z.string({
    required_error: "Phone number is required",
  }),
  address: z.string({
    required_error: "Address is required",
  }),
});
