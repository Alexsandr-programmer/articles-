import Link from "next/link";
import { ModeToggle } from "../../ui/theme-toggle";
import { UserDropdown } from "./user-dropdown";
import { MobileNav } from "./mobile-nav";
import { buttonVariants } from "../../ui/button";
import { getServerSession } from "@/lib/auth/get-session";
import { cn } from "@/lib/utils";

export async function Navbar() {
  const session = await getServerSession();
  const user = session?.user;

  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/80 sticky top-0 z-40 w-full min-w-0 border-b backdrop-blur">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-5">
        <Link
          href="/"
          className="shrink-0 text-xl font-bold tracking-tight sm:text-2xl md:text-3xl lg:text-4xl"
        >
          Alex<span className="text-primary font-bold">Bek</span>
        </Link>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 md:flex"
          aria-label="Main"
        >
          <div className="flex items-center gap-1 lg:gap-2">
            <Link
              href="/"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              Home
            </Link>
            <Link
              href="/create-article"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              Create
            </Link>
            <Link
              href="/about"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              Contact
            </Link>
          </div>
        </nav>

        <div className="flex min-w-0 shrink-0 items-center justify-end gap-2 sm:gap-3">
          <MobileNav />
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
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
