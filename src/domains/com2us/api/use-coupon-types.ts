import z from "zod";
import { com2usAPISuccessResponseSchema } from "../com2us-types";
import { countrySchema } from "~/domains/countries/countries-types";
import { langSchema } from "~/domains/langs/langs-types";
import { serverSchema } from "~/domains/servers/servers-types";
import { USE_COUPON_API_ERROR_CODES } from "./use-coupon-constants";

export const useCouponAPIPayloadSchema = z.object({
  country: countrySchema,
  lang: langSchema, // Lang seems to only be used for response API message.
  server: serverSchema,
  hiveid: z.string(),
  coupon: z.string(),
});

export const useCouponAPIResponseSchema = com2usAPISuccessResponseSchema;

export const useCouponAPIErrorResponseSchema = z.object({
  retCode: z.enum(USE_COUPON_API_ERROR_CODES),
  retMsg: z.string(),
});

export type UseCouponAPIPayload = z.infer<typeof useCouponAPIPayloadSchema>;

export type UseCouponAPIResponse = z.infer<typeof useCouponAPIResponseSchema>;
