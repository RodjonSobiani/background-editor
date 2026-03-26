import { z } from "zod";
import { FastifySchema } from "fastify";
import { regex } from "../../../common/const/regex";

export const zodChangeEmailSchema = z.object({
  password: z.string().regex(regex.symbolsLatin).min(8).max(63),
  email: z.string().email().min(6).max(255).regex(regex.email),
});

export type ZodChangeEmailInput = z.infer<typeof zodChangeEmailSchema>;

export const ZodChangeEmailInputSchema: FastifySchema = {
  body: zodChangeEmailSchema,
};

export interface IZodChangeEmailInput {
  Body: ZodChangeEmailInput;
}
