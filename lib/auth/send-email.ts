import { Resend } from "resend";
import type { ReactElement } from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailsOptions {
  to: string;
  subject: string;
  react: ReactElement;
}

export async function sendEmail({ to, subject, react }: SendEmailsOptions) {
  const { data, error } = await resend.emails.send({
    from: "verification@alexbek.ru",
    to,
    subject,
    react,
  });

  if (error) {
    throw new Error(error.message || "Failed to send email.");
  }

  return data;
}
