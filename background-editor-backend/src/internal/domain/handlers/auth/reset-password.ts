import { FastifyReply, FastifyRequest } from "fastify";
import { resetPassword } from "../../services/auth";
import { IZodResetPasswordUserInput } from "../../validation/auth/reset-password";
import { IHandlingResponseError } from "../../../shared/error-handler";
import { HttpStatus } from "../../../shared/http-status";
import { EHandlingErrorType } from "../../../common/enums/errors";

export async function resetPasswordHandler(
  request: FastifyRequest<IZodResetPasswordUserInput>,
  reply: FastifyReply,
) {
  const { token, newPassword } = request.body;

  if (!token || !newPassword) {
    const info: IHandlingResponseError = {
      type: EHandlingErrorType.BAD_REQUEST,
      property: !token ? "token" : "newPassword",
    };
    return reply.code(HttpStatus.BAD_REQUEST).send(info);
  }

  try {
    await resetPassword(token, newPassword);
    reply.code(HttpStatus.OK).send({ success: true });
  } catch (error) {
    if (error instanceof Error) {
      const info: IHandlingResponseError = {
        type: EHandlingErrorType.FORBIDDEN,
      };
      return reply.code(HttpStatus.FORBIDDEN).send(info);
    }
    const info: IHandlingResponseError = {
      type: EHandlingErrorType.INTERNAL_SERVER_ERROR,
    };
    return reply.code(HttpStatus.INTERNAL_SERVER_ERROR).send(info);
  }
}
