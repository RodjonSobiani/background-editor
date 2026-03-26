import { z } from "zod";
import { FastifySchema } from "fastify";
import { regex } from "../../../common/const/regex";

export const zodRegisterUserSchema = z.object({
  name: z.string().trim().regex(regex.symbolsAll).min(2).max(127),
  email: z.string().email().min(6).max(255).regex(regex.email),
  password: z.string().regex(regex.password).min(8).max(63),
});

export type ZodRegisterUserInput = z.infer<typeof zodRegisterUserSchema>;

export const ZodRegisterUserInputSchema: FastifySchema = {
  body: zodRegisterUserSchema,
};

export interface IZodRegisterUserInput {
  Body: ZodRegisterUserInput;
}
