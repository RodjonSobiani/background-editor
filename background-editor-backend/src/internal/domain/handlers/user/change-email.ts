import { FastifyReply, FastifyRequest } from "fastify";
import { IZodChangeEmailInput } from "../../validation/user";
import { changeEmail } from "../../services/user";
import { IHandlingResponseError } from "../../../shared/error-handler";
import { EHandlingErrorType } from "../../../common/enums/errors";
import { HttpStatus } from "../../../shared/http-status";

export async function changeEmailHandler(
  request: FastifyRequest<IZodChangeEmailInput>,
  reply: FastifyReply,
) {
  const { password, email } = request.body;

  const userId = (request.user as { id: string }).id;

  try {
    const { accessToken, refreshToken } = await changeEmail(
      userId,
      { password, email },
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
