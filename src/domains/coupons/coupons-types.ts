import z from "zod";

export const fetchPaginatedCouponsParamsSchema = z.object({
  pagination: z.object({
    pageIndex: z.number().gte(0),
    pageSize: z.number().gt(0),
  }),
});

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

export const couponsTableInitialColumnsVisibilitySchema = z.record(
  z.string(),
  z.boolean(),
);

export type AddCouponFormValues = z.infer<typeof addCouponFormValuesSchema>;

export type FetchPaginatedCouponsParams = z.infer<
  typeof fetchPaginatedCouponsParamsSchema
>;
