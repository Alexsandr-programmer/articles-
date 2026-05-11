import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { sendEmail } from "./send-email";
import { EmailTemplate } from "@/components/shared/auth/email-template";
import { createElement } from "react";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    async sendVerificationEmail({ user, url }) {
      await sendEmail({
        to: user.email,
        subject: "Verify your email",
        react: createElement(EmailTemplate, {
          name: user.name || "there",
          verifyUrl: url,
        }),
      });
    },
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        enum: ["user", "admin"],
        default: "user",
        input: false,
      },
    },
  },
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
