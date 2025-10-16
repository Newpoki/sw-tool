import { createServerFn } from "@tanstack/react-start";
import { APIResponse } from "~/api/api-types";
import {
  useCouponAPIErrorResponseSchema,
  useCouponAPIPayloadSchema,
  UseCouponAPIResponse,
  useCouponAPIResponseSchema,
} from "./use-coupon-types";
import { USE_COUPON_API_ERROR_CODES_MAPPING } from "./use-coupon-constants";

const USE_COUPON_API_HEADERS = {
  Accept: "application/json, text/javascript, */*; q=0.01",
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  Origin: "https://event.withhive.com",
  Referer: "https://event.withhive.com/ci/smon/useCoupon",
  "User-Agent": "Mozilla/5.0",
  "X-Requested-With": "XMLHttpRequest",
} as const;

export const useCouponAPI = createServerFn({ method: "POST" })
  .inputValidator(useCouponAPIPayloadSchema)
  .handler(async ({ data }): Promise<APIResponse<UseCouponAPIResponse>> => {
    const body = new URLSearchParams(data);

    const response = await fetch(
      "https://event.withhive.com/ci/smon/evt_coupon/useCoupon",
      {
        method: "POST",
        body,
        headers: USE_COUPON_API_HEADERS,
      },
    );

    const json = await response.json();

    // Try parsing as success response first
    const successParse = useCouponAPIResponseSchema.safeParse(json);
    if (successParse.success) {
      return {
        success: true,
        data: successParse.data,
      };
    }

    // Try parsing as error response
    const errorParse = useCouponAPIErrorResponseSchema.safeParse(json);

    if (errorParse.success) {
      return {
        success: false,
        code: USE_COUPON_API_ERROR_CODES_MAPPING[errorParse.data.retCode],
      };
    }

    // If the error is not an usual COM2US API response
    return { success: false, code: "UNKNOWN_ERROR" };
  });
