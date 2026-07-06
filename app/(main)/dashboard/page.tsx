import type { Metadata } from "next";
import { redirect, unauthorized } from "next/navigation";
import { getServerSession } from "@/lib/auth/get-session";
import EmailVerificationAlert from "../../../components/shared/dashboard/email-verification-alert";
import { ProfileInformation } from "@/components/shared/dashboard/profile-information";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const session = await getServerSession();
  const user = session?.user;
  if (!user) redirect("/unauthorized");

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          Dashboard
        </h1>
        <p className="text-muted-foreground max-w-prose text-pretty text-sm sm:text-base">
          Welcome back! Here&apos;s your account overview.
        </p>
      </div>
      {!user.emailVerified && user.email && (
        <EmailVerificationAlert email={user.email} />
      )}
      <ProfileInformation user={user} />
    </div>
  );
}
