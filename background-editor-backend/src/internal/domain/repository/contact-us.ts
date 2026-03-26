import knex from "../../database/knex/connection-knex";
import { EHandlingErrorType } from "../../common/enums/errors";

export const createQuestion = async (
  name: string,
  email: string,
  question: string,
) => {
  try {
    await knex("questions").insert({
      name,
      email,
      question,
    });

    return { success: true };
  } catch (error) {
    throw {
      type: EHandlingErrorType.INTERNAL_SERVER_ERROR,
      property: "question",
    };
  }
};
