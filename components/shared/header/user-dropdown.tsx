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

function handleSignOut() {
  // TODO: Handle sign out
}

export function UserDropdown() {
  // TODO: Render real user info
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    image: undefined,
    role: "admin",
  };

  return (
    <DropdownMenu>
      {/* button to open the dropdown */}
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
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
          <span className="max-w-48 truncate">{user.name}</span>
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
          <Link href="/profile">
            <UserIcon className="size-4" /> <span>Profile</span>
          </Link>
        </DropdownMenuItem>

        {/* dashboard link */}
        <DropdownMenuItem asChild>
          <Link href="/dashboard">
            <LayoutDashboardIcon className="size-4" /> <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>

        {/* admin link */}
        {/* TODO: Hide admin item for non-admin users */}
        <DropdownMenuItem asChild>
          <Link href="/admin">
            <ShieldIcon className="size-4" /> <span>Admin</span>
          </Link>
        </DropdownMenuItem>

        {/* sign out link */}
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOutIcon className="size-4" /> <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
