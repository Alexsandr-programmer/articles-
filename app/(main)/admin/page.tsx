import type { Metadata } from "next";
import { forbidden, unauthorized } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function AdminPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Admin</h1>
          <p className="text-muted-foreground">
            You have administrator access.
          </p>
        </div>
        {/* <DeleteApplication /> */}
        {/* TODO: Add delete application */}
      </div>
    </main>
  );
}
