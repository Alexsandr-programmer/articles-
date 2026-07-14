import "server-only";

import { getServerSession } from "@/lib/auth/get-session";
import type { User } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { cache } from "react";

/** Optional auth — returns null when the user is not signed in. */
export const getCurrentUser = cache(async (): Promise<User | null> => {
  const session = await getServerSession();
  return session?.user ?? null;
});

export async function requireUser(
  redirectTo: string = "/login",
): Promise<User> {
  const user = await getCurrentUser();
  if (!user) redirect(redirectTo);
  return user;
}

export async function requireAdmin(): Promise<User> {
  const user = await requireUser();
  if (user.role !== "admin") redirect("/forbidden");
  return user;
}

export async function redirectIfAuthenticated(
  redirectTo: string = "/dashboard",
): Promise<void> {
  const user = await getCurrentUser();
  if (user) redirect(redirectTo);
}

export async function requireUserForAction(): Promise<
  { user: User; error: null } | { user: null; error: string }
> {
  const user = await getCurrentUser();
  if (!user) {
    return { user: null, error: "Unauthorized" };
  }
  return { user, error: null };
}
