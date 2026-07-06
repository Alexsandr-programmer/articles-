import { getServerSession } from "@/lib/auth/get-session";
import type { Metadata } from "next";
import { redirect, unauthorized } from "next/navigation";
import { EmailForm } from "@/components/shared/profiIe/email-form";
import { LogoutEverywhereButton } from "@/components/shared/profiIe/logout-everythere-btn";
import { PasswordForm } from "@/components/shared/profiIe/password-form";
import { ProfileDetailsForm } from "@/components/shared/profiIe/profile-details-form";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) return redirect("/unauthorized");

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          Profile
        </h1>
        <p className="text-muted-foreground max-w-prose text-pretty text-sm sm:text-base">
          Update your account details, email, and password.
        </p>
      </div>
      <div className="flex min-w-0 flex-col gap-6 lg:flex-row lg:gap-8">
        <div className="min-w-0 flex-1">
          <ProfileDetailsForm user={user} />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <EmailForm currentEmail={user.email} />
          <PasswordForm />
          <LogoutEverywhereButton />
        </div>
      </div>
    </div>
  );
}
