import {z} from "zod";
import {FastifySchema} from "fastify";

export const zodUpdateAvatarSchema = z.object({
    avatar: z.string().nullable(),
});

export type ZodUpdateAvatarInput = z.infer<typeof zodUpdateAvatarSchema>;

export const ZodUpdateAvatarInputSchema: FastifySchema = {
    body: zodUpdateAvatarSchema,
};

export interface IZodUpdateAvatarInput {
    Body: ZodUpdateAvatarInput;
}
