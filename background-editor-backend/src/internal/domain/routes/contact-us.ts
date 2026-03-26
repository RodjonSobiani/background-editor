import { FastifyInstance } from "fastify";
import { contactUsHandler } from "../handlers/contact-us";
import { ZodContactUsInputSchema } from "../validation/contact-us";

export const contactUsRoutes = async (app: FastifyInstance) => {
  app.post(
    "/contact-us",
    { config: { isPublic: true }, schema: ZodContactUsInputSchema },
    contactUsHandler,
  );
};
