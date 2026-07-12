import ArticlesList from "@/components/shared/article/articles";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="w-full space-y-6">
      <div className="space-y-2">
        <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          Welcome to the platform
        </h1>
        <p className="text-muted-foreground max-w-prose text-pretty text-sm sm:text-base">
          This is the home page of the platform.
        </p>
      </div>

      <section className="space-y-6 bg-primary p-4 rounded-lg">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Articles
        </h2>
        <Suspense fallback={<ArticlesListSkeleton />}>
          <ArticlesList />
        </Suspense>
      </section>
    </main>
  );
}

export function ArticlesListSkeleton() {
  return (
    <div className="grid grid-cols-3">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="border p-4 flex flex-col items-center rounded-2xl animate-pulse gap-2 "
        >
          <div className="h-[200px] w-[300px] bg-gray-500 rounded-2xl animate-pulse"></div>
          <h1 className="h-6 w-full bg-gray-500 rounded-2xl animate-pulse"></h1>
          <p className="h-4 w-full bg-gray-500 rounded-2xl animate-pulse"></p>
          <p className="h-4 w-1/2 bg-gray-500 rounded-2xl animate-pulse"></p>
        </div>
      ))}
    </div>
  );
}
