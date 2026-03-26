import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { config } from "../../../app/config";

interface User {
  id: string;
}

declare module "fastify" {
  interface FastifyRequest {
    currentUser?: User;
  }
}

export async function authMiddleware(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return reply
      .status(401)
      .send({ error: "Authorization token is missing or invalid" });
  }

  const accessToken = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(accessToken, config.jwt.secret) as {
      userId: string;
    };
    request.currentUser = { id: decoded.userId };
  } catch (error) {
    return reply
      .status(401)
      .send({ error: "Middleware: Invalid or expired token" });
  }
}
