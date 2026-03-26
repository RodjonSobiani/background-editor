import { hash } from "bcryptjs";
import {
  findUserTokenByHash,
  markTokenAsUsed,
  updateUserPassword,
  markAllUserTokensAsUsed,
} from "../../repository/auth";

export async function resetPassword(token: string, newPassword: string) {
  const userToken = await findUserTokenByHash(token);

  if (!userToken) {
    throw new Error("Invalid or expired password reset token");
  }

  const passwordHash = await hash(newPassword, 10);

  await updateUserPassword(userToken.user_id, passwordHash);

  await markTokenAsUsed(userToken.id);

  await markAllUserTokensAsUsed(userToken.user_id, "password_reset");
}
