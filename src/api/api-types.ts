export type APIResponse<TData> =
  | { success: true; data: TData }
  | { success: false; code: string };
