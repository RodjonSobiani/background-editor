import { FastifyReply, FastifyRequest } from "fastify";
import { recoverPasswordService } from "../../services/auth";
import { IZodRecoverPasswordUserInput } from "../../validation/auth";
import { IHandlingResponseError } from "../../../shared/error-handler";
import { HttpStatus } from "../../../shared/http-status";
import { EHandlingErrorType } from "../../../common/enums/errors";

export const recoverPasswordHandler = async (
  request: FastifyRequest<IZodRecoverPasswordUserInput>,
  reply: FastifyReply,
) => {
  const { email, link, locale } = request.body;

  try {
    await recoverPasswordService(email, link, locale, request, reply);
    reply.code(HttpStatus.OK).send({ success: true });
  } catch (error) {
    const info: IHandlingResponseError = {
      type: EHandlingErrorType.INTERNAL_SERVER_ERROR,
    };
    return reply.code(HttpStatus.INTERNAL_SERVER_ERROR).send(info);
  }
};
