import { FastifyReply, FastifyRequest } from "fastify";
import { loginService } from "../../services/auth";
import { IZodLoginUserInput } from "../../validation/auth";
import { createUserToken } from "../../repository/auth";
import { IHandlingResponseError } from "../../../shared/error-handler";
import { HttpStatus } from "../../../shared/http-status";
import { EHandlingErrorType } from "../../../common/enums/errors";
import { invalidateOldRefreshTokens } from "../../services/auth/token-service";

export const loginHandler = async (
  request: FastifyRequest<IZodLoginUserInput>,
  reply: FastifyReply,
) => {
  const { email, password } = request.body;

  try {
    const { accessToken, refreshToken, user } = await loginService(
      email,
      password,
      request.server,
    );

    await invalidateOldRefreshTokens(user.id);

    await createUserToken({
      user_id: user.id,
      token_hash: refreshToken,
      type: "refresh",
      expires_at: Date.now() + 7 * 24 * 60 * 60 * 1000,
      ip_address: request.ip,
      user_agent: request.headers["user-agent"] || "",
    });

    reply.send({
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      const info: IHandlingResponseError = {
        type: EHandlingErrorType.NOT_FOUND,
        property: "user",
      };
      return reply.code(HttpStatus.NOT_FOUND).send(info);
    }
  }
};
