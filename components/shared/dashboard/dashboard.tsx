import EmailVerificationAlert from "@/components/shared/dashboard/email-verification-alert";
import { ProfileInformation } from "@/components/shared/dashboard/profile-information";
import { requireUser } from "@/lib/auth/dal";
import Articles from "./articles";

export default async function Dashboard() {
  const user = await requireUser();

  return (
    <>
      {!user.emailVerified && user.email && (
        <EmailVerificationAlert email={user.email} />
      )}
      <ProfileInformation user={user} />

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Your articles</h2>
        <Articles authorId={user.id} />
      </div>
    </>
  );
}
