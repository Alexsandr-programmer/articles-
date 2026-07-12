import Dashboard from "@/components/shared/dashboard/dashboard";
import { DashboardSkeleton } from "@/components/shared/dashboard/dashboard-skeleton";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your dashboard",
};

export default function DashboardPage() {
  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          Dashboard
        </h1>
        <p className="text-muted-foreground max-w-prose text-pretty text-sm sm:text-base">
          Welcome back! Here&apos;s your account overview.
        </p>
      </div>
      <Suspense fallback={<DashboardSkeleton />}>
        <Dashboard />
      </Suspense>
    </div>
  );
}
