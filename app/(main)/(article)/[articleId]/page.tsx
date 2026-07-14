import ArticleView from "@/components/shared/article/article-view";
// import { Avatar } from "@/components/ui/avatar";
import { getArticle } from "@/lib/article/get-article";
import { getArticles } from "@/lib/article/get-articles";
import prisma from "@/lib/prisma";
// import { Badge, Clock } from "lucide-react";
import { Metadata } from "next";
// import { notFound } from "next/navigation";
// import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ articleId: string }>;
}): Promise<Metadata> {
  const { articleId } = await params;
  // const article = await prisma.article.findUnique({
  //   where: { id: articleId },
  //   select: { title: true, content: true },
  // });

  // if (!article) {
  //   return { title: "Article not found" };
  // }

  const article = await getArticle(articleId);

  if (!article) {
    return {
      title: "Article not found",
      description: "This article does not exist.",
    };
  }

  const description =
    article.content.length > 160
      ? `${article.content.slice(0, 157)}...`
      : article.content;

  return {
    title: article.title,
    description,
  };
}

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ articleId: article.id }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const { articleId } = await params;

  return (
    // <Suspense fallback={<ArticleViewSkeleton />}>
    <ArticleView articleId={articleId} />
    // </Suspense>
  );
}

function ArticleViewSkeleton() {
  return (
    <article className="mx-auto w-full max-w-3xl space-y-8 relative">
      <header className="space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <div className="h-8 w-24 bg-gray-500 animate-pulse" />
        </div>

        <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
          <div className="h-10 w-full bg-gray-500 animate-pulse" />
        </h1>

        <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-gray-500 animate-pulse" />
            <div className="h-4 w-24 bg-gray-500 animate-pulse" />
          </div>
        </div>
      </header>

      <div className="relative aspect-video overflow-hidden rounded-2xl ring-1 ring-foreground/10">
        <div className="size-full bg-gray-500 animate-pulse" />
      </div>

      <div className="space-y-6">
        <div className="text-foreground/90 space-y-4 text-base leading-8 whitespace-pre-wrap sm:text-lg sm:leading-8">
          <div className="h-4 w-full bg-gray-500 animate-pulse" />
          <div className="h-4 w-full bg-gray-400 animate-pulse" />
          <div className="h-4 w-full bg-gray-500 animate-pulse" />
          <div className="h-4 w-full bg-gray-500 animate-pulse" />
          <div className="h-4 w-full bg-gray-500 animate-pulse" />
          <div className="h-4 w-full bg-gray-500 animate-pulse" />
        </div>

        <p className="text-muted-foreground border-t pt-4 text-xs animate-pulse"></p>
      </div>
    </article>
  );
}
