"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { revalidateTag, updateTag } from "next/cache";
import prisma from "@/lib/prisma";

export async function createArticleAction(formData: FormData) {
  const title = formData.get("title")?.toString();
  const content = formData.get("content")?.toString();

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, message: "Unauthorized" };
    }

    if (!title || !content) {
      return { success: false, message: "Title and content are required" };
    }

    const article = await prisma.article.create({
      data: {
        title,
        content,
        authorId: session.user.id,
      },
    });

    updateTag("articles");

    return {
      success: true,
      message: "Article created successfully",
      articleId: article.id,
    };
  } catch (error) {
    console.error("Ошибка при создании статьи:", error);
    return { success: false, message: "Internal server error" };
  }
}

export async function deleteArticleAction(articleId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, message: "Unauthorized" };
    }

    await prisma.article.delete({
      where: {
        id: articleId,
        authorId: session.user.id,
      },
    });

    updateTag("articles");

    return {
      success: true,
      message: "Article deleted successfully",
    };
  } catch (error) {
    console.error("Ошибка при удалении статьи:", error);
    return { success: false, message: "Internal server error" };
  }
}
