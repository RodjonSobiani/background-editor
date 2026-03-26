import { FastifyReply, FastifyRequest } from "fastify";
import { IZodChangePasswordInput } from "../../validation/user";
import { changePassword } from "../../services/user";
import { IHandlingResponseError } from "../../../shared/error-handler";
import { EHandlingErrorType } from "../../../common/enums/errors";
import { HttpStatus } from "../../../shared/http-status";

export async function changePasswordHandler(
  request: FastifyRequest<IZodChangePasswordInput>,
  reply: FastifyReply,
) {
  const { currentPassword, newPassword } = request.body;

  const userId = (request.user as { id: string }).id;

  try {
    const { accessToken, refreshToken } = await changePassword(
      userId,
      { currentPassword, newPassword },
      request.server,
      request,
    );

    reply.code(200).send({ accessToken, refreshToken });
  } catch (error) {
    if (error instanceof Error) {
      const info: IHandlingResponseError = {
        type: EHandlingErrorType.NOT_FOUND,
        property: "password",
      };
      return reply.code(HttpStatus.NOT_FOUND).send(info);
    }
  }
}
