import { FastifyReply, FastifyRequest } from "fastify";
import { IZodChangeNameInput } from "../../validation/user";
import { changeName } from "../../services/user";
import { IHandlingResponseError } from "../../../shared/error-handler";
import { HttpStatus } from "../../../shared/http-status";
import { EHandlingErrorType } from "../../../common/enums/errors";

export async function changeNameHandler(
  request: FastifyRequest<IZodChangeNameInput>,
  reply: FastifyReply,
) {
  const { name } = request.body;
  const userId = (request.user as { id: string }).id;

  try {
    const user = await changeName(userId, { name });

    reply.code(HttpStatus.OK).send({
      id: user.id,
      email: user.email,
      name: user.name,
      created_at: user.created_at,
    });
  } catch (error) {
    if (error instanceof Error) {
      const info: IHandlingResponseError = {
        type: EHandlingErrorType.BAD_REQUEST,
        property: "name",
      };
      return reply.code(HttpStatus.BAD_REQUEST).send(info);
    }

    const info: IHandlingResponseError = {
      type: EHandlingErrorType.INTERNAL_SERVER_ERROR,
    };
    return reply.code(HttpStatus.INTERNAL_SERVER_ERROR).send(info);
  }
}
