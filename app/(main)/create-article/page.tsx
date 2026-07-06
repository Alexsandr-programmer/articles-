import { getServerSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";
import ArticleForm from "@/components/shared/article/article-from";

export default async function CreateBlogPage() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) redirect("/login");

  return (
    <main className="max-w-7xl mx-auto ">
      <div className="w-3xl flex justify-center">
        <ArticleForm />
      </div>
    </main>
  );
}
