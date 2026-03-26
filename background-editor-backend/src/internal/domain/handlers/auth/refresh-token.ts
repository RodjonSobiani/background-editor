import { FastifyReply, FastifyRequest } from "fastify";
import { findUserTokenByHash } from "../../repository/auth";
import { findUserById } from "../../repository/user";
import { TokenService } from "../../services/auth/token-service";
import { IHandlingResponseError } from "../../../shared/error-handler";
import { HttpStatus } from "../../../shared/http-status";
import { EHandlingErrorType } from "../../../common/enums/errors";

export async function refreshTokenHandler(
  request: FastifyRequest<{ Body: { refreshToken: string } }>,
  reply: FastifyReply,
) {
  const { refreshToken } = request.body;

  try {
    const tokenData = await findUserTokenByHash(refreshToken);
    if (!tokenData) {
      const info: IHandlingResponseError = {
        type: EHandlingErrorType.UNAUTHORIZED,
        property: "refreshToken",
      };
      return reply.code(HttpStatus.UNAUTHORIZED).send(info);
    }

    const user = await findUserById(tokenData.user_id);
    if (!user) {
      const info: IHandlingResponseError = {
        type: EHandlingErrorType.NOT_FOUND,
        property: "user",
      };
      return reply.code(HttpStatus.NOT_FOUND).send(info);
    }

    await TokenService.invalidateToken(tokenData.id);

    const tokenParams = {
      fastify: request.server,
      userId: user.id,
      email: user.email,
    };

    const accessToken = TokenService.createAccessToken(tokenParams);
    const newRefreshToken = TokenService.createRefreshToken(tokenParams);

    await TokenService.saveToken({
      userId: user.id,
      token: newRefreshToken,
      request,
    });

    return reply.send({
      accessToken,
      refreshToken: newRefreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    const info: IHandlingResponseError = {
      type: EHandlingErrorType.INTERNAL_SERVER_ERROR,
      property: "token",
    };

    return reply.code(HttpStatus.INTERNAL_SERVER_ERROR).send(info);
  }
}
