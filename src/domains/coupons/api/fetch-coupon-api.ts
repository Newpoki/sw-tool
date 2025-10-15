import { PrismaClient } from "@prisma/client";
import { createServerFn } from "@tanstack/react-start";
import { fetchCouponAPIPayloadSchema } from "../coupons-types";

const prisma = new PrismaClient();

export const fetchCouponAPI = createServerFn({ method: "POST" })
  .inputValidator(fetchCouponAPIPayloadSchema)
  .handler(async ({ data }) => {
    const existingCoupon = await prisma.coupon.findUnique({
      where: { code: data.code },
    });

    return existingCoupon;
  });
