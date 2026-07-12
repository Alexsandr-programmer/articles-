import { Loader2 } from "lucide-react";

export default function ArticleLoading() {
  return (
    <div className="flex justify-center items-center h-full">
      <Loader2 className="size-10 animate-spin" />
    </div>
  );
}
