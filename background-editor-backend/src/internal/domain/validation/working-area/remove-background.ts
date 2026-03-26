import {z} from "zod";
import {FastifySchema} from "fastify";
import {ZodWorkingAreaGetByIdInput, zodWorkingAreaGetByIdSchema} from "./get";

export const zodWorkingAreaRemoveBackgroundImageSchema = z.object({
    image_id: z.string().uuid(),
});

export type ZodWorkingAreaRemoveBackgroundImageInput = z.infer<typeof zodWorkingAreaRemoveBackgroundImageSchema>;

export const ZodWorkingAreaRemoveBackgroundImageInputSchema: FastifySchema = {
    body: zodWorkingAreaRemoveBackgroundImageSchema,
    params: zodWorkingAreaGetByIdSchema
};

export interface IZodWorkingAreaRemoveBackgroundImageInput {
    Body: ZodWorkingAreaRemoveBackgroundImageInput;
    Params: ZodWorkingAreaGetByIdInput;
}