import prisma from "@/lib/prisma";

type Article = {
  id: string;
  title: string;
  content: string;
};

export default async function Home() {
  const articles = await prisma.article.findMany();

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          Welcome to the platform
        </h1>
        <p className="text-muted-foreground max-w-prose text-pretty text-sm sm:text-base">
          This is the home page of the platform.
        </p>
      </div>

      <div className="grid grid-cols-3">
        {articles.map((article: Article) => (
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
    </div>
  );
}
