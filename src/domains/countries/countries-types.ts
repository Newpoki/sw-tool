import z from "zod";
import { COUNTRIES } from "./countries-constants";

export const countrySchema = z.enum(COUNTRIES);

export type Server = z.infer<typeof countrySchema>;
