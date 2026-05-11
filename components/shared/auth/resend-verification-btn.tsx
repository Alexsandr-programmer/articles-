"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth/auth-client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface ResendVerificationButtonProps {
  email: string;
}

export default function ResendVerificationButton({
  email,
}: ResendVerificationButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleResendVerification = async () => {
    setIsLoading(true);

    // for server side use
    const { error } = await authClient.sendVerificationEmail({
      email,
      callbackURL: "/email-verifed",
    });

    setIsLoading(false);
    if (error) {
      toast.error(
        error.message ||
          "An error occurred while sending the verification email",
      );
    } else {
      toast.success("Verification email sent successfully");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Button
        onClick={handleResendVerification}
        disabled={isLoading}
        variant="outline"
        className="cursor-pointer"
      >
        {isLoading ? "Sending..." : "Resend Verification Email"}
      </Button>
    </div>
  );
}
