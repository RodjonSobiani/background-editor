import {z} from "zod";
import {FastifySchema} from "fastify";
import {ZodWorkingAreaGetByIdInput, zodWorkingAreaGetByIdSchema} from "./get";

export const zodWorkingAreaReplaceBackgroundImageSchema = z.object({
    image_id: z.string().uuid(),
    background: z.string(),
});

export type ZodWorkingAreaReplaceBackgroundImageInput = z.infer<typeof zodWorkingAreaReplaceBackgroundImageSchema>;

export const ZodWorkingAreaReplaceBackgroundImageInputSchema: FastifySchema = {
    body: zodWorkingAreaReplaceBackgroundImageSchema,
    params: zodWorkingAreaGetByIdSchema
};

export interface IZodWorkingAreaReplaceBackgroundImageInput {
    Body: ZodWorkingAreaReplaceBackgroundImageInput;
    Params: ZodWorkingAreaGetByIdInput;
}