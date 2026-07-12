import prisma from "@/lib/prisma";
import Link from "next/link";
import DeleteButton from "../article/delete-button";
import { buttonVariants } from "@/components/ui/button";

export default async function Articles({ authorId }: { authorId: string }) {
  const articles = await prisma.article.findMany({
    where: { authorId },
    orderBy: { createdAt: "desc" },
  });

  if (articles.length === 0) {
    return (
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Your articles</h2>
        <p className="text-muted-foreground text-sm">
          You have not published any articles yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Your articles</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {articles.map((article) => (
          <div
            key={article.id}
            className="space-y-3 rounded-lg bg-secondary p-4"
          >
            <Link href={`/${article.id}`}>
              <h3 className="text-lg font-bold">{article.title}</h3>
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
            </Link>

            <div className="flex gap-2 justify-between pt-4">
              <Link
                href={`/${article.id}`}
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                View
              </Link>
              <Link
                href={`/${article.id}/edit`}
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                Edit
              </Link>
              <DeleteButton articleId={article.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
