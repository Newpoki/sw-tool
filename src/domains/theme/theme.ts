import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import { z } from "zod";

export const THEME = {
  LIGHT: "light",
  DARK: "dark",
} as const;

const themeSchema = z.enum(THEME);

export type Theme = z.infer<typeof themeSchema>;

const storageKey = "_preferred-theme";

export const getThemeServerFn = createServerFn().handler(() => {
  const result = themeSchema.safeParse(getCookie(storageKey));

  return result.success ? result.data : THEME.LIGHT;
});

export const setThemeServerFn = createServerFn({ method: "POST" })
  .inputValidator(themeSchema)
  .handler(({ data }) => setCookie(storageKey, data));
