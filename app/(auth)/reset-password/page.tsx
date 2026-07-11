import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/shared/auth/reset-password-form";

export const metadata: Metadata = {
  title: "Reset password",
  description: "Reset your password",
};

interface ResetPasswordPageProps {
  searchParams: Promise<{ token: string }>;
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const { token } = await searchParams;

  return (
    <main className="flex min-h-[100dvh] w-full min-w-0 items-center justify-center px-4 py-8 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-12">
      {token ? (
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              Reset password
            </h1>
            <p className="text-muted-foreground text-pretty text-sm sm:text-base">
              Enter your new password below.
            </p>
          </div>
          <ResetPasswordForm token={token} />
        </div>
      ) : (
        <div
          role="alert"
          className="text-destructive max-w-md text-center text-sm sm:text-base"
        >
          Token is missing.
        </div>
      )}
    </main>
  );
}
