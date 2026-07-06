import { getServerSession } from "@/lib/auth/get-session";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Unauthorized",
};

export default async function UnauthorizedPage() {
  const session = await getServerSession();
  const user = session?.user;
  if (user) redirect("/dashboard");

  return (
    <div className="flex min-h-[min(60vh,28rem)] w-full grow flex-col items-center justify-center px-3 py-10 text-center sm:px-4">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="space-y-2">
          <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            401 — Unauthorized
          </h1>
          <p className="text-muted-foreground text-pretty text-sm sm:text-base">
            Please log in to your account to continue.
          </p>
        </div>
      </div>
    </div>
  );
}
