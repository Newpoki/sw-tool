import z from "zod";
import { countrySchema } from "../countries/countries-types";
import { langSchema } from "../langs/langs-types";
import { serverSchema } from "../servers/servers-types";

export const fetchPaginatedCouponsParamsSchema = z.object({
  pagination: z.object({
    pageIndex: z.number().gte(0),
    pageSize: z.number().gt(0),
  }),
});

export const addCouponFormValuesSchema = z.object({
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

export const addCouponAPIPayloadSchema = z.object({
  country: countrySchema,
  lang: langSchema, // Lang seems to only be used for response API message.
  server: serverSchema,
  hiveid: z.string(),
  coupon: z.string(),
});

export const fetchCouponAPIPayloadSchema = z.object({
  code: z.string(),
});

export type AddCouponFormValues = z.infer<typeof addCouponFormValuesSchema>;

export type FetchPaginatedCouponsParams = z.infer<
  typeof fetchPaginatedCouponsParamsSchema
>;

export type AddCouponAPIPayload = z.infer<typeof addCouponAPIPayloadSchema>;
