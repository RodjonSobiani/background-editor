import knex from "../../../database/knex/connection-knex";
import { EHandlingErrorType } from "../../../common/enums/errors";

export const updateUserPassword = async (
  userId: string,
  passwordHash: string,
) => {
  try {
    await knex("users")
      .where({ id: userId })
      .update({ password_hash: passwordHash });
  } catch (error) {
    throw {
      type: EHandlingErrorType.INTERNAL_SERVER_ERROR,
      property: "password",
    };
  }
};

export const createUserToken = async (userTokenData: {
  user_id: string;
  token_hash: string;
  type: string;
  expires_at: number;
  ip_address: string;
  user_agent: string;
}) => {
  try {
    await knex("user_tokens").insert(userTokenData);
  } catch (error) {
    throw {
      type: EHandlingErrorType.INTERNAL_SERVER_ERROR,
      property: "token",
    };
  }
};

export const findUserTokenByHash = async (tokenHash: string) => {
  try {
    return await knex("user_tokens")
      .where({ token_hash: tokenHash })
      .andWhere("expires_at", ">", Date.now())
      .andWhere("used", false)
      .first();
  } catch (error) {
    throw {
      type: EHandlingErrorType.INTERNAL_SERVER_ERROR,
      property: "token",
    };
  }
};

export const markTokenAsUsed = async (tokenId: string) => {
  try {
    await knex("user_tokens").where({ id: tokenId }).update({ used: true });
  } catch (error) {
    throw {
      type: EHandlingErrorType.INTERNAL_SERVER_ERROR,
      property: "token",
    };
  }
};

export const markAllUserTokensAsUsed = async (
  userId: string,
  type?: string,
) => {
  try {
    const query = knex("user_tokens")
      .where({ user_id: userId })
      .update({ used: true });

    if (type) {
      query.andWhere({ type });
    }

    await query;
  } catch (error) {
    throw {
      type: EHandlingErrorType.INTERNAL_SERVER_ERROR,
      property: "token",
    };
  }
};

export const deleteExpiredTokens = async () => {
  try {
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    await knex("user_tokens")
      .where("expires_at", "<", Date.now())
      .orWhere("used", true)
      .andWhere("created_at", "<", new Date(weekAgo))
      .delete();
  } catch (error) {
    throw {
      type: EHandlingErrorType.INTERNAL_SERVER_ERROR,
      property: "token",
    };
  }
};
