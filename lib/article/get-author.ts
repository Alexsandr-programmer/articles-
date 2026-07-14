import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export async function getAuthor(authorId: string) {
  "use cache";
  const author = await prisma.user.findUnique({
    where: { id: authorId },
  });
  if (!author) {
    notFound();
  }
  return author;
}
