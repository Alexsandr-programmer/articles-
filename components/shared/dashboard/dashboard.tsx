import EmailVerificationAlert from "@/components/shared/dashboard/email-verification-alert";
import { ProfileInformation } from "@/components/shared/dashboard/profile-information";
import { requireUser } from "@/lib/auth/dal";

export default async function Dashboard() {
  const user = await requireUser();

  return (
    <>
      {!user.emailVerified && user.email && (
        <EmailVerificationAlert email={user.email} />
      )}
      <ProfileInformation user={user} />
    </>
  );
}
