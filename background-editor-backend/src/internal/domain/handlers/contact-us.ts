import { FastifyRequest, FastifyReply } from "fastify";
import { contactUsService } from "../services/contact-us";
import { IZodContactUsInput } from "../validation/contact-us";
import { IHandlingResponseError } from "../../shared/error-handler";
import { EHandlingErrorType } from "../../common/enums/errors";
import { HttpStatus } from "../../shared/http-status";
import { sendEmail } from "../../shared/nodemailer";

export const contactUsHandler = async (
  request: FastifyRequest<IZodContactUsInput>,
  reply: FastifyReply,
) => {
  const { name, email, question, locale } = request.body;
  const adminMail = process.env.GMAIL_USER;

  if (!name || !email || !question || !locale) {
    const info: IHandlingResponseError = {
      type: EHandlingErrorType.EMPTY,
      property: !name
        ? "name"
        : !email
          ? "email"
          : !question
            ? "question"
            : "locale",
      message: "All fields are required",
    };
    return reply.code(HttpStatus.BAD_REQUEST).send(info);
  }

  try {
    await sendEmail(
      adminMail!,
      locale === "ru" ? "Новый вопрос от пользователя" : "New user question",
      `contact-us-${locale}`,
      { name, email, question },
    );

    await contactUsService(request.body);

    return reply.code(HttpStatus.CREATED).send(request.body);
  } catch (error) {
    if (error instanceof Error) {
      const info: IHandlingResponseError = {
        type: EHandlingErrorType.UNKNOWN,
        property: "questions",
        message: error.message || "An unknown error occurred",
      };

      return reply.code(HttpStatus.INTERNAL_SERVER_ERROR).send(info);
    }

    const fallbackError: IHandlingResponseError = {
      type: EHandlingErrorType.UNKNOWN,
      property: "questions",
      message: "An unknown error occurred",
    };
    return reply.code(HttpStatus.INTERNAL_SERVER_ERROR).send(fallbackError);
  }
};
