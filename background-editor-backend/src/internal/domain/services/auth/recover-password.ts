import { v4 as uuidV4 } from "uuid";
import { findUserByEmail } from "../../repository/user";
import { sendEmail } from "../../../shared/nodemailer";
import { FastifyReply, FastifyRequest } from "fastify";
import { TokenService } from "./token-service";
import { IHandlingResponseError } from "../../../shared/error-handler";
import { EHandlingErrorType } from "../../../common/enums/errors";
import { HttpStatus } from "../../../shared/http-status";

export const recoverPasswordService = async (
  email: string,
  link: string,
  locale: string,
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      const info: IHandlingResponseError = {
        type: EHandlingErrorType.NOT_FOUND,
        property: "user",
      };
      return reply.code(HttpStatus.NOT_FOUND).send(info);
    }

    await TokenService.invalidateToken(user.id);

    const resetToken = uuidV4();

    const resetPasswordToken = TokenService.createResetPasswordToken({
      fastify: request.server,
      userId: user.id,
      email: user.email,
      token: resetToken,
    });

    await TokenService.saveToken({
      userId: user.id,
      token: resetPasswordToken,
      request,
      type: "password_reset",
    });

    const resetLink = new URL(
      `${link}?modal=reset-password&token=${resetPasswordToken}`,
    );

    await sendEmail(
      email,
      locale === "ru" ? "Восстановление пароля" : "Recover password",
      `recover-password-${locale}`,
      {
        link: resetLink.toString(),
      },
    );

    return { success: true };
  } catch (error) {
    console.error("Error during password recovery initiation:", error);
    throw error;
  }
};
