import { getServerSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  const user = session?.user;
  if (user) redirect("/dashboard");

  return (
    <div className="relative min-h-dvh min-w-0">
      <Link
        className="text-muted-foreground hover:text-foreground fixed top-[max(1rem,env(safe-area-inset-top))] left-[max(1rem,env(safe-area-inset-left))] z-50 flex items-center gap-2 text-sm transition-colors sm:top-8 sm:left-8"
        href="/"
      >
        <ArrowLeftIcon className="size-4 shrink-0" aria-hidden />
        <span>Home</span>
      </Link>
      <div className="pt-14 sm:pt-8">{children}</div>
    </div>
  );
}
