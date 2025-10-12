import z from "zod";
import { SERVERS } from "./servers-constants";

export const serverSchema = z.enum(SERVERS);

export type Server = z.infer<typeof serverSchema>;
