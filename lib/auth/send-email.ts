import { Resend } from "resend";
import type { ReactElement } from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

/** Must be an address on a domain you verified in the Resend dashboard. */
const defaultFrom = "verification@alexbek.ru";

interface SendEmailsOptions {
  to: string;
  subject: string;
  react: ReactElement;
}

export async function sendEmail({ to, subject, react }: SendEmailsOptions) {
  const from = process.env.RESEND_FROM_EMAIL ?? defaultFrom;
  const { data, error } = await resend.emails.send({
    from,
    to,
    subject,
    react,
  });

  if (error) {
    throw new Error(error.message || "Failed to send email.");
  }

  return data;
}
