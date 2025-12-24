"use client";

import { Button } from "@/components/ui/button";
import { resetPassword } from "@/src/shared/apis/user";
import { isValidPassword, ValidationMessages } from "@/src/shared/utils/validation";
import { CheckCircle2, Eye, EyeOff, Lock } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * 비밀번호 재설정 페이지
 *
 * 주요 기능:
 * - 토큰 검증
 * - 새 비밀번호 입력
 * - 비밀번호 재설정
 */
export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing reset token");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 유효성 검사
    if (!isValidPassword(password)) {
      setError(ValidationMessages.PASSWORD_TOO_SHORT);
      return;
    }

    if (password !== confirmPassword) {
      setError(ValidationMessages.PASSWORD_MISMATCH);
      return;
    }

    if (!token) {
      setError("Invalid reset token");
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword(token, password);
      setIsSuccess(true);
    } catch (error) {
      console.error("Password reset failed:", error);
      const axiosError = error as { response?: { data?: { message?: string } } };
      setError(
        axiosError.response?.data?.message ||
          "Failed to reset password. The link may have expired."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="max-w-sm w-full">
          <div className="text-center">
            <CheckCircle2 className="w-16 h-16 mx-auto text-green-500 mb-6" />
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Password Reset Successful!
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              Your password has been successfully reset. You can now sign in with your new
              password.
            </p>
            <Button
              onClick={() => router.push("/login")}
              className="w-full py-5 text-sm font-medium text-white bg-tumakr-maroon rounded-lg hover:bg-tumakr-maroon/90 transition-colors"
            >
              Go to Login
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
          <h1 className="text-xl font-semibold text-gray-900 mb-1">Reset Password</h1>
          <p className="text-sm text-gray-500">Enter your new password</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Error message */}
          {error && (
            <div className="p-3 bg-red-50 rounded-lg">
              <p className="text-sm text-red-600 text-center">{error}</p>
            </div>
          )}

          {/* New password input */}
          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-tumakr-maroon transition-colors"
                autoComplete="new-password"
                placeholder="New password (min 8 characters)"
                required
                minLength={8}
              />
              <Button
                variant="ghost"
                type="button"
                size="icon"
                onClick={() => setShowPassword(!showPassword)}
                className="w-8 h-8 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </Button>
            </div>
            <p className="mt-1.5 text-xs text-gray-500">
              Password must be at least 8 characters long
            </p>
          </div>

          {/* Confirm password */}
          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-tumakr-maroon transition-colors"
                autoComplete="new-password"
                placeholder="Confirm new password"
                required
              />
              <Button
                variant="ghost"
                type="button"
                size="icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="w-8 h-8 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </Button>
            </div>
            {confirmPassword && password !== confirmPassword && (
              <p className="mt-1.5 text-xs text-red-600">Passwords do not match</p>
            )}
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            disabled={isLoading || !token}
            className="w-full py-5 text-sm font-medium text-white bg-tumakr-maroon rounded-lg hover:bg-tumakr-maroon/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Remember your password?{" "}
          <a href="/login" className="text-tumakr-maroon font-medium hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
