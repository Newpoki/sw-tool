import { createServerFn } from "@tanstack/react-start";
import {
  keepPreviousData,
  MutationOptions,
  queryOptions,
} from "@tanstack/react-query";
import { PrismaClient, Coupon } from "@prisma/client";
import {
  AddCouponFormValues,
  addCouponFormValuesSchema,
  FetchPaginatedCouponsParams,
  fetchPaginatedCouponsParamsSchema as fetchPaginatedCouponsParamsSchema,
} from "./coupons-types";

const prisma = new PrismaClient();

const fetchPaginatedCoupons = createServerFn({ method: "GET" })
  .inputValidator(fetchPaginatedCouponsParamsSchema)
  .handler(async ({ data }) => {
    const [coupons, count] = await Promise.all([
      prisma.coupon.findMany({
        skip: data.pagination.pageIndex * data.pagination.pageSize,
        take: data.pagination.pageSize,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.coupon.count(),
    ]);

    return { elements: coupons, count };
  });

export const fetchPaginatedCouponsQueryOptions = (
  data: FetchPaginatedCouponsParams,
) =>
  queryOptions({
    queryKey: ["coupons", data],
    queryFn: () => fetchPaginatedCoupons({ data }),
    placeholderData: keepPreviousData,
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
