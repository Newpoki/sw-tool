import z from "zod";

export const addCouponFormValuesSchema = z.object({
  autoUse: z.boolean(),
  code: z.string().min(1, "Coupon code is required"),
  expiresAt: z
    .date()
    .refine((date) => date > new Date(), {
      message: "Expiration date must be in the future",
    })
    .optional(),
});

export type AddCouponFormValues = z.infer<typeof addCouponFormValuesSchema>;
