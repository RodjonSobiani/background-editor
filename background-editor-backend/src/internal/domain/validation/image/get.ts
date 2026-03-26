import {z} from "zod";
import {FastifySchema} from "fastify";

export const zodGetPresignedUrlSchema = z.object({
    folder: z.string(),
    name: z.string(),
});

export type ZodGetPresignedUrlInput = z.infer<typeof zodGetPresignedUrlSchema>;

export const ZodGetPresignedUrlInputSchema: FastifySchema = {
    params: zodGetPresignedUrlSchema,
};

export interface IZodGetPresignedUrlInput {
    Params: ZodGetPresignedUrlInput;
}