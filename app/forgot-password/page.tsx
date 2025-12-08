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
      <div className="min-h-screen bg-linear-to-br from-[#f5f3f0] to-[#faf8f5] flex items-center justify-center pt-32 pb-16">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Check Your Email</h2>
            <p className="text-gray-600 mb-4">We've sent a password reset link to</p>
            <p className="text-tumakr-maroon font-semibold mb-6 break-all">{email}</p>
            <p className="text-sm text-gray-500 mb-6">
              Click the link in the email to reset your password. The link will expire in
              1 hour.
            </p>
            <Button
              onClick={() => router.push("/login")}
              className="w-full bg-linear-to-r from-tumakr-maroon to-tumakr-maroon/90 hover:from-tumakr-maroon/90 hover:to-tumakr-maroon text-white"
            >
              Back to Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f5f3f0] to-[#faf8f5] pt-32 pb-16">
      <div className="container mx-auto px-6">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* 헤더 */}
          <div className="bg-linear-to-r from-tumakr-maroon to-tumakr-maroon/90 text-white p-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Forgot Password?</h1>
            <p className="text-[#f5f3f0]">Enter your email to reset your password</p>
          </div>

          {/* 폼 */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 에러 메시지 */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  <p>{error}</p>
                </div>
              )}

              {/* 이메일 입력 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-tumakr-maroon transition-all duration-300 text-gray-900 placeholder:text-gray-400 bg-white"
                    autoComplete="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* 제출 버튼 */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-linear-to-r py-5 from-tumakr-maroon to-tumakr-maroon/90 hover:from-tumakr-maroon/90 hover:to-tumakr-maroon text-white rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>

            {/* 돌아가기 링크 */}
            <div className="mt-6 text-center">
              <button
                onClick={() => router.push("/login")}
                className="text-tumakr-maroon hover:text-tumakr-maroon/90 font-medium transition-colors duration-300 inline-flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
