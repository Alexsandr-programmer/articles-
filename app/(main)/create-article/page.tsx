import { getServerSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";
import ArticleForm from "@/components/shared/article/article-from";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Article",
  description: "Create a new article",
};

export default async function CreateBlogPage() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) redirect("/login");

  return (
    <div className="w-full min-w-0 space-y-6 flex flex-col items-center justify-center">
      <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
        Create Article
      </h1>

      <p className="text-muted-foreground max-w-prose text-pretty text-sm sm:text-base">
        Share your ideas with readers around the world.
      </p>

      <ArticleForm />
    </div>
  );
}
