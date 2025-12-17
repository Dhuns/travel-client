"use client";

import { Button } from "@/components/ui/button";
import { requestPasswordReset } from "@/src/shared/apis/user";
import { ArrowLeft, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * 비밀번호 찾기 페이지
 *
 * 주요 기능:
 * - 이메일 입력
 * - 비밀번호 재설정 이메일 발송
 */
export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      await requestPasswordReset(email);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Password reset request failed:", error);
      const axiosError = error as { response?: { data?: { message?: string } } };
      setError(
        axiosError.response?.data?.message ||
          "Failed to send reset email. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center px-4">
        <div className="max-w-sm w-full">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Check Your Email</h2>
            <p className="text-sm text-gray-500 mb-4">
              We've sent a password reset link to
            </p>
            <p className="text-tumakr-maroon font-medium mb-6 break-all">{email}</p>
            <p className="text-sm text-gray-500 mb-6">
              Click the link in the email to reset your password. The link will expire in
              1 hour.
            </p>
            <Button
              onClick={() => router.push("/login")}
              className="w-full py-5 text-sm font-medium text-white bg-tumakr-maroon rounded-lg hover:bg-tumakr-maroon/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Back to Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center px-4">
      <div className="max-w-sm w-full">
        <div className="text-center mb-8">
          <h1 className="text-xl font-semibold text-gray-900 mb-1">Forgot Password?</h1>
          <p className="text-sm text-gray-500">Enter your email to reset your password</p>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 에러 메시지 */}
          {error && (
            <div className="p-3 bg-red-50 rounded-lg">
              <p className="text-sm text-red-600 text-center">{error}</p>
            </div>
          )}

          {/* 이메일 입력 */}
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-tumakr-maroon transition-colors"
                autoComplete="email"
                placeholder="Email"
                required
              />
            </div>
          </div>

          {/* 제출 버튼 */}
          <Button
            type="submit"
            disabled={isLoading || !email.trim()}
            className="w-full py-5 text-sm font-medium text-white bg-tumakr-maroon rounded-lg hover:bg-tumakr-maroon/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>

        {/* 돌아가기 링크 */}
        <div className="mt-6 text-center">
          <a
            href="/login"
            className="text-xs text-gray-500 hover:text-tumakr-maroon transition-colors inline-flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
