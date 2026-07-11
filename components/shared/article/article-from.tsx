"use client";

import { articleScheme } from "@/lib/article/article-scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { createArticleAction } from "@/app/actions";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { LoadingButton } from "../loading-button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ArticleValues = z.infer<typeof articleScheme>;

export default function ArticleForm() {
  const router = useRouter();

  const form = useForm<ArticleValues>({
    resolver: zodResolver(articleScheme),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const handleSubmit = async (data: ArticleValues) => {
    // const response = await fetch("/api/articles", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });

    // if (!response.ok) {
    //   toast.error("article was't created ");
    // } else {
    //   toast.success("aritcle was created");
    //   router.push("/");
    // }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);

    const result = await createArticleAction(formData);

    if (!result.success) {
      toast.error(result.message || "Article wasn't created");
    } else {
      toast.success("Article was created");
      router.push("/");
    }
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
              Create an article
            </LoadingButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
