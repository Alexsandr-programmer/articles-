import { Navbar } from "@/components/shared/header/navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main className="mx-auto flex w-full grow px-4 py-8 md:px-6 md:py-12">
        {children}
      </main>
    </div>
  );
}
