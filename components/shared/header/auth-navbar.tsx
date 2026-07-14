"use client";

import { getCurrentUser } from "@/lib/auth/dal";
import { cn } from "@/lib/utils";
import { UserDropdown } from "./user-dropdown";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useLayoutEffect } from "react";

export default function AuthNavbar() {
  const { data: session, isPending, error } = authClient.useSession();
  const user = session?.user;

  return (
    <>
      {isPending ? (
        <Skeleton className="h-8 w-24  animate-pulse" />
      ) : user ? (
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
      {error && <div className="text-red-500">Error loading session</div>}
    </>
  );
}
