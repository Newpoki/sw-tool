import z from "zod";

export const addCouponFormValuesSchema = z.object({
  code: z.string().min(1, "Coupon code is required"),
});

export type AddCouponFormValues = z.infer<typeof addCouponFormValuesSchema>;
