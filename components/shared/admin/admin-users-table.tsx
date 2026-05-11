"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export type AdminUserRow = {
  id: string;
  name: string;
  email: string;
  role?: string | null;
  banned?: boolean | null;
  banReason?: string | null;
  createdAt?: string | null;
  emailVerified?: boolean | null;
};

interface AdminUsersTableProps {
  users: AdminUserRow[];
  currentUserId: string;
}

export function AdminUsersTable({
  users,
  currentUserId,
}: AdminUsersTableProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function refresh() {
    startTransition(() => {
      router.refresh();
    });
  }

  async function handleDelete(userId: string) {
    if (
      !window.confirm(
        "Delete this user permanently? This removes their accounts and sessions.",
      )
    ) {
      return;
    }
    const { error } = await authClient.admin.removeUser({ userId });
    if (error) {
      toast.error(error.message || "Could not delete user");
      return;
    }
    toast.success("User deleted");
    refresh();
  }

  async function handleBan(userId: string) {
    const reason = window.prompt("Ban reason (optional):", "Policy violation");
    if (reason === null) return;
    const { error } = await authClient.admin.banUser({
      userId,
      banReason: reason.trim() || undefined,
    });
    if (error) {
      toast.error(error.message || "Could not ban user");
      return;
    }
    toast.success("User banned");
    refresh();
  }

  async function handleUnban(userId: string) {
    const { error } = await authClient.admin.unbanUser({ userId });
    if (error) {
      toast.error(error.message || "Could not unban user");
      return;
    }
    toast.success("User unbanned");
    refresh();
  }

  if (users.length === 0) {
    return <p className="text-muted-foreground text-sm">No users found.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-muted/50 border-b">
          <tr>
            <th className="px-4 py-3 font-medium">User</th>
            <th className="px-4 py-3 font-medium">Role</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Joined</th>
            <th className="px-4 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {users.map((user) => {
            const isSelf = user.id === currentUserId;
            const banned = Boolean(user.banned);
            return (
              <tr key={user.id} className="bg-background hover:bg-muted/30">
                <td className="px-4 py-3">
                  <div className="font-medium">{user.name} </div>
                  <div className="text-muted-foreground text-xs flex items-center gap-4">
                    {user.email}{" "}
                    {user.emailVerified ? (
                      <Badge className="text-green-500" variant="outline">
                        verified
                      </Badge>
                    ) : (
                      <Badge className="text-orange-500" variant="outline">
                        unverified
                      </Badge>
                    )}
                  </div>
                  {banned && user.banReason ? (
                    <div className="text-destructive mt-1 max-w-xs text-xs">
                      {user.banReason}
                    </div>
                  ) : null}
                </td>
                <td className="px-4 py-3">
                  {user.role === "admin" ? (
                    <Badge variant="secondary">admin</Badge>
                  ) : (
                    <Badge variant="outline">user</Badge>
                  )}
                </td>
                <td className="px-4 py-3">
                  {banned ? (
                    <Badge variant="destructive">banned</Badge>
                  ) : (
                    <span className="text-muted-foreground">active</span>
                  )}
                </td>
                <td className="text-muted-foreground px-4 py-3 whitespace-nowrap">
                  {user.createdAt
                    ? format(new Date(user.createdAt), "MMM d, yyyy")
                    : "—"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap justify-end gap-2">
                    {banned ? (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={isPending || isSelf}
                        onClick={() => handleUnban(user.id)}
                      >
                        Unban
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={isPending || isSelf}
                        onClick={() => handleBan(user.id)}
                      >
                        Ban
                      </Button>
                    )}
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      disabled={isPending || isSelf}
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="text-muted-foreground border-t px-4 py-2 text-xs">
        You cannot ban or delete your own account from this panel.
      </p>
    </div>
  );
}
