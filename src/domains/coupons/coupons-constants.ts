import { PaginationState } from "@tanstack/react-table";

export const COUPONS_TABLE_DEFAULT_PAGINATION_STATE = {
  pageIndex: 0,
  pageSize: 5,
} as const satisfies PaginationState;

export const COUPONS_TABLE_INITIAL_COLUMNS_VISIBILITY_LS_KEY =
  "COUPONS_TABLE_INITIAL_COLUMNS_VISIBILITY_LS_KEY";

export const USE_COUPON_API_ERROR_CODES = {
  "(H302)": "(H302)",
  "(H304)": "(H304)",
  "(H306)": "(H306)",
} as const;

export const USE_COUPON_API_ERROR_CODES_MAPPING = {
  "(H302)": "INVALID_COUPON",
  "(H304)": "COUPON_ALREADY_USED",
  "(H306)": "EXPIRED_COUPON",
} as const;
