import { z } from "zod";
import { FastifySchema } from "fastify";
import { regex } from "../../../common/const/regex";

export const zodRecoverPasswordUserSchema = z.object({
  email: z.string().email().min(6).max(255).regex(regex.email),
  link: z.string(),
  locale: z.string(),
});

export type ZodRecoverPasswordUserInput = z.infer<
  typeof zodRecoverPasswordUserSchema
>;

export const ZodRecoverPasswordUserInputSchema: FastifySchema = {
  body: zodRecoverPasswordUserSchema,
};

export interface IZodRecoverPasswordUserInput {
  Body: ZodRecoverPasswordUserInput;
}
