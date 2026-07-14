import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireUserForAction } from "@/lib/auth/dal";
import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  try {
    const { user, error } = await requireUserForAction();
    if (error || !user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { message: "Title and content are required" },
        { status: 400 },
      );
    }

    const article = await prisma.article.create({
      data: {
        title,
        content,
        authorId: user.id,
      },
    });

    revalidateTag("articles", "max");

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
