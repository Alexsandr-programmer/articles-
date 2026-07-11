import { cacheLife, cacheTag } from "next/cache";
import prisma from "../prisma";

export async function getArticles() {
  "use cache";
  cacheLife("hours");
  cacheTag("articles");

  const articles = await prisma.article.findMany();
  return articles;
}
