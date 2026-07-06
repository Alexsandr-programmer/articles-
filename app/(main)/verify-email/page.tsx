import ResendVerificationButton from "@/components/shared/auth/resend-verification-btn";
import { getServerSession } from "@/lib/auth/get-session";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Verify Email",
};

export default async function VerifyEmailPage() {
  const session = await getServerSession();
  const user = session?.user;
  if (!user) redirect("/unauthorized");

  return (
    <div className="flex min-h-[min(70vh,32rem)] w-full flex-1 flex-col items-center justify-center px-2 py-8 text-center sm:min-h-[50vh] sm:px-4">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="space-y-2">
          <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            Verify your email
          </h1>
          <p className="text-muted-foreground text-pretty text-sm sm:text-base">
            A verification email was sent to your inbox.
          </p>
        </div>
        <ResendVerificationButton email={user.email} />
      </div>
    </div>
  );
}
