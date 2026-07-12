import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-lg flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">404</h1>
      <p className="text-muted-foreground text-sm sm:text-base">
        The page you are looking for does not exist or has been removed.
      </p>
      <Link href="/" className={cn(buttonVariants({ variant: "default" }))}>
        Back to home
      </Link>
    </div>
  );
}
