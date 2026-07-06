import { Button } from "@/components/ui/button";
import { getServerSession } from "@/lib/auth/get-session";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Forbidden",
};

export default async function ForbiddenPage() {
  const session = await getServerSession();
  const user = session?.user;
  if (!user) redirect("/unauthorized");

  return (
    <div className="flex min-h-[min(60vh,28rem)] w-full grow flex-col items-center justify-center px-3 py-10 text-center sm:px-4">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="space-y-2">
          <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            403 — Forbidden
          </h1>
          <p className="text-muted-foreground text-pretty text-sm sm:text-base">
            You don&apos;t have access to this page.
          </p>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
