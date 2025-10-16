import { createServerFn } from "@tanstack/react-start";
import {
  keepPreviousData,
  MutationOptions,
  queryOptions,
} from "@tanstack/react-query";
import { Coupon, PrismaClient } from "@prisma/client";
import {
  AddCouponAPIPayload,
  FetchPaginatedCouponsParams,
  fetchPaginatedCouponsParamsSchema as fetchPaginatedCouponsParamsSchema,
} from "./coupons-types";
import { addCouponAPI } from "./api/add-coupon-api";
import { APIResponse } from "~/api/api-types";

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

export const addCouponMutationOptions = (
  coupon?: Coupon,
): MutationOptions<APIResponse<Coupon>, unknown, AddCouponAPIPayload> => ({
  mutationKey: ["coupon", "add", coupon?.id],
  mutationFn: async (data) => await addCouponAPI({ data }),
});
