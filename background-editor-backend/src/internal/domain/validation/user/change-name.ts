import { z } from "zod";
import { FastifySchema } from "fastify";
import { regex } from "../../../common/const/regex";

export const zodChangeNameSchema = z.object({
  name: z.string().regex(regex.symbolsAll).min(2).max(127),
});

export type ZodChangeNameInput = z.infer<typeof zodChangeNameSchema>;

export const ZodChangeNameInputSchema: FastifySchema = {
  body: zodChangeNameSchema,
};

export interface IZodChangeNameInput {
  Body: ZodChangeNameInput;
}
