import { FastifyReply, FastifyRequest } from "fastify";
import { getUserByEmail, getUserById } from "../../services/auth/get-user";
import { IHandlingResponseError } from "../../../shared/error-handler";
import { HttpStatus } from "../../../shared/http-status";
import { EHandlingErrorType } from "../../../common/enums/errors";

interface IUser {
  id?: string;
  email?: string;
}

export async function getMeHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const user = request.user as IUser;

    let userData;

    if (user.id) {
      userData = await getUserById(user.id, request.server);
    } else if (user.email) {
      userData = await getUserByEmail(user.email, request.server);
    } else {
      const info: IHandlingResponseError = {
        type: EHandlingErrorType.BAD_REQUEST,
        property: "user",
      };
      return reply.code(HttpStatus.BAD_REQUEST).send(info);
    }

    if (!userData) {
      const info: IHandlingResponseError = {
        type: EHandlingErrorType.NOT_FOUND,
        property: "user",
      };
      return reply.code(HttpStatus.NOT_FOUND).send(info);
    }

    reply.send(userData);
  } catch (error) {
    const info: IHandlingResponseError = {
      type: EHandlingErrorType.INTERNAL_SERVER_ERROR,
    };
    return reply.code(HttpStatus.INTERNAL_SERVER_ERROR).send(info);
  }
}
