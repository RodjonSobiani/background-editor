import { z } from "zod";
import { FastifySchema } from "fastify";
import { regex } from "../../common/const/regex";

export const zodContactUsSchema = z.object({
  name: z.string().regex(regex.symbolsAll).min(2).max(127),
  email: z.string().email().min(6).max(255).regex(regex.email),
  question: z.string().min(5).max(1024),
  locale: z.string(),
});

export type ZodContactUsInput = z.infer<typeof zodContactUsSchema>;

export const ZodContactUsInputSchema: FastifySchema = {
  body: zodContactUsSchema,
};

export interface IZodContactUsInput {
  Body: ZodContactUsInput;
}
