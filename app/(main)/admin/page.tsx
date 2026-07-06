import {
  AdminUsersTable,
  type AdminUserRow,
} from "@/components/shared/admin/admin-users-table";
import { auth } from "@/lib/auth/auth";
import { getServerSession } from "@/lib/auth/get-session";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function AdminPage() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) redirect("/unauthorized");
  if (user.role !== "admin") redirect("/forbidden");

  let users: AdminUserRow[] = [];
  let loadError: string | null = null;

  try {
    const res = await auth.api.listUsers({
      headers: await headers(),
      query: {
        limit: 100,
        sortBy: "createdAt",
        sortDirection: "desc",
      },
    });

    users = res.users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role ?? null,
      banned: u.banned ?? false,
      banReason: u.banReason ?? null,
      emailVerified: u.emailVerified ?? false,
      createdAt: u.createdAt
        ? new Date(u.createdAt as Date | string).toISOString()
        : null,
    }));
  } catch (e) {
    loadError =
      e instanceof Error ? e.message : "Failed to load users. Try again.";
  }

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          Admin
        </h1>
        <p className="text-muted-foreground max-w-prose text-pretty text-sm sm:text-base">
          Manage users: view, ban, or remove accounts.
        </p>
      </div>

      {loadError ? (
        <p className="text-destructive text-sm" role="alert">
          {loadError}
        </p>
      ) : (
        <AdminUsersTable users={users} currentUserId={user.id} />
      )}
    </div>
  );
}
