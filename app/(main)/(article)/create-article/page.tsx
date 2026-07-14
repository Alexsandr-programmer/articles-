import ArticleForm from "@/components/shared/article/article-from";
import { CreateArticleSkeleton } from "@/components/shared/article/create-article-skeleton";
import { requireUser } from "@/lib/auth/dal";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Create Article",
  description: "Create a new article",
};

export default function CreateBlogPage() {
  return (
    <div className="flex w-full min-w-0 flex-col items-center justify-center space-y-6">
      <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
        Create Article
      </h1>

      <p className="text-muted-foreground max-w-prose text-pretty text-sm sm:text-base">
        Share your ideas with readers around the world.
      </p>

      <Suspense fallback={<CreateArticleSkeleton />}>
        <CreateArticleContent />
      </Suspense>
    </div>
  );
}

async function CreateArticleContent() {
  await requireUser();
  return <ArticleForm />;
}
