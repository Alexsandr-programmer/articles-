import type { Metadata } from "next";
import { LoginForm } from "@/components/shared/auth/login-form";
import { LoginFormSkeleton } from "@/components/shared/auth/auth-form-skeleton";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Log in to your account",
  description: "Log in to your account",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-[100dvh] w-full min-w-0 items-center justify-center px-4 py-8 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-12">
      <div className="w-full max-w-md">
        <Suspense fallback={<LoginFormSkeleton />}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
