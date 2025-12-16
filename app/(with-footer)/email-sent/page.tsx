"use client";

import { resendVerificationEmail } from "@/src/shared/apis/user";
import { ArrowLeft, Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const COOLDOWN_SECONDS = 60;

export default function EmailSentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendError, setResendError] = useState("");
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  useEffect(() => {
    if (!email) {
      router.push("/signup");
    }
  }, [email, router]);

  useEffect(() => {
    if (cooldownRemaining > 0) {
      const timer = setInterval(() => {
        setCooldownRemaining((prev) => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [cooldownRemaining]);

  const handleResendEmail = useCallback(async () => {
    if (!email || cooldownRemaining > 0) return;

    setIsResending(true);
    setResendError("");
    setResendSuccess(false);

    try {
      await resendVerificationEmail(email);
      setResendSuccess(true);
      setCooldownRemaining(COOLDOWN_SECONDS);
      setTimeout(() => setResendSuccess(false), 5000);
    } catch (error) {
      console.error("Resend email failed:", error);
      const axiosError = error as {
        response?: {
          data?: {
            cooldown?: boolean;
            remainingSeconds?: number;
            message?:
              | string
              | { cooldown?: boolean; remainingSeconds?: number; message?: string };
          };
        };
      };
      const responseData = axiosError.response?.data;
      const messageObj =
        typeof responseData?.message === "object" ? responseData.message : null;

      if (responseData?.cooldown || messageObj?.cooldown) {
        const remaining =
          responseData?.remainingSeconds ||
          messageObj?.remainingSeconds ||
          COOLDOWN_SECONDS;
        setCooldownRemaining(remaining);
        setResendError(`Please wait ${remaining} seconds`);
      } else {
        let errorMsg = responseData?.message;
        if (typeof errorMsg === "object") {
          errorMsg = errorMsg.message || JSON.stringify(errorMsg);
        }
        setResendError(errorMsg || "Failed to resend. Please try again.");
      }
    } finally {
      setIsResending(false);
    }
  }, [email, cooldownRemaining]);

  if (!email) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center px-4">
      <div className="max-w-sm w-full">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-tumakr-maroon/10 rounded-full flex items-center justify-center">
            <Mail className="w-8 h-8 text-tumakr-maroon" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Check your inbox</h1>
          <p className="text-sm text-gray-500 mb-1">We sent a verification link to</p>
          <p className="text-sm font-medium text-gray-900 mb-6">{email}</p>
        </div>

        {/* Tips */}
        <div className="bg-white rounded-lg border border-gray-100 p-4 mb-6">
          <p className="text-xs text-gray-500 leading-relaxed">
            Click the link in the email to verify your account. If you don't see it, check
            your spam folder. The link expires in 24 hours.
          </p>
        </div>

        {/* Messages */}
        {resendSuccess && (
          <div className="mb-4 p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-700 text-center">Email sent successfully</p>
          </div>
        )}

        {resendError && (
          <div className="mb-4 p-3 bg-red-50 rounded-lg">
            <p className="text-sm text-red-600 text-center">{resendError}</p>
          </div>
        )}

        {/* Resend Button */}
        <button
          onClick={handleResendEmail}
          disabled={isResending || resendSuccess || cooldownRemaining > 0}
          className="w-full py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isResending
            ? "Sending..."
            : cooldownRemaining > 0
            ? `Resend in ${cooldownRemaining}s`
            : "Resend email"}
        </button>

        {/* Back Link */}
        <button
          onClick={() => router.push("/login")}
          className="w-full mt-4 flex items-center justify-center gap-2 py-3 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to sign in
        </button>
      </div>
    </div>
  );
}
