import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function FieldSkeleton({ labelWidth = "w-14" }: { labelWidth?: string }) {
  return (
    <div className="space-y-2">
      <Skeleton className={`h-4 ${labelWidth}`} />
      <Skeleton className="h-9 w-full rounded-md" />
    </div>
  );
}

export function LoginFormSkeleton() {
  return (
    <Card className="w-full max-w-md" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading login form…</span>
      <CardHeader className="space-y-1.5">
        <Skeleton className="h-6 w-24 md:h-7 md:w-28" />
        <Skeleton className="h-3 w-64 max-w-full md:h-4" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <FieldSkeleton labelWidth="w-12" />

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-9 w-full rounded-md" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="size-4 rounded-sm" />
            <Skeleton className="h-4 w-24" />
          </div>

          <Skeleton className="h-9 w-full rounded-md" />

          <div className="flex w-full flex-col gap-2">
            <Skeleton className="h-9 w-full rounded-md" />
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-center border-t pt-4">
          <Skeleton className="h-3 w-48" />
        </div>
      </CardFooter>
    </Card>
  );
}

export function SignUpFormSkeleton() {
  return (
    <Card className="w-full max-w-md" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading sign up form…</span>
      <CardHeader className="space-y-1.5">
        <Skeleton className="h-6 w-24 md:h-7 md:w-28" />
        <Skeleton className="h-3 w-56 max-w-full md:h-4" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <FieldSkeleton labelWidth="w-12" />
          <FieldSkeleton labelWidth="w-12" />
          <FieldSkeleton labelWidth="w-16" />
          <FieldSkeleton labelWidth="w-32" />
          <Skeleton className="h-9 w-full rounded-md" />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-center border-t pt-4">
          <Skeleton className="h-3 w-44" />
        </div>
      </CardFooter>
    </Card>
  );
}

export function LoginPageSkeleton() {
  return (
    <main className="flex min-h-dvh w-full min-w-0 items-center justify-center px-4 py-8 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-12">
      <div className="w-full max-w-md">
        <LoginFormSkeleton />
      </div>
    </main>
  );
}

export function SignUpPageSkeleton() {
  return (
    <main className="flex min-h-dvh w-full min-w-0 items-center justify-center px-4 py-8 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-12">
      <div className="w-full max-w-md">
        <SignUpFormSkeleton />
      </div>
    </main>
  );
}
