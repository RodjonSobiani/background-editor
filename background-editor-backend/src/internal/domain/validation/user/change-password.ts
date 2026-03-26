import { z } from "zod";
import { FastifySchema } from "fastify";
import { regex } from "../../../common/const/regex";

export const zodChangePasswordSchema = z.object({
  currentPassword: z.string().regex(regex.symbolsLatin).min(8).max(63),
  newPassword: z.string().regex(regex.symbolsLatin).min(8).max(63),
});

export type ZodChangePasswordInput = z.infer<typeof zodChangePasswordSchema>;

export const ZodChangePasswordInputSchema: FastifySchema = {
  body: zodChangePasswordSchema,
};

export interface IZodChangePasswordInput {
  Body: ZodChangePasswordInput;
}
