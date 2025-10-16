import { z } from "zod";
import { serverSchema } from "../servers/servers-types";
import { langSchema } from "../langs/langs-types";

export const settingsFormValuesSchema = z.object({
  hiveId: z.string().min(1, "Hive ID is required."),
  server: serverSchema,
  lang: langSchema,
});

export type SettingsFormValues = z.infer<typeof settingsFormValuesSchema>;
