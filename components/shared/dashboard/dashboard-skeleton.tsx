import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="w-full space-y-6" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading dashboard…</span>

      {/* <div className="border-border/60 bg-muted/30 flex items-center gap-3 rounded-xl border px-4 py-3.5">
        <Skeleton className="size-5 shrink-0 rounded-full" />
        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton className="h-4 w-full max-w-md" />
          <Skeleton className="h-3 w-40 max-w-full sm:hidden" />
        </div>
        <Skeleton className="hidden h-8 w-28 shrink-0 rounded-md sm:block" />
      </div> */}

      <Card>
        <CardHeader className="gap-2">
          <div className="flex items-center gap-2">
            <Skeleton className="size-5 rounded-md" />
            <Skeleton className="h-5 w-44" />
          </div>
          <Skeleton className="h-4 w-64 max-w-full" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="flex flex-col items-center gap-3">
              <Skeleton className="size-32 rounded-full sm:size-24" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>

            <div className="w-full flex-1 space-y-5">
              <div className="space-y-2 text-center sm:text-left">
                <Skeleton className="mx-auto h-8 w-48 max-w-full sm:mx-0" />
                <Skeleton className="mx-auto h-4 w-56 max-w-full sm:mx-0" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 sm:justify-start">
                  <Skeleton className="size-4 rounded-sm" />
                  <Skeleton className="h-4 w-28" />
                </div>
                <Skeleton className="mx-auto h-5 w-36 sm:mx-0" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-lg font-semibold">Your articles</h2>
      <div className="space-y-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    </div>
  );
}

export function DashboardPageSkeleton() {
  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-40 sm:h-9 sm:w-48" />
        <Skeleton className="h-4 w-full max-w-sm sm:h-5" />
      </div>
      <DashboardSkeleton />
    </div>
  );
}
