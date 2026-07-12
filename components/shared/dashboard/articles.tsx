import prisma from "@/lib/prisma";
import Link from "next/link";
import DeleteButton from "../article/delete-button";

export default async function Articles({ authorId }: { authorId: string }) {
  const articles = await prisma.article.findMany({
    where: {
      authorId,
    },
  });
  return (
    <div>
      <h1>Articles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
        {articles.reverse().map((article) => (
          <div key={article.id} className="bg-secondary p-4 rounded-lg ">
            <h2 className="text-lg font-bold">{article.title}</h2>
            <p className="text-sm text-gray-500">
              {article.content.slice(0, 100)}...
            </p>
            <p className="text-sm text-gray-500">
              {article.createdAt.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <div className="flex gap-2 justify-between w-full p-4 ">
              <Link href={`/${article.id}/edit`}>Update</Link>
              <DeleteButton articleId={article.id} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 justify-between w-full p-4 absolute top-0 right-0"></div>
    </div>
  );
}
