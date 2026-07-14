import { notFound } from "next/navigation";
import prisma from "../prisma";
import { cacheLife, cacheTag } from "next/cache";

export async function getArticle(articleId: string) {
  "use cache";
  cacheTag(`articles-${articleId}`);
  cacheLife("weeks");
  const article = await prisma.article.findUnique({
    where: { id: articleId },
    include: {
      author: true,
    },
  });

  if (!article) {
    notFound();
  }
  return article;
}
