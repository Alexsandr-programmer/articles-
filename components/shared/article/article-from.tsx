"use client";

import { articleScheme } from "@/lib/article/article-scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import Link from "next/link";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { LoadingButton } from "../loading-button";
import { toast } from "sonner";

type ArticleValues = z.infer<typeof articleScheme>;

export default function ArticleForm() {
  const form = useForm<ArticleValues>({
    resolver: zodResolver(articleScheme),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const handleSubmit = async (data: ArticleValues) => {
    const response = await fetch("/api/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      toast.error("article was't created ");
    } else {
      toast.success("aritcle wasn created");
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Create Article</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your acrticle to share with all world
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Content</FormLabel>
                  <FormControl>
                    <Textarea placeholder="content" {...field} />
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
              className="w-full"
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
