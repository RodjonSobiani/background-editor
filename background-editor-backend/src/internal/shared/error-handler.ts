import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import { logger } from "./logger";
import { HttpStatus } from "./http-status";
import { EHandlingErrorType } from "../common/enums/errors";
import { ZodObject } from "zod";

export interface IHandlingResponseError {
  property?: string;
  type?: EHandlingErrorType;
  message?: string;
}

export class AccessDeniedException extends Error {
  details: IHandlingResponseError;

  constructor(message: string) {
    super(message);

    this.details = {
      type: EHandlingErrorType.NOT_ALLOWED,
      property: "role",
      message: message,
    };
  }
}

export class CustomException extends Error {
  public status: number;
  public error: string;
  public result: any;
  public publicMessage?: any;

  constructor(error: string, customAnswer?: any, status?: number) {
    super(error);
    this.status = status || HttpStatus.INTERNAL_SERVER_ERROR;
    this.error = error;

    if (customAnswer && customAnswer.publicMessage) {
      if (typeof customAnswer.publicMessage === "string") {
        this.publicMessage = { message: customAnswer.publicMessage };
      } else {
        this.publicMessage = customAnswer.publicMessage;
      }

      delete customAnswer.publicMessage;
    }

    this.result = customAnswer;
    Object.setPrototypeOf(this, CustomException.prototype);
  }
}

export async function appErrorPipe(
  err: any,
  req: FastifyRequest,
  reply: FastifyReply,
): Promise<void | FastifyReply> {
  const parentLogger = logger.child({ req_id: req.id });

  parentLogger.error(
    {
      url: req.url,
      method: req.method,
      body: req.body,
      query: req.query,
      params: req.params,
    },
    "Request details",
  );

  if (err instanceof ZodError) {
    const errors = err.issues.map(({ code: type, path: stack, message }) => ({
      type,
      stack,
      message,
    }));
    return reply.code(HttpStatus.UNPROCESSABLE_ENTITY).send({ errors });
  }

  if (err instanceof AccessDeniedException) {
    return reply.code(HttpStatus.FORBIDDEN).send(err.details);
  }

  if (err instanceof CustomException) {
    parentLogger.error(err, "CustomException");
    reply.code(err.status);
    return reply.send(err.publicMessage || { message: err.message });
  }

  parentLogger.error(err, "Unhandled error");
  const statusCode = err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
  const message = err.message || "Oops, something went wrong";

  return reply.code(statusCode).send({ message });
}

export const zodValidatorCompiler = ({
  schema,
}: {
  schema: ZodObject<any>;
}) => {
  return (data: unknown) => {
    const result = schema.safeParse(data);
    if (result.success) {
      return { value: result.data };
    }
    return { error: result.error };
  };
};

export function handleError(
  reply: FastifyReply,
  error: unknown,
  statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
) {
  if (error instanceof CustomException) {
    reply.code(error.status).send(error.publicMessage);
  } else if (error instanceof Error) {
    reply.status(statusCode).send({ message: error.message });
  } else {
    reply.status(statusCode).send({ message: "An unknown error occurred" });
  }
}
