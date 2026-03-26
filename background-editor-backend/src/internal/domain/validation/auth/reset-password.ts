import { z } from "zod";
import { FastifySchema } from "fastify";
import { regex } from "../../../common/const/regex";

export const zodResetPasswordUserSchema = z.object({
  token: z.string(),
  newPassword: z.string().regex(regex.password).min(8).max(63),
});

export type ZodResetPasswordUserInput = z.infer<
  typeof zodResetPasswordUserSchema
>;

export const ZodResetPasswordUserInputSchema: FastifySchema = {
  body: zodResetPasswordUserSchema,
};

export interface IZodResetPasswordUserInput {
  Body: ZodResetPasswordUserInput;
}
