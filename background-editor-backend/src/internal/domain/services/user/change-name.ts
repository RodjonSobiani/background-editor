import { findUserById, updateUserName } from "../../repository/user";

export async function changeName(userId: string, userData: { name: string }) {
  const { name } = userData;

  const user = await findUserById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  await updateUserName(userId, name);

  return { ...user, name };
}
