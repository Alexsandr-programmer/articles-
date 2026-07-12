import type { Metadata } from "next";
import { SignUpForm } from "@/components/shared/auth/sign-up-form";
import { SignUpFormSkeleton } from "@/components/shared/auth/auth-form-skeleton";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Create an account",
  description: "Create an account",
};

export default function SignUpPage() {
  return (
    <main className="flex min-h-dvh w-full min-w-0 items-center justify-center px-4 py-8 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-12">
      <div className="w-full max-w-md">
        <Suspense fallback={<SignUpFormSkeleton />}>
          <SignUpForm />
        </Suspense>
      </div>
    </main>
  );
}
