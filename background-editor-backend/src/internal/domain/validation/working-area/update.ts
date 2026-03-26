import {z} from "zod";
import {FastifySchema} from "fastify";
import {ZodWorkingAreaGetByIdInput, zodWorkingAreaGetByIdSchema} from "./get";

export const zodWorkingAreaRemoveImagesSchema = z.object({
    ids: z.array(z.string().uuid()).min(1).max(3),
});

export type ZodWorkingAreaRemoveImagesInput = z.infer<typeof zodWorkingAreaRemoveImagesSchema>;

export const ZodWorkingAreaRemoveImagesInputSchema: FastifySchema = {
    body: zodWorkingAreaRemoveImagesSchema,
    params: zodWorkingAreaGetByIdSchema
};

export interface IZodWorkingAreaRemoveImagesInput {
    Body: ZodWorkingAreaRemoveImagesInput;
    Params: ZodWorkingAreaGetByIdInput;
}

export const zodWorkingAreaAddImagesSchema = z.object({
    images: z.array(z.string()).min(1).max(3),
});

export type ZodWorkingAreaAddImagesInput = z.infer<typeof zodWorkingAreaAddImagesSchema>;

export const ZodWorkingAreaAddImagesInputSchema: FastifySchema = {
    body: zodWorkingAreaAddImagesSchema,
    params: zodWorkingAreaGetByIdSchema
};

export interface IZodWorkingAreaAddImagesInput {
    Body: ZodWorkingAreaAddImagesInput;
    Params: ZodWorkingAreaGetByIdInput;
}