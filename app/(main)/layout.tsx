import { Footer } from "@/components/shared/footer/footer";
import { Navbar } from "@/components/shared/header/navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh min-w-0 flex-col">
      <Navbar />
      <main className="mx-auto flex w-full min-w-0 max-w-6xl flex-1 flex-col px-4 py-6 sm:px-5 sm:py-8 md:px-6 md:py-10 lg:py-12">
        {children}
      </main>
      <Footer />
    </div>
  );
}
