import { FastifyReply, FastifyRequest } from "fastify";
import { registerUserService } from "../../services/auth";
import { IZodRegisterUserInput } from "../../validation/auth";
import { IHandlingResponseError } from "../../../shared/error-handler";
import { EHandlingErrorType } from "../../../common/enums/errors";
import { HttpStatus } from "../../../shared/http-status";

export async function registerHandler(
  request: FastifyRequest<IZodRegisterUserInput>,
  reply: FastifyReply,
) {
  const { email, name, password } = request.body;

  try {
    const user = await registerUserService({ email, name, password });
    reply.code(201).send(user);
  } catch (error) {
    if (error instanceof Error) {
      const info: IHandlingResponseError = {
        type: EHandlingErrorType.BUSY,
        property: "email",
      };
      return reply.code(HttpStatus.CONFLICT).send(info);
    }
    reply.code(HttpStatus.INTERNAL_SERVER_ERROR).send();
  }
}
