import { PaginationState } from "@tanstack/react-table";

export const COUPONS_TABLE_DEFAULT_PAGINATION_STATE = {
  pageIndex: 0,
  pageSize: 10,
} as const satisfies PaginationState;

export const COUPONS_TABLE_INITIAL_COLUMNS_VISIBILITY_LS_KEY =
  "COUPONS_TABLE_INITIAL_COLUMNS_VISIBILITY_LS_KEY";
