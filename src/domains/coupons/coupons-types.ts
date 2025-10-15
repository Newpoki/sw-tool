import z from "zod";
import { countrySchema } from "../countries/countries-types";
import { langSchema } from "../langs/langs-types";
import { serverSchema } from "../servers/servers-types";
import { com2usAPISuccessResponseSchema } from "../com2us/com2us-types";
import { USE_COUPON_API_ERROR_CODES } from "./coupons-constants";

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

// TODO: MOVE TO COM2US/API
export const useCouponAPIPayloadSchema = z.object({
  country: countrySchema,
  lang: langSchema, // Lang seems to only be used for response API message.
  server: serverSchema,
  hiveid: z.string(),
  coupon: z.string(),
});

export const addCouponAPIPayloadSchema = z.object({
  country: countrySchema,
  lang: langSchema, // Lang seems to only be used for response API message.
  server: serverSchema,
  hiveid: z.string(),
  coupon: z.string(),
});

// TODO: MOVE TO COM2US/API
export const useCouponAPIErrorResponseSchema = z.object({
  retCode: z.enum(USE_COUPON_API_ERROR_CODES),
  retMsg: z.string(),
});

export const fetchCouponAPIPayloadSchema = z.object({
  code: z.string(),
});

/** It might be improved, but I don't have any documentation */
export const useCouponAPIResponseSchema = com2usAPISuccessResponseSchema;

export type AddCouponFormValues = z.infer<typeof addCouponFormValuesSchema>;

export type FetchPaginatedCouponsParams = z.infer<
  typeof fetchPaginatedCouponsParamsSchema
>;

// TODO: MOVE TO COM2US/API
export type UseCouponAPIPayload = z.infer<typeof useCouponAPIPayloadSchema>;

// TODO: MOVE TO COM2US/API
export type UseCouponAPIResponse = z.infer<typeof useCouponAPIResponseSchema>;

export type AddCouponAPIPayload = z.infer<typeof addCouponAPIPayloadSchema>;
