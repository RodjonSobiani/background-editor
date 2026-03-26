import { z } from "zod";
import { FastifySchema } from "fastify";
import { regex } from "../../../common/const/regex";

export const zodLoginUserSchema = z.object({
  email: z.string().email().min(6).max(255).regex(regex.email),
  password: z.string().regex(regex.symbolsLatin).min(8).max(63),
});

export type ZodLoginUserInput = z.infer<typeof zodLoginUserSchema>;

export const ZodLoginUserInputSchema: FastifySchema = {
  body: zodLoginUserSchema,
};

export interface IZodLoginUserInput {
  Body: ZodLoginUserInput;
}
