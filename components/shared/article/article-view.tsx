import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Article } from "@/prisma/generated/client";
import prisma from "@/lib/prisma";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function getReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default async function ArticleView({ article }: { article: Article }) {
  const readingTime = getReadingTime(article.content);
  const wasUpdated =
    article.updatedAt.getTime() - article.createdAt.getTime() > 60_000;

  const author = await prisma.user.findUnique({
    where: { id: article.authorId },
  });

  // const session = await getServerSession();
  // const user = session?.user;

  return (
    <div className="w-full space-y-8">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "-ml-2 w-fit gap-1.5",
        )}
      >
        <ArrowLeft className="size-4" />
        Back to articles
      </Link>

      <article className="mx-auto w-full max-w-3xl space-y-8 relative">
        <header className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={article.published ? "default" : "secondary"}>
              {article.published ? "Published" : "Draft"}
            </Badge>
            <span className="text-muted-foreground inline-flex items-center gap-1.5 text-xs">
              <Clock className="size-3.5" />
              {readingTime} min read
            </span>
          </div>

          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            {article.title}
          </h1>

          <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <div className="flex items-center gap-2.5">
              <Avatar size="sm">
                {author?.image ? (
                  <AvatarImage
                    src={author?.image || ""}
                    alt={author?.name || ""}
                  />
                ) : null}
                <AvatarFallback>
                  {getInitials(author?.name || "")}
                </AvatarFallback>
              </Avatar>
              <span className="text-foreground font-medium">
                {author?.name}
              </span>
            </div>

            <Separator orientation="vertical" className="hidden h-4 sm:block" />

            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              {format(article.createdAt, "MMMM d, yyyy")}
            </span>
          </div>
        </header>

        <div className="relative aspect-video overflow-hidden rounded-2xl ring-1 ring-foreground/10">
          <Image
            src={article.imageUrl || "/image.png"}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        <Separator />

        <div className="space-y-6">
          <div className="text-foreground/90 space-y-4 text-base leading-8 whitespace-pre-wrap sm:text-lg sm:leading-8">
            {article.content}
          </div>

          {wasUpdated && (
            <p className="text-muted-foreground border-t pt-4 text-xs">
              Last updated {format(article.updatedAt, "MMMM d, yyyy")}
            </p>
          )}
        </div>
      </article>
    </div>
  );
}
