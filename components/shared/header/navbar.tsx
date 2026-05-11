import codingInFlowLogo from "@/assets/coding_in_flow_logo.jpg";

import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "../../ui/theme-toggle";
import { UserDropdown } from "./user-dropdown";
import { buttonVariants } from "../../ui/button";
import { getServerSession } from "@/lib/auth/get-session";

export async function Navbar() {
  // TODO: Display logged-in user

  const session = await getServerSession();
  const user = session?.user;

  return (
    <header className="bg-background border-b w-full">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-4xl font-bold">
          Alex<span className="text-primary font-bold">Bek</span>
        </Link>

        <div className="flex items-center justify-between w-1/2">
          <nav className="flex items-center gap-2 ">
            <Link href="/" className={buttonVariants({ variant: "ghost" })}>
              Home
            </Link>
            <Link
              href="/about"
              className={buttonVariants({ variant: "ghost" })}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={buttonVariants({ variant: "ghost" })}
            >
              Contact
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-x-10 justify-end">
          {user ? (
            <UserDropdown user={user} />
          ) : (
            <div className="flex items-center gap-x-1">
              <Link
                href="/login"
                className={buttonVariants({ variant: "default" })}
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                className={buttonVariants({ variant: "default" })}
              >
                Sign Up
              </Link>
            </div>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
