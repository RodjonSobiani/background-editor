import { FastifyInstance } from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCors from "@fastify/cors";
import { config } from "../../config";
import { usePublicRoute } from "../../../internal/shared/hooks/public-route";
import { authRoutes } from "../../../internal/domain/routes/auth";
import { userRoutes } from "../../../internal/domain/routes/user";
import { uploadRoutes } from "../../../internal/domain/routes/images";
import { workingAreaRoutes } from "../../../internal/domain/routes/working-area";
import { contactUsRoutes } from "../../../internal/domain/routes/contact-us";

export default async function routes(app: FastifyInstance) {
  app.register(fastifyCors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type", "X-User-Language"],
    credentials: false,
  });

  app.register(fastifyJwt, { secret: config.jwt.secret });

  await usePublicRoute(app);

  app.register(authRoutes, { prefix: "/auth" });
  app.register(userRoutes, { prefix: "/user" });
  app.register(uploadRoutes, { prefix: "/upload" });
  app.register(workingAreaRoutes, { prefix: "/working-area" });
  app.register(contactUsRoutes);
}
