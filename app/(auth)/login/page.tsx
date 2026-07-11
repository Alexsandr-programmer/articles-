import type { Metadata } from "next";
import { LoginForm } from "@/components/shared/auth/login-form";
import { getServerSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Log in to your account",
  description: "Log in to your account",
};

export default async function LoginPage() {
  return (
    <main className="flex min-h-[100dvh] w-full min-w-0 items-center justify-center px-4 py-8 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-12">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  );
}
