import Articles from "@/components/shared/article/articles";
import { getServerSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";

export default async function Home() {
  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          Welcome to the platform
        </h1>
        <p className="text-muted-foreground max-w-prose text-pretty text-sm sm:text-base">
          This is the home page of the platform.
        </p>
      </div>

      <Articles />
    </div>
  );
}
