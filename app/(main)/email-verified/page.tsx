import { Button } from "@/components/ui/button";
import { getServerSession } from "@/lib/auth/get-session";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Email Verified",
};

export default async function EmailVerifiedPage() {
  const session = await getServerSession();
  const user = session?.user;
  if (!user) redirect("/unauthorized");

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
