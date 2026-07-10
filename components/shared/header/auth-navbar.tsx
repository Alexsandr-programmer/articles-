import { getServerSession } from "@/lib/auth/get-session";
import { cn } from "@/lib/utils";
import { UserDropdown } from "./user-dropdown";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function AuthNavbar() {
  const session = await getServerSession();
  const user = session?.user;
  return (
    <>
      {user ? (
        <UserDropdown user={user} />
      ) : (
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "cursor-pointer sm:text-sm",
            )}
          >
            Login
          </Link>
          <Link
            href="/sign-up"
            className={cn(
              buttonVariants({ variant: "secondary", size: "sm" }),
              "cursor-pointer sm:text-sm",
            )}
          >
            Sign Up
          </Link>
        </div>
      )}
    </>
  );
}
