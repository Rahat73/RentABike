import { z } from "zod";

export const couponValidationSchema = z.object({
  couponCode: z.string().min(1, "Coupon code is required"),
  discountPercent: z.number().positive("Discount must be a positive number"),
});
