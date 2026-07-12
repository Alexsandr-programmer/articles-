import { articleScheme } from "./article-scheme";

export function parseArticleFormData(formData: FormData) {
  const raw = {
    title: formData.get("title")?.toString() ?? "",
    content: formData.get("content")?.toString() ?? "",
    imageUrl: formData.get("imageUrl")?.toString() || undefined,
  };

  const result = articleScheme.safeParse(raw);

  if (!result.success) {
    const message = result.error.issues[0]?.message ?? "Invalid article data";
    return { success: false as const, message };
  }

  return {
    success: true as const,
    data: {
      ...result.data,
      imageUrl: result.data.imageUrl || "/image.png",
    },
  };
}
