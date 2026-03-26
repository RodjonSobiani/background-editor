import { FastifyInstance, FastifyRequest } from "fastify";
import {
  createUserToken,
  deleteExpiredTokens,
  markAllUserTokensAsUsed,
  markTokenAsUsed,
} from "../../repository/auth";
import { CustomException } from "../../../shared/error-handler";
import { HttpStatus } from "../../../shared/http-status";

const TOKEN_EXPIRATION = {
  ACCESS: "15m",
  // ACCESS: "10sec", // Для тестов
  REFRESH: "7d",
  PASSWORD_RESET: "1h",
} as const;

const DEFAULT_REFRESH_EXPIRES_AT = 7 * 24 * 60 * 60 * 1000;

interface ITokenPayload {
  id: string;
  email: string;
}

interface ITokenGenerationProps {
  fastify: FastifyInstance;
  userId: string;
  email: string;
}

interface IResetPasswordTokenProps {
  fastify: FastifyInstance;
  userId: string;
  email: string;
  token: string;
}

interface ITokenOptions {
  expiresIn: string;
}

interface ISaveTokenParams {
  userId: string;
  token: string;
  request: FastifyRequest;
  type?: "refresh" | "password_reset";
  customExpiresAt?: number;
}

interface ITokenMetadata {
  ip: string;
  userAgent: string;
  issuedAt: number;
}

interface IResetPasswordTokenProps {
  fastify: FastifyInstance;
  userId: string;
  email: string;
  token: string;
}

const getTokenMetadata = (request: FastifyRequest): ITokenMetadata => ({
  ip: request?.ip || "unknown",
  userAgent: request?.headers["user-agent"] || "unknown",
  issuedAt: Date.now(),
});

const generateToken = (
  { fastify, userId, email }: ITokenGenerationProps,
  options: ITokenOptions,
): string => {
  const payload: ITokenPayload = { id: userId, email };
  return fastify.jwt.sign(payload, options);
};

const createAccessToken = (params: ITokenGenerationProps): string =>
  generateToken(params, { expiresIn: TOKEN_EXPIRATION.ACCESS });

const createRefreshToken = (params: ITokenGenerationProps): string =>
  generateToken(params, { expiresIn: TOKEN_EXPIRATION.REFRESH });

const createResetPasswordToken = (params: IResetPasswordTokenProps): string =>
  generateToken(params, { expiresIn: TOKEN_EXPIRATION.PASSWORD_RESET });

const saveToken = async ({
  userId,
  token,
  request,
  type = "refresh",
  customExpiresAt,
}: ISaveTokenParams): Promise<void> => {
  try {
    const { ip, userAgent } = getTokenMetadata(request);

    const expiresAt = customExpiresAt ?? calculateTokenExpiration(type);

    await createUserToken({
      user_id: userId,
      token_hash: token,
      type,
      expires_at: expiresAt,
      ip_address: ip,
      user_agent: userAgent,
    });
  } catch (error) {
    throw new CustomException(
      `Failed to save ${type} token`,
      { publicMessage: "Internal server error" },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
};

const invalidateToken = async (tokenId: string): Promise<void> => {
  try {
    await markTokenAsUsed(tokenId);
    console.log("Произошло invalidateToken");
  } catch (error) {
    throw new CustomException(
      "Failed to invalidate token",
      { publicMessage: "Internal server error" },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
};

const invalidateOldRefreshTokens = async (userId: string) => {
  await markAllUserTokensAsUsed(userId, "refresh");
  await deleteExpiredTokens();
};

const calculateTokenExpiration = (type: ISaveTokenParams["type"]): number => {
  const now = Date.now();

  switch (type) {
    case "refresh":
      return now + 7 * 24 * 60 * 60 * 1000; // 7d
    case "password_reset":
      return now + 60 * 60 * 1000; // 1h
    default:
      return now + DEFAULT_REFRESH_EXPIRES_AT;
  }
};

export const TokenService = {
  createAccessToken,
  createRefreshToken,
  createResetPasswordToken,
  saveToken,
  invalidateToken,
  invalidateOldRefreshTokens,
  getTokenMetadata,
  constants: {
    TOKEN_EXPIRATION,
    DEFAULT_REFRESH_EXPIRES_AT,
  },
};

export {
  createAccessToken,
  createRefreshToken,
  createResetPasswordToken,
  saveToken,
  invalidateToken,
  invalidateOldRefreshTokens,
  getTokenMetadata,
};
