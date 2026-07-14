import { Button } from "@/components/ui/button";
import { requireUser } from "@/lib/auth/dal";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Email Verified",
  description: "Your email has been verified successfully",
};

export default async function EmailVerifiedPage() {
  await requireUser();

  return (
    <div className="flex min-h-[min(70vh,32rem)] w-full flex-1 flex-col items-center justify-center px-2 py-8 text-center sm:min-h-[50vh] sm:px-4">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="space-y-2">
          <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            Email verified
          </h1>
          <p className="text-muted-foreground text-pretty text-sm sm:text-base">
            Your email has been verified successfully.
          </p>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/dashboard">Go to dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
