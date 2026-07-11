import { Article } from "@/prisma/generated/client";
import { Suspense } from "react";
import DeleteButton from "./delete-button";
import { getServerSession } from "@/lib/auth/get-session";
import { getArticles } from "@/lib/article/get-articles";

export default function Articles() {
  return (
    <Suspense fallback={<ArticlesListSkeleton />}>
      <ArticlesList />
    </Suspense>
  );
}

function ArticlesListSkeleton() {
  return (
    <div className="grid grid-cols-3">
      {Array(8).map((article: Article) => (
        <div
          key={article.id}
          className="border p-4 flex flex-col items-center rounded-2xl"
        >
          <div className="h-[200px] w-[300px] bg-gray-500 rounded-2xl"></div>
          <h1>{article.title}</h1>
          <p>{article.content}</p>
        </div>
      ))}
    </div>
  );
}

async function ArticlesList() {
  const articles = await getArticles();

  const session = await getServerSession();
  const user = session?.user;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {articles.reverse().map((article: Article) => (
        <div
          key={article.id}
          className="border p-4 flex flex-col items-center rounded-2xl"
        >
          <div className="h-[200px] w-[300px] bg-gray-500 rounded-2xl"></div>
          <h1>{article.title}</h1>
          <p>{article.content}</p>

          {user?.role === "admin" && <DeleteButton articleId={article.id} />}
        </div>
      ))}
    </div>
  );
}
