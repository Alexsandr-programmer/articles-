"use server";

import { requireUserForAction } from "@/lib/auth/dal";
import { updateTag } from "next/cache";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createArticleAction(formData: FormData) {
  const title = formData.get("title")?.toString();
  const content = formData.get("content")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();

  try {
    const { user, error } = await requireUserForAction();
    if (error || !user) {
      return { success: false, message: error ?? "Unauthorized" };
    }

    if (!title || !content) {
      return { success: false, message: "Title and content are required" };
    }

    const article = await prisma.article.create({
      data: {
        title,
        content,
        authorId: user.id,
        imageUrl,
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
    const { user, error } = await requireUserForAction();
    if (error || !user) {
      return { success: false, message: error ?? "Unauthorized" };
    }

    await prisma.article.delete({
      where: {
        id: articleId,
        authorId: user.id,
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

export async function updateArticleAction(formData: FormData) {
  const title = formData.get("title")?.toString();
  const content = formData.get("content")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const articleId = formData.get("articleId")?.toString();

  try {
    const { user, error } = await requireUserForAction();
    if (error || !user) {
      return { success: false, message: error ?? "Unauthorized" };
    }

    await prisma.article.update({
      where: { id: articleId, authorId: user.id },
      data: { title, content, imageUrl },
    });

    updateTag("articles");
    redirect(`/${articleId}`);
  } catch (error) {
    console.error("Ошибка при обновлении статьи:", error);
    return { success: false, message: "Internal server error" };
  }
}
