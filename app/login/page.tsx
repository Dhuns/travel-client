"use client";

import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/shared/store/authStore";
import { getGoogleAuthUrl, getAppleAuthUrl } from "@/src/shared/apis/user";

/**
 * 로그인 페이지 컴포넌트
 *
 * 주요 기능:
 * - 이메일/비밀번호 로그인
 * - 구글 소셜 로그인
 * - 애플 소셜 로그인
 * - 비밀번호 표시/숨김 토글
 * - 비밀번호 찾기 링크
 * - 회원가입 링크
 *
 * 백엔드 연동 가이드:
 * - 로그인 API: POST /api/auth/login { email, password }
 * - 구글 OAuth: GET /api/auth/google
 * - 애플 OAuth: GET /api/auth/apple
 * - 비밀번호 찾기: GET /forgot-password
 */
export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();

  // 상태 관리
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // 입력 필드 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 로그인 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(formData.username, formData.password);
      router.push("/"); // 로그인 성공 시 메인 페이지로 이동
    } catch (error: any) {
      console.error('Login failed:', error);
      setError(error.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  // 구글 로그인 핸들러
  const handleGoogleLogin = () => {
    window.location.href = getGoogleAuthUrl();
  };

  // 애플 로그인 핸들러
  const handleAppleLogin = () => {
    window.location.href = getAppleAuthUrl();
  };

  return (
    <>
      {/* 메인 컨텐츠 */}
      <div className="min-h-screen bg-gradient-to-br from-[#f5f3f0] to-[#faf8f5] pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* 헤더 섹션 */}
            <div className="bg-gradient-to-r from-[#651d2a] to-[#7a2433] text-white p-8 text-center">
              <h1 className="text-3xl font-bold mb-2">Welcome !</h1>
              <p className="text-[#f5f3f0]">
                Sign in to continue your Korean adventure
              </p>
            </div>

            {/* 로그인 폼 */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 에러 메시지 */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                {/* 사용자명 입력 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username or Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#651d2a] focus:border-transparent transition-all duration-300"
                      autoComplete="username"
                      placeholder="Enter your username or email"
                      required
                    />
                  </div>
                </div>

                {/* 비밀번호 입력 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#651d2a] focus:border-transparent transition-all duration-300"
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      required
                    />
                    {/* 비밀번호 표시/숨김 토글 버튼 */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* 비밀번호 찾기 링크 */}
                <div className="text-right">
                  <a
                    href="/forgot-password"
                    className="text-sm text-[#651d2a] hover:text-[#7a2433] transition-colors duration-300"
                  >
                    Forgot your password?
                  </a>
                </div>

                {/* 로그인 버튼 */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#651d2a] to-[#7a2433] hover:from-[#7a2433] hover:to-[#8b2a3d] text-white py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              {/* 회원가입 링크 */}
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <a
                    href="/signup"
                    className="text-[#651d2a] hover:text-[#7a2433] font-medium transition-colors duration-300"
                  >
                    Sign Up
                  </a>
                </p>
              </div>

              {/* 소셜 로그인 구분선 */}
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* 소셜 로그인 버튼들 */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {/* 구글 로그인 버튼 */}
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300 hover:shadow-md"
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
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
                      />
                    </svg>
                    <span className="ml-2">Google</span>
                  </button>

                  {/* 애플 로그인 버튼 */}
                  <button
                    type="button"
                    onClick={handleAppleLogin}
                    className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-black text-sm font-medium text-white hover:bg-gray-900 transition-all duration-300 hover:shadow-md"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                    </svg>
                    <span className="ml-2">Apple</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
