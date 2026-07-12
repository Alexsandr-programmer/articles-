import ArticleView from "@/components/shared/article/article-view";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ articleId: string }>;
}): Promise<Metadata> {
  const { articleId } = await params;
  const article = await prisma.article.findUnique({
    where: { id: articleId },
    select: { title: true, content: true },
  });

  if (!article) {
    return { title: "Article not found" };
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

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const { articleId } = await params;
  const article = await prisma.article.findUnique({
    where: { id: articleId },
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  if (!article) {
    notFound();
  }

  return <ArticleView article={article} />;
}
