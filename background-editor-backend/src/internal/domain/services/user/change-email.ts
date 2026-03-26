import { findUserById, updateUserEmail } from "../../repository/user";
import { compare } from "bcryptjs";
import { FastifyInstance, FastifyRequest } from "fastify";
import { markAllUserTokensAsUsed } from "../../repository/auth";
import {
  createAccessToken,
  createRefreshToken,
  saveToken,
} from "../auth/token-service";

export async function changeEmail(
  userId: string,
  userData: { password: string; email: string },
  fastify: FastifyInstance,
  request: FastifyRequest,
) {
  const { password, email } = userData;

  const user = await findUserById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await compare(password, user.password_hash);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  await updateUserEmail(userId, email);

  await markAllUserTokensAsUsed(userId);

  const accessToken = createAccessToken({ fastify, userId: user.id, email });
  const refreshToken = createRefreshToken({ fastify, userId: user.id, email });

  await saveToken({
    userId: user.id,
    token: refreshToken,
    request: request!,
    type: "refresh",
  });

  return { accessToken, refreshToken };
}
