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
