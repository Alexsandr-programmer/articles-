import { APIError, betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";
import { EmailTemplate } from "../../components/shared/auth/email-template";
import prisma from "../prisma";
import { sendEmail } from "./send-email";
import { createElement } from "react";
import { ResetPasswordTemplate } from "@/components/shared/auth/reset-password-template";
import { passwordSchema } from "./auth-schemas";
import { createAuthMiddleware } from "better-auth/api";
import { ChangeEmailTemplate } from "@/components/shared/auth/change-email-template";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
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
  plugins: [admin()],
  emailAndPassword: {
    enabled: true,
    async sendResetPassword({
      user,
      url,
    }: {
      user: { name?: string | null; email: string };
      url: string;
    }) {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        react: createElement(ResetPasswordTemplate, {
          name: user.name || "there",
          resetUrl: url,
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
    changeEmail: {
      enabled: true,
      async sendChangeEmailConfirmation({
        user,
        newEmail,
        url,
      }: {
        user: { name?: string | null; email: string };
        newEmail: string;
        url: string;
      }) {
        await sendEmail({
          to: user.email,
          subject: "Confirm your email change",
          react: createElement(ChangeEmailTemplate, {
            name: user.name || "there",
            newEmail,
            changeEmailUrl: url,
          }),
        });
      },
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (
        ctx.path === "/reset-password" ||
        ctx.path === "/sign-up/email" ||
        ctx.path === "/change-password"
      ) {
        const password = ctx.body.password || ctx.body.newPassword;
        const { error } = passwordSchema.safeParse(password);
        if (error) {
          throw new APIError("BAD_REQUEST", {
            message: "Password is not valid",
          });
        }
      }
    }),
  },
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
