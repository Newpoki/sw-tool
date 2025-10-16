import z from "zod";
import { CHECK_USER_API_ERROR_CODES } from "./check-user-constants";
import { countrySchema } from "~/domains/countries/countries-types";
import { langSchema } from "~/domains/langs/langs-types";
import { serverSchema } from "~/domains/servers/servers-types";
import { com2usAPISuccessResponseSchema } from "../com2us-types";

export const checkUserAPIPayloadSchema = z.object({
  country: countrySchema,
  lang: langSchema, // Lang seems to only be used for response API message.
  server: serverSchema,
  hiveid: z.string(),
  coupon: z.string(), // Yes, coupon is needed even if it's only to check if user exists
});

export const checkUserAPIResponseSchema = com2usAPISuccessResponseSchema.extend(
  {
    userData: z.object({
      uid: z.number(),
      server_name: z.string(),
      wizard_name: z.string(),
    }),
  },
);

export const checkUserAPIErrorResponseSchema = z.object({
  // As errors are number, can't use z.enum
  retCode: z.literal(CHECK_USER_API_ERROR_CODES[503]),
  retMsg: z.string(),
});

export type CheckUserAPIResponse = z.infer<typeof checkUserAPIResponseSchema>;

export type CheckUserAPIErrorResponse = z.infer<
  typeof checkUserAPIErrorResponseSchema
>;
