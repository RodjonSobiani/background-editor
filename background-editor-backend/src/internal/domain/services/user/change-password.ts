import { findUserById, updateUserPassword } from "../../repository/user";
import { compare, hash } from "bcryptjs";
import { FastifyInstance, FastifyRequest } from "fastify";
import {
  createAccessToken,
  createRefreshToken,
  saveToken,
} from "../auth/token-service";

export async function changePassword(
  userId: string,
  userData: { currentPassword: string; newPassword: string },
  fastify: FastifyInstance,
  request: FastifyRequest,
) {
  const { currentPassword, newPassword } = userData;

  const user = await findUserById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await compare(currentPassword, user.password_hash);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const newPasswordHash = await hash(newPassword, 10);
  await updateUserPassword(userId, newPasswordHash);

  const accessToken = createAccessToken({
    fastify,
    userId: user.id,
    email: user.email,
  });
  const refreshToken = createRefreshToken({
    fastify,
    userId: user.id,
    email: user.email,
  });

  await saveToken({
    userId: user.id,
    token: refreshToken,
    request: request!,
    type: "refresh",
  });

  return { accessToken, refreshToken };
}
