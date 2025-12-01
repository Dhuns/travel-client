"use client";

import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { getAppleAuthUrl, getGoogleAuthUrl } from "@/src/shared/apis/user";

import type React from "react";
import { useAuthStore } from "@/src/shared/store/authStore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, isAuthenticated } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // 이미 로그인된 사용자는 홈으로 리다이렉트
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(formData.username, formData.password);
      // replace를 사용하여 뒤로가기 시 로그인 페이지로 돌아오지 않도록 함
      router.replace("/");
    } catch (error: any) {
      console.error("Login failed:", error);

      const responseData = error.response?.data;
      const messageData = Array.isArray(responseData?.message)
        ? responseData.message[0]
        : responseData?.message;

      if (responseData?.requiresVerification ||
          messageData?.requiresVerification ||
          (typeof messageData === 'string' &&
           messageData.toLowerCase().includes("email verification required"))) {
        const email = responseData?.email ||
                     messageData?.email ||
                     formData.username;
        router.push(`/email-sent?email=${encodeURIComponent(email)}`);
        return;
      }

      let errorMessage = responseData?.message;

      // 배열인 경우 첫 번째 요소 추출
      if (Array.isArray(errorMessage)) {
        errorMessage = errorMessage[0];
      }
      // 객체인 경우 message 속성 추출
      if (typeof errorMessage === 'object' && errorMessage !== null) {
        errorMessage = errorMessage.message || "Login failed";
      }
      // 문자열이 아니거나 비어있으면 기본 메시지
      if (!errorMessage || typeof errorMessage !== 'string') {
        errorMessage = "Login failed. Please check your credentials.";
      }

      // 사용자 친화적인 메시지로 변환
      if (errorMessage.toLowerCase().includes("invalid username or password")) {
        errorMessage = "Incorrect email or password. Please try again.";
      }

      setError(errorMessage);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = getGoogleAuthUrl();
  };

  const handleAppleLogin = () => {
    window.location.href = getAppleAuthUrl();
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center px-4">
      <div className="max-w-sm w-full">
        <div className="text-center mb-8">
          <h1 className="text-xl font-semibold text-gray-900 mb-1">Sign in</h1>
          <p className="text-sm text-gray-500">Welcome back</p>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 rounded-lg">
              <p className="text-sm text-red-600 text-center">{error}</p>
            </div>
          )}

          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#651d2a] transition-colors"
                style={{
                  WebkitBoxShadow: "0 0 0 1000px white inset",
                  WebkitTextFillColor: "#111827",
                }}
                autoComplete="username"
                placeholder="Email"
                required
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#651d2a] transition-colors"
                style={{
                  WebkitBoxShadow: "0 0 0 1000px white inset",
                  WebkitTextFillColor: "#111827",
                }}
                autoComplete="current-password"
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="text-right">
            <a
              href="/forgot-password"
              className="text-xs text-gray-500 hover:text-[#651d2a] transition-colors"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 text-sm font-medium text-white bg-[#651d2a] rounded-lg hover:bg-[#7a2433] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 bg-[#faf9f7] text-xs text-gray-400">or</span>
          </div>
        </div>

        {/* Social login buttons */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-3 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <button
            type="button"
            onClick={handleAppleLogin}
            className="w-full flex items-center justify-center gap-3 py-3 bg-black rounded-lg text-sm font-medium text-white hover:bg-gray-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            Continue with Apple
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <a href="/signup" className="text-[#651d2a] font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
