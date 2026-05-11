import type { Metadata } from "next";
import { LoginForm } from "@/components/shared/auth/login-form";
import { getServerSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Log in to your account",
};

export default async function LoginPage() {
  const session = await getServerSession();
  const user = session?.user;
  if (user) redirect("/");

  return (
    <main className="flex min-h-svh items-center justify-center px-4">
      <LoginForm />
    </main>
  );
}
