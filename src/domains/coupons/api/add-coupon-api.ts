import { createServerFn } from "@tanstack/react-start";
import { APIResponse } from "~/api/api-types";
import { addCouponAPIPayloadSchema } from "../coupons-types";
import { Coupon, PrismaClient } from "@prisma/client";
import { fetchCouponAPI } from "./fetch-coupon-api";
import { useCouponAPI } from "~/domains/com2us/api/use-coupon-api";
import { USE_COUPON_API_ERROR_CODES_MAPPING } from "~/domains/com2us/api/use-coupon-constants";
import { checkUserAPI } from "~/domains/com2us/api/check-user-api";

const prisma = new PrismaClient();

export const addCouponAPI = createServerFn({ method: "POST" })
  .inputValidator(addCouponAPIPayloadSchema)
  .handler(async ({ data }): Promise<APIResponse<Coupon>> => {
    const userResponse = await checkUserAPI({ data });

    if (!userResponse.success) {
      return userResponse;
    }

    const useCouponResponse = await useCouponAPI({ data });

    if (!useCouponResponse.success) {
      const isInvalidCoupon =
        useCouponResponse.code === USE_COUPON_API_ERROR_CODES_MAPPING["(H302)"];

      // If the coupon is not valid, there is no reason to continue
      if (isInvalidCoupon) {
        return useCouponResponse;
      }

      const existingCoupon = await fetchCouponAPI({
        data: { code: data.coupon },
      });

      const hasCouponExpired =
        useCouponResponse.code === USE_COUPON_API_ERROR_CODES_MAPPING["(H306)"];

      // If coupon has expired, we must check if we have this coupon in database
      // So we can tag it as expired
      if (hasCouponExpired) {
        if (existingCoupon) {
          // Coupon already in DB, just return the error
          return useCouponResponse;
        }

        // We can add it in the DB, so user might not lose time
        // Trying to redeem it if they see it as expired
        await prisma.coupon.create({
          data: {
            code: data.coupon,
            expiresAt: new Date(),
          },
        });
      }

      const isCouponAlreadyUsed =
        useCouponResponse.code === USE_COUPON_API_ERROR_CODES_MAPPING["(H304)"];
      // If coupon has already been used, we must check if we have this coupon in database
      // So we can add it for other users

      if (isCouponAlreadyUsed) {
        if (existingCoupon) {
          // Coupon already in DB, just return the error
          return useCouponResponse;
        }

        // Add it (without expiration - still valid for others)
        await prisma.coupon.create({
          data: {
            code: data.coupon,
          },
        });

        return { success: false, code: "ALREADY_USED_ADDED_LIST" };
      }

      return useCouponResponse;
    }

    const existingCoupon = await fetchCouponAPI({
      data: { code: data.coupon },
    });

    if (!existingCoupon) {
      const addedCoupon = await prisma.coupon.create({
        data: {
          code: data.coupon,
          // TODO: Add ExpiresAt
          //   expiresAt: data.expiresAt,
        },
      });

      return {
        success: true,
        data: addedCoupon,
      };
    }

    return {
      success: true,
      data: existingCoupon,
    };
  });
