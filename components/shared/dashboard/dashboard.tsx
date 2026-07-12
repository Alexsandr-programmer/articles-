import { redirect, unauthorized } from "next/navigation";
import { getServerSession } from "@/lib/auth/get-session";
import EmailVerificationAlert from "../../../components/shared/dashboard/email-verification-alert";
import { ProfileInformation } from "@/components/shared/dashboard/profile-information";

export default async function Dashboard() {
  const session = await getServerSession();
  const user = session?.user;
  if (!user) redirect("/unauthorized");

  return (
    <>
      {!user.emailVerified && user.email && (
        <EmailVerificationAlert email={user.email} />
      )}
      <ProfileInformation user={user} />
    </>
  );
}
