import { z } from "zod";
import { serverSchema } from "../servers/servers-types";

export const settingsFormValuesSchema = z.object({
  hiveId: z.string().min(1, "Hive ID is required."),
  server: serverSchema,
});

export const settingsSchema = z.object({
  hiveId: z.string().min(1),
  server: serverSchema,
});

export type SettingsFormValues = z.infer<typeof settingsFormValuesSchema>;

export type SettingsSchema = z.infer<typeof settingsSchema>;
