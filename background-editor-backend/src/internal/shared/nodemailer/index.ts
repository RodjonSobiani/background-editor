import { createTransport } from "nodemailer";
import fs from "fs";
import handlebars from "handlebars";
import { join } from "node:path";

handlebars.registerHelper("link", function (text, url) {
  const escapedUrl = handlebars.escapeExpression(url);
  const escapedText = handlebars.escapeExpression(text);
  return new handlebars.SafeString(
    `<a href="${escapedUrl}" style="color: #007BFF; text-decoration: none;">${escapedText}</a>`,
  );
});

const emailTransport = createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GMAIL_USER,
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
  },
});

const compileTemplate = (templateName: string, data: any) => {
  const filePath = join(
    process.cwd() + "/src/external/templates/",
    `${templateName}.html`,
  );
  const source = fs.readFileSync(filePath, "utf8");
  const template = handlebars.compile(source);
  return template(data);
};

export const sendEmail = async (
  sendTo: string,
  subject: string,
  templateName: string,
  data: any,
): Promise<void> => {
  try {
    const html = compileTemplate(templateName, data);

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: sendTo,
      subject: subject,
      html: html,
    };

    await emailTransport.sendMail(mailOptions);
  } catch (error) {
    console.error("Error: ", error);
  }
};
