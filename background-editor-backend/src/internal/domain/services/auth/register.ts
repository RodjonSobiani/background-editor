import { hash } from "bcryptjs";
import { NewUser } from "../../../database/models";
import { createUser, findUserByEmail } from "../../repository/user";

export async function registerUserService(userData: {
  email: string;
  name: string;
  password: string;
}) {
  const { email, name, password } = userData;
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error();
  }
  const password_hash = await hash(password, 10);
  const newUser: NewUser = {
    email,
    name,
    password_hash,
  };
  await createUser(newUser);
  return { email, name };
}
