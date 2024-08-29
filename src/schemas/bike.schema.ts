import { z } from "zod";

export const bikeValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  pricePerHour: z.number().positive("Price per hour must be a positive number"),
  isAvailable: z.boolean().optional(),
  cc: z.number().positive("CC must be a positive number"),
  year: z.number().int().positive("Year must be a positive integer"),
  model: z.string().min(1, "Model is required"),
  brand: z.string().min(1, "Brand is required"),
});
