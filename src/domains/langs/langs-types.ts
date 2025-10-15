import z from "zod";
import { LANGS } from "./langs-constants";

export const langSchema = z.enum(LANGS);

export type Server = z.infer<typeof langSchema>;
