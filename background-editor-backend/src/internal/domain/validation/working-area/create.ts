import {z} from "zod";
import {FastifySchema} from "fastify";

export const zodWorkingAreaCreateSchema = z.object({
    images: z.array(z.string()).min(1).max(3),
});

export type ZodWorkingAreaCreateInput = z.infer<typeof zodWorkingAreaCreateSchema>;

export const ZodWorkingAreaCreateInputSchema: FastifySchema = {
    body: zodWorkingAreaCreateSchema,
};

export interface IZodWorkingAreaCreateInput {
    Body: ZodWorkingAreaCreateInput;
}