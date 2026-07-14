import type { Metadata } from "next";
import { LoginForm } from "@/components/shared/auth/login-form";
import { LoginFormSkeleton } from "@/components/shared/auth/auth-form-skeleton";
import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Log in to your account",
  description: "Log in to your account",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-[100dvh] w-full min-w-0 items-center justify-center px-4 py-8 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-12">
      <div className="w-full max-w-md">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
            <CardDescription className="text-xs md:text-sm">
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
          <CardFooter>
            <div className="flex w-full justify-center border-t pt-4">
              <p className="text-muted-foreground text-center text-xs">
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" className="underline">
                  Sign up
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
