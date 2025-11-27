"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, CheckCircle2, RefreshCw, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { resendVerificationEmail } from "@/src/shared/apis/user";

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

  // 쿨다운 타이머
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
    } catch (error: any) {
      console.error("Resend email failed:", error);
      const responseData = error.response?.data;

      // 쿨다운 에러 처리
      if (responseData?.cooldown || responseData?.message?.cooldown) {
        const remaining = responseData?.remainingSeconds || responseData?.message?.remainingSeconds || COOLDOWN_SECONDS;
        setCooldownRemaining(remaining);
        setResendError(`Please wait ${remaining} seconds before requesting another email`);
      } else {
        let errorMsg = responseData?.message;
        if (typeof errorMsg === 'object') {
          errorMsg = errorMsg.message || JSON.stringify(errorMsg);
        }
        setResendError(errorMsg || "Failed to resend email. Please try again.");
      }
    } finally {
      setIsResending(false);
    }
  }, [email, cooldownRemaining]);

  if (!email) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f3f0] to-[#faf8f5] flex items-center justify-center pt-32 pb-16">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center">
          {/* Icon */}
          <div className="mx-auto w-16 h-16 bg-[#651d2a] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-8 h-8 text-[#651d2a]" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Check Your Email
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-6">
            We've sent a verification email to
          </p>
          <p className="text-[#651d2a] font-semibold mb-6 break-all">
            {email}
          </p>

          {/* Instructions */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <div className="flex items-start space-x-3 mb-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">
                Click the verification link in the email to activate your account
              </p>
            </div>
            <div className="flex items-start space-x-3 mb-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">
                The verification link is valid for 24 hours
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">
                Check your spam folder if you don't see the email
              </p>
            </div>
          </div>

          {/* Success Message */}
          {resendSuccess && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-700">
                Verification email has been resent successfully!
              </p>
            </div>
          )}

          {/* Error Message */}
          {resendError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{resendError}</p>
            </div>
          )}

          {/* Resend Button */}
          <Button
            onClick={handleResendEmail}
            disabled={isResending || resendSuccess || cooldownRemaining > 0}
            variant="outline"
            className="w-full mb-4"
          >
            {isResending ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : cooldownRemaining > 0 ? (
              <>
                <Clock className="w-4 h-4 mr-2" />
                Resend available in {cooldownRemaining}s
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Resend Verification Email
              </>
            )}
          </Button>

          {/* Login Link */}
          <div className="text-sm text-gray-600">
            Already verified?{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-[#651d2a] hover:text-[#7a2433] font-medium transition-colors duration-300"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
