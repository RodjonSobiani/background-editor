import knex from "../../../database/knex/connection-knex";
import { EHandlingErrorType } from "../../../common/enums/errors";

export const findUserById = async (userId: string) => {
  try {
    return await knex("users").where({ id: userId }).first();
  } catch (error) {
    throw {
      type: EHandlingErrorType.INTERNAL_SERVER_ERROR,
      property: "user",
    };
  }
};

export const findUserByEmail = async (email: string) => {
  try {
    return await knex("users").where({ email }).first();
  } catch (error) {
    throw {
      type: EHandlingErrorType.INTERNAL_SERVER_ERROR,
      property: "user",
    };
  }
};

export const updateUserName = async (userId: string, newName: string) => {
  try {
    await knex("users").where({ id: userId }).update({ name: newName });
  } catch (error) {
    throw {
      type: EHandlingErrorType.INTERNAL_SERVER_ERROR,
      property: "name",
    };
  }
};

export const updateUserEmail = async (userId: string, newEmail: string) => {
  try {
    await knex("users").where({ id: userId }).update({ email: newEmail });
  } catch (error) {
    throw {
      type: EHandlingErrorType.INTERNAL_SERVER_ERROR,
      property: "email",
    };
  }
};

export const updateAvatarUser = async (
  userId: string,
  avatar: string | null,
) => {
  try {
    await knex("users").where({ id: userId }).update({ avatar });
  } catch (error) {
    throw {
      type: EHandlingErrorType.INTERNAL_SERVER_ERROR,
      property: "avatar",
    };
  }
};

export const createUser = async (userData: {
  email: string;
  name: string;
  password_hash: string;
}) => {
  try {
    await knex("users").insert(userData);
  } catch (error) {
    throw {
      type: EHandlingErrorType.INTERNAL_SERVER_ERROR,
      property: "user",
    };
  }
};

export const updateUserPassword = async (
  userId: string,
  newPasswordHash: string,
) => {
  try {
    await knex("users")
      .where({ id: userId })
      .update({ password_hash: newPasswordHash });
  } catch (error) {
    throw {
      type: EHandlingErrorType.INTERNAL_SERVER_ERROR,
      property: "password",
    };
  }
};
