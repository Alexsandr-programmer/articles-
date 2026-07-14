import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function UpdateArticleFormSkeleton() {
  return (
    <Card
      className="mx-auto w-full min-w-0 max-w-2xl"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Loading update article form…</span>
      <CardHeader className="space-y-1.5">
        <Skeleton className="h-6 w-36 sm:h-7 sm:w-40" />
        <Skeleton className="h-4 w-64 max-w-full" />
      </CardHeader>
      <CardContent>
        <div className="space-y-5 sm:space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-10 w-full rounded-md sm:h-8" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="min-h-40 w-full rounded-md sm:min-h-48" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-md sm:h-8" />
          </div>

          <Skeleton className="h-11 w-full rounded-md sm:h-9" />
        </div>
      </CardContent>
    </Card>
  );
}
