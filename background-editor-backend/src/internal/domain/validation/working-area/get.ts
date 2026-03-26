import {z} from "zod";
import {FastifySchema} from "fastify";

export const zodWorkingAreaGetByIdSchema = z.object({
    id: z.string().uuid(),
});

export type ZodWorkingAreaGetByIdInput = z.infer<typeof zodWorkingAreaGetByIdSchema>;

export const ZodWorkingAreaGetByIdInputSchema: FastifySchema = {
    params: zodWorkingAreaGetByIdSchema,
};

export interface IZodWorkingAreaGetByIdInput {
    Params: ZodWorkingAreaGetByIdInput;
}