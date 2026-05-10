import type { Metadata } from "next";
import { LoginForm } from "@/components/shared/auth/login-form";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function SignIn() {
  return (
    <main className="flex min-h-svh items-center justify-center px-4">
      <LoginForm />
    </main>
  );
}
