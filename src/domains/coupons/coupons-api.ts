import { createServerFn } from "@tanstack/react-start";
import { MutationOptions, queryOptions } from "@tanstack/react-query";
import { PrismaClient, Coupon } from "@prisma/client";
import {
  AddCouponFormValues,
  addCouponFormValuesSchema,
} from "./coupons-types";

const prisma = new PrismaClient();

const fetchCoupons = createServerFn({ method: "GET" }).handler(async () => {
  const data = await prisma.coupon.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
});

export const couponsQueryOptions = () =>
  queryOptions({
    queryKey: ["coupons"],
    queryFn: () => fetchCoupons(),
  });

const addCoupons = createServerFn({ method: "POST" })
  .inputValidator(addCouponFormValuesSchema)
  .handler(async ({ data }) => {
    const coupon = await prisma.coupon.create({
      data: {
        code: data.code,
        expiresAt: data.expiresAt,
      },
    });

    return coupon;
  });

export const addCouponsMutationOptions = (): MutationOptions<
  Coupon,
  unknown,
  AddCouponFormValues
> => ({
  mutationKey: ["coupon", "add"],
  mutationFn: async (data: AddCouponFormValues) => await addCoupons({ data }),
});
