import UpdateArticleForm from "@/components/shared/article/update-article-form";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const { articleId } = await params;
  const article = await prisma.article.findUnique({
    where: { id: articleId },
  });
  if (!article) {
    return notFound();
  }
  return {
    title: `Update ${article.title}`,
    description: `Update ${article.title}`,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: { articleId: string };
}) {
  const { articleId } = await params;
  const article = await prisma.article.findUnique({
    where: { id: articleId },
  });
  if (!article) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-4 items-center justify-center p-4">
      <h1 className="text-2xl font-bold">{article.title}</h1>

      <UpdateArticleForm article={article} />
    </div>
  );
}
