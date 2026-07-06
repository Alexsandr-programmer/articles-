"use client";

import {
  LayoutDashboardIcon,
  LogOutIcon,
  ShieldIcon,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../../ui/button";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import type { User } from "@/lib/auth/auth";
import { authClient } from "@/lib/auth/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UserDropdownProps {
  user: User;
}

export function UserDropdown({ user }: UserDropdownProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();
    if (error) toast.error(error.message || "Error signing out");
    else toast.success("Signed out successfully");
    router.refresh();
  };

  return (
    <DropdownMenu>
      {/* button to open the dropdown */}
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="max-w-[min(100%,14rem)] cursor-pointer sm:max-w-none">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={16}
              height={16}
              className="rounded-full object-cover"
            />
          ) : (
            <UserIcon />
          )}
          <span className="min-w-0 max-w-[9rem] truncate sm:max-w-48">{user.name}</span>
        </Button>
      </DropdownMenuTrigger>

      {/* dropdown menu content */}
      <DropdownMenuContent align="end" className="w-56">
        {/* user email */}
        <DropdownMenuLabel>{user.email}</DropdownMenuLabel>

        {/* separator */}
        <DropdownMenuSeparator />

        {/* profile link */}
        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer">
            <UserIcon className="size-4" /> <span>Profile</span>
          </Link>
        </DropdownMenuItem>

        {/* dashboard link */}
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="cursor-pointer">
            <LayoutDashboardIcon className="size-4" /> <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>

        {/* admin link */}
        {user.role === "admin" && (
          <DropdownMenuItem asChild>
            <Link href="/admin" className="cursor-pointer">
              <ShieldIcon className="size-4" /> <span>Admin</span>
            </Link>
          </DropdownMenuItem>
        )}

        {/* sign out link */}
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOutIcon className="size-4" /> <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
