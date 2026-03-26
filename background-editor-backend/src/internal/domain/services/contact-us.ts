import { createQuestion } from "../repository/contact-us";

export const contactUsService = async (userQuestion: {
  name: string;
  email: string;
  question: string;
}) => {
  const { name, email, question } = userQuestion;

  await createQuestion(name, email, question);
};
