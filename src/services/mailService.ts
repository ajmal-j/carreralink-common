import { createTransport } from "nodemailer";

export const mailService = async (mailOptions: {
  email: string;
  subject: string;
  message: string;
  html?: string;
}) => {
  const transporter = createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
  const options = {
    from: process.env.MAIL_USER,
    to: mailOptions.email,
    subject: mailOptions.subject,
    text: mailOptions.message,
    ...(mailOptions?.html && { html: mailOptions?.html }),
  };
  await transporter.sendMail(options);
};
