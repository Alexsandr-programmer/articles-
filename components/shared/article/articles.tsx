import type { Article } from "@/prisma/generated/client";
import { Suspense } from "react";
import DeleteButton from "./delete-button";
import { getServerSession } from "@/lib/auth/get-session";
import { getArticles } from "@/lib/article/get-articles";
import Image from "next/image";
import Link from "next/link";

export default async function ArticlesList() {
  const articles = await getArticles();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {articles.reverse().map((article: Article) => (
        <div
          key={article.id}
          className="flex flex-col items-center rounded-2xl gap-2 bg-secondary relative hover:text-primary transition-all duration-300"
        >
          <Link href={`/${article.id}`} className="flex flex-col items-center ">
            <Image
              src={article.imageUrl || "/image.png"}
              alt="Article image"
              width={300}
              height={200}
              className="rounded-2xl w-full  object-cover hover:brightness-90 transition-all duration-300"
            />
            <div className="flex flex-col gap-2 items-center p-4">
              <h1 className="text-lg font-bold">{article.title}</h1>
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
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
