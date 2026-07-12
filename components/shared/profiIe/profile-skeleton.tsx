import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { ReactNode } from "react";

function FormFieldSkeleton({ withExtra }: { withExtra?: boolean }) {
  return (
    <div className="grid gap-2">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-9 w-full rounded-md" />
      {withExtra ? <Skeleton className="mt-1 size-16 rounded-full" /> : null}
    </div>
  );
}

function FormCardSkeleton({
  titleWidth,
  fields,
}: {
  titleWidth: string;
  fields: ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <Skeleton className={`h-5 ${titleWidth}`} />
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {fields}
          <Skeleton className="h-9 w-full rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}

export function ProfileSkeleton() {
  return (
    <div
      className="flex min-w-0 flex-col gap-6 lg:flex-row lg:gap-8"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Loading profile…</span>

      <div className="min-w-0 flex-1">
        <FormCardSkeleton
          titleWidth="w-36"
          fields={
            <>
              <FormFieldSkeleton />
              <FormFieldSkeleton withExtra />
            </>
          }
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <FormCardSkeleton
          titleWidth="w-32"
          fields={<FormFieldSkeleton />}
        />
        <FormCardSkeleton
          titleWidth="w-40"
          fields={
            <>
              <FormFieldSkeleton />
              <FormFieldSkeleton />
            </>
          }
        />
        <Skeleton className="h-9 w-full rounded-md" />
      </div>
    </div>
  );
}

export function ProfilePageSkeleton() {
  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-28 sm:h-9 sm:w-36" />
        <Skeleton className="h-4 w-full max-w-md sm:h-5" />
      </div>
      <ProfileSkeleton />
    </div>
  );
}
