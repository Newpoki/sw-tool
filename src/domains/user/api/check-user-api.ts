import { createServerFn } from "@tanstack/react-start";
import {
  checkUserAPIErrorResponseSchema,
  checkUserAPIPayloadSchema,
  CheckUserAPIResponse,
  checkUserAPIResponseSchema,
} from "../user-types";
import { APIResponse } from "~/api/api-types";
import { CHECK_USER_API_ERROR_CODES_MAPPING } from "../user-constants";

const CHECK_USER_API_HEADERS = {
  Accept: "application/json, text/javascript, */*; q=0.01",
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  Origin: "https://event.withhive.com",
  Referer: "https://event.withhive.com/ci/smon/checkUser",
  "User-Agent": "Mozilla/5.0",
  "X-Requested-With": "XMLHttpRequest",
} as const;

export const checkUserAPI = createServerFn({ method: "POST" })
  .inputValidator(checkUserAPIPayloadSchema)
  .handler(async ({ data }): Promise<APIResponse<CheckUserAPIResponse>> => {
    const body = new URLSearchParams(data);

    const response = await fetch(
      "https://event.withhive.com/ci/smon/evt_coupon/checkUser",
      {
        method: "POST",
        body,
        headers: CHECK_USER_API_HEADERS,
      },
    );

    const json = await response.json();

    // Try parsing as success response first
    const successParse = checkUserAPIResponseSchema.safeParse(json);
    if (successParse.success) {
      return {
        success: true,
        data: successParse.data,
      };
    }

    // Try parsing as error response
    const errorParse = checkUserAPIErrorResponseSchema.safeParse(json);

    if (errorParse.success) {
      return {
        success: false,
        code: CHECK_USER_API_ERROR_CODES_MAPPING[errorParse.data.retCode],
      };
    }

    // If the error is not an usual COM2US API response
    return { success: false, code: "UNKNOWN_ERROR" };
  });
