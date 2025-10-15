import z from "zod";
import { COM2US_API_SUCCESS_RET_CODE } from "./com2us-constants";

/** Present on all Com2US API response */
export const com2usAPISuccessResponseSchema = z.object({
  retCode: z.literal(COM2US_API_SUCCESS_RET_CODE),
  retMsg: z.string(),
});
