"use client";

import { updateArticleAction } from "@/app/actions";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoadingButton } from "@/components/shared/loading-button";
import { articleScheme } from "@/lib/article/article-scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Article } from "@/prisma/generated/client";
import { redirect } from "next/navigation";

type ArticleValues = z.infer<typeof articleScheme>;

export default function UpdateArticleForm({
  article,
}: {
  article: Article & { id: string };
}) {
  const form = useForm<ArticleValues>({
    resolver: zodResolver(articleScheme),
    defaultValues: {
      title: article.title,
      content: article.content,
      imageUrl: article.imageUrl || "",
    },
  });

  const handleSubmit = async (data: ArticleValues) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append(
      "imageUrl",
      data.imageUrl ||
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsHGRNvgv9VxDsMyNrNfz74oqHhPzheNW_20pcVfbS0Q&s=10",
    );
    formData.append("articleId", article.id);
    await updateArticleAction(formData);
    redirect("/");
  };

  return (
    <Card className="mx-auto w-full min-w-0 max-w-2xl">
      <CardHeader className="space-y-1.5">
        <CardTitle className="text-balance text-lg font-semibold tracking-tight sm:text-xl">
          Article details
        </CardTitle>
        <CardDescription className="text-pretty text-xs sm:text-sm">
          Enter your article to share with the world
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5 sm:space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm">Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Article title"
                      className="h-10 text-base sm:h-8 sm:text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm">Main Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your article here..."
                      rows={10}
                      className="min-h-40 resize-y text-base sm:min-h-48 sm:text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm">Image URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      className="h-10 text-base sm:h-8 sm:text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.formState.errors.root?.serverError && (
              <div role="alert" className="text-sm text-red-600">
                {form.formState.errors.root?.serverError.message}
              </div>
            )}

            <LoadingButton
              type="submit"
              className="h-11 w-full touch-manipulation sm:h-9"
              loading={form.formState.isSubmitting}
            >
              Update an article
            </LoadingButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
