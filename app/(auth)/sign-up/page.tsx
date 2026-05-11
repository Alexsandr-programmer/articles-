import type { Metadata } from "next";
import { SignUpForm } from "@/components/shared/auth/sign-up-form";
import { getServerSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Create an account",
};

export default async function SignUpPage() {
  return (
    <main className="flex min-h-svh items-center justify-center px-4">
      <SignUpForm />
    </main>
  );
}
