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
    <main className="mx-auto w-full max-w-6xl px-4 py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s your account overview.
          </p>
        </div>
        {!user.emailVerified && user.email && (
          <EmailVerificationAlert email={user.email} />
        )}
        <ProfileInformation user={user} />
      </div>
    </main>
  );
}
