"use client";

import { deleteArticleAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

export default function DeleteButton({ articleId }: { articleId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteArticleAction(articleId);
    });
  };
  if (isPending) {
    return <Button disabled>Deleting...</Button>;
  }
  return (
    <Button onClick={handleDelete} disabled={isPending} variant="destructive">
      Delete
    </Button>
  );
}
