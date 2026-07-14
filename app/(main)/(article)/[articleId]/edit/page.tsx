import UpdateArticleForm from "@/components/shared/article/update-article-form";
import { requireUser } from "@/lib/auth/dal";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const { articleId } = await params;
  const article = await prisma.article.findUnique({
    where: { id: articleId },
  });
  return { title: article?.title };
}

export async function generateStaticParams() {
  const articles = await prisma.article.findMany({
    select: { id: true },
  });
  return articles.map((article) => ({ articleId: article.id }));
}

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const { articleId } = await params;
  const user = await requireUser();
  const article = await prisma.article.findUnique({
    where: { id: articleId },
  });
  if (!article) notFound();
  if (article.authorId !== user.id) redirect("/forbidden");

  return (
    <div className="w-full min-w-0 space-y-6">
      <h1 className="text-2xl font-semibold sm:text-3xl">Edit Article</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <UpdateArticleForm article={article} />
      </Suspense>
    </div>
  );
}
