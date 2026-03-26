import { FastifyInstance } from "fastify";
import { registerHandler } from "../../handlers/auth/register";
import { loginHandler } from "../../handlers/auth/login";
import { recoverPasswordHandler } from "../../handlers/auth/recover-password";
import { resetPasswordHandler } from "../../handlers/auth/reset-password";
import { getMeHandler } from "../../handlers/auth/get-me";
import { refreshTokenHandler } from "../../handlers/auth/refresh-token";
import {
  ZodLoginUserInputSchema,
  ZodRecoverPasswordUserInputSchema,
  ZodRegisterUserInputSchema,
} from "../../validation/auth";

export const authRoutes = async (app: FastifyInstance) => {
  app.post(
    "/register",
    { config: { isPublic: true }, schema: ZodRegisterUserInputSchema },
    registerHandler,
  );

  app.post(
    "/login",
    { config: { isPublic: true }, schema: ZodLoginUserInputSchema },
    loginHandler,
  );
  app.post(
    "/recover-password",
    { config: { isPublic: true }, schema: ZodRecoverPasswordUserInputSchema },
    recoverPasswordHandler,
  );
  app.patch(
    "/reset-password",
    {
      config: { isPublic: true },
    },
    resetPasswordHandler,
  );
  app.get("/get-me", getMeHandler);
  app.post(
    "/refresh-token",
    {
      config: { isPublic: true },
    },
    refreshTokenHandler,
  );
};
