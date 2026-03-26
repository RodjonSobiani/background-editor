import { compare } from "bcryptjs";
import { FastifyInstance } from "fastify";
import { findUserByEmail } from "../../repository/user";
import { getPresignedUrl } from "../images";
import { createAccessToken, createRefreshToken } from "./token-service";

export const loginService = async (
  email: string,
  password: string,
  fastify: FastifyInstance,
) => {
  const user = await findUserByEmail(email);

  const valid = await compare(password, user.password_hash);
  if (!valid || !user) {
    throw new Error();
  }

  const accessToken = createAccessToken({ fastify, userId: user.id, email });
  const refreshToken = createRefreshToken({ fastify, userId: user.id, email });

  user.avatar = user.avatar
    ? await getPresignedUrl(fastify, user.avatar)
    : user.avatar;

  return {
    accessToken,
    refreshToken,
    user,
  };
};
