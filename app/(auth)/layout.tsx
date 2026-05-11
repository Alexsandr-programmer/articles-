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
    <div className="relative">
      <Link
        className="cursor-pointer absolute top-10 left-10 flex items-center gap-2 hover:text-primary transition-colors"
        href="/"
      >
        <ArrowLeftIcon className="size-4" />
        <span>Home</span>
      </Link>
      {children}
    </div>
  );
}
