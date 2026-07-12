import { getServerSession } from "@/lib/auth/get-session";
import UpdateArticleForm from "@/components/shared/article/update-article-form";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

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

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const { articleId } = await params;
  const session = await getServerSession();
  const user = session?.user;
  if (!user) redirect("/login");
  const article = await prisma.article.findUnique({
    where: { id: articleId },
  });
  if (!article) notFound();
  if (article.authorId !== user.id) redirect("/forbidden");
  return (
    <div className="w-full min-w-0 space-y-6">
      <h1 className="text-2xl font-semibold sm:text-3xl">Edit Article</h1>
      <UpdateArticleForm article={article} />
    </div>
  );
}
