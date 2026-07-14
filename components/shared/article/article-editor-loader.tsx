import { getArticle } from "@/lib/article/get-article";
import UpdateArticleForm from "@/components/shared/article/update-article-form";
import { notFound, redirect } from "next/navigation";

interface LoaderProps {
  articleId: string;
  userId: string;
}

export async function ArticleEditorLoader({ articleId, userId }: LoaderProps) {
  const article = await getArticle(articleId);

  if (!article) notFound();
  if (article.authorId !== userId) redirect("/forbidden");

  return <UpdateArticleForm article={article} />;
}
