import { getServerSession } from "@/lib/auth/get-session";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Unauthorized",
};

export default async function UnauthorizedPage() {
  const session = await getServerSession();
  const user = session?.user;
  if (user) redirect("/dashboard");

  return (
    <main className="flex w-full grow items-center justify-center px-4 text-center">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">401 - Unauthorized</h1>
          <p className="text-muted-foreground">
            Please log in to your account to continue.
          </p>
        </div>
      </div>
    </main>
  );
}
