"use client";

import {
  Calendar,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react";
import {
  checkUsername,
  getAppleAuthUrl,
  getGoogleAuthUrl,
  signup,
} from "@/src/shared/apis/user";

import { Button } from "@/components/ui/button";
import type React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * 회원가입 페이지 컴포넌트
 *
 * 주요 기능:
 * - 필수 입력: 이름, 이메일(중복확인), 비밀번호, 비밀번호 확인
 * - 선택 입력: 전화번호, 생년월일, 성별
 * - 필수 동의: 이용약관, 개인정보처리방침
 * - 소셜 회원가입: 구글, 애플
 *
 * 백엔드 연동 가이드:
 * - 이메일 중복확인 API: GET /api/auth/check-email?email={email}
 * - 회원가입 API: POST /api/auth/signup { name, email, password, phone, birthdate, gender }
 * - 구글 OAuth: GET /api/auth/google/signup
 * - 애플 OAuth: GET /api/auth/apple/signup
 */
export default function SignupPage() {
  const router = useRouter();

  // 폼 데이터 상태 관리
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    birthdate: "",
  });

  // UI 상태 관리
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState(false);

  // 약관 동의 상태 관리
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    allAgree: false,
  });

  // 입력 필드 변경 핸들러
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // 이메일이 변경되면 중복확인 상태 초기화
    if (e.target.name === "email") {
      setEmailChecked(false);
      setEmailAvailable(false);
    }
  };

  // 이메일 중복확인 핸들러
  const handleCheckEmail = async () => {
    if (!formData.email) {
      alert("Please enter your email address");
      return;
    }

    // 백엔드 이메일(username) 중복확인 API 호출
    try {
      await checkUsername(formData.email);
      setEmailChecked(true);
      setEmailAvailable(true);
      alert("This email is available!");
    } catch (error: any) {
      console.error("Email check failed:", error);
      setEmailChecked(true);
      setEmailAvailable(false);
      alert(error.response?.data?.message || "This email is already in use");
    }
  };

  // 약관 동의 체크박스 핸들러
  const handleAgreementChange = (type: keyof typeof agreements) => {
    if (type === "allAgree") {
      const newValue = !agreements.allAgree;
      setAgreements({
        terms: newValue,
        privacy: newValue,
        allAgree: newValue,
      });
    } else {
      const newAgreements = {
        ...agreements,
        [type]: !agreements[type],
      };
      newAgreements.allAgree = newAgreements.terms && newAgreements.privacy;
      setAgreements(newAgreements);
    }
  };

  // 회원가입 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    if (!emailChecked || !emailAvailable) {
      alert("Please check email availability");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    if (!agreements.terms || !agreements.privacy) {
      alert("Please agree to the required terms");
      return;
    }

    // 백엔드 회원가입 API 호출
    try {
      await signup({
        username: formData.email, // email을 username으로 사용
        password: formData.password,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        birthDate: formData.birthdate || undefined,
        termsAgreed: agreements.terms,
        privacyAgreed: agreements.privacy,
      });

      // 회원가입 성공 시 이메일 인증 대기 페이지로 이동
      router.push(`/email-sent?email=${encodeURIComponent(formData.email)}`);
    } catch (error: any) {
      console.error("Signup failed:", error);
      alert(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  // 구글 회원가입 핸들러
  const handleGoogleSignup = () => {
    window.location.href = getGoogleAuthUrl();
  };

  // 애플 회원가입 핸들러
  const handleAppleSignup = () => {
    window.location.href = getAppleAuthUrl();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f3f0] to-[#faf8f5] pt-32 pb-16">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* 헤더 섹션 */}
          <div className="bg-gradient-to-r from-[#651d2a] to-[#7a2433] text-white p-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Join OneDayKorea</h1>
            <p className="text-[#f5f3f0]">
              Create your account and start exploring Korea
            </p>
          </div>

          {/* 회원가입 폼 */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 이름 입력 (필수) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#651d2a] [&::placeholder]:text-gray-400 [&::placeholder]:opacity-40 transition-all duration-300 text-gray-900 bg-white"
                    style={{
                      WebkitBoxShadow: "0 0 0 1000px white inset",
                      WebkitTextFillColor: "#111827",
                    }}
                    autoComplete="name"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              {/* 이메일 입력 및 중복확인 (필수) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#651d2a] [&::placeholder]:text-gray-400 [&::placeholder]:opacity-40 transition-all duration-300 text-gray-900 bg-white"
                      style={{
                        WebkitBoxShadow: "0 0 0 1000px white inset",
                        WebkitTextFillColor: "#111827",
                      }}
                      autoComplete="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={handleCheckEmail}
                    className="px-6 bg-slate-600 hover:bg-slate-700 text-white whitespace-nowrap"
                  >
                    Check
                  </Button>
                </div>
                {emailChecked && (
                  <p
                    className={`mt-2 text-sm flex items-center ${
                      emailAvailable ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    {emailAvailable
                      ? "This email is available"
                      : "This email is already in use"}
                  </p>
                )}
              </div>

              {/* 비밀번호 입력 (필수) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#651d2a] [&::placeholder]:text-gray-400 [&::placeholder]:opacity-40 transition-all duration-300 text-gray-900 bg-white"
                    style={{
                      WebkitBoxShadow: "0 0 0 1000px white inset",
                      WebkitTextFillColor: "#111827",
                    }}
                    autoComplete="new-password"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* 비밀번호 확인 (필수) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#651d2a] [&::placeholder]:text-gray-400 [&::placeholder]:opacity-40 transition-all duration-300 text-gray-900 bg-white"
                    style={{
                      WebkitBoxShadow: "0 0 0 1000px white inset",
                      WebkitTextFillColor: "#111827",
                    }}
                    autoComplete="new-password"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {formData.confirmPassword &&
                  formData.password !== formData.confirmPassword && (
                    <p className="mt-2 text-sm text-red-600">
                      Passwords do not match
                    </p>
                  )}
              </div>

              {/* 전화번호 입력 (선택) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number{" "}
                  <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#651d2a] [&::placeholder]:text-gray-400 [&::placeholder]:opacity-40 transition-all duration-300 text-gray-900 bg-white"
                    style={{
                      WebkitBoxShadow: "0 0 0 1000px white inset",
                      WebkitTextFillColor: "#111827",
                    }}
                    autoComplete="tel"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* 생년월일 입력 (선택) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth{" "}
                  <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#651d2a] [&::placeholder]:text-gray-400 [&::placeholder]:opacity-40 transition-all duration-300 text-gray-900 bg-white"
                    style={{
                      WebkitBoxShadow: "0 0 0 1000px white inset",
                      WebkitTextFillColor: "#111827",
                    }}
                  />
                </div>
              </div>

              {/* 약관 동의 섹션 */}
              <div className="border-t pt-6 space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="allAgree"
                    checked={agreements.allAgree}
                    onChange={() => handleAgreementChange("allAgree")}
                    className="appearance-none w-5 h-5 border-2 border-gray-300 rounded bg-white focus:ring-2 focus:ring-[#651d2a] focus:ring-offset-0 cursor-pointer flex items-center justify-center checked:bg-[#651d2a] checked:border-[#651d2a] checked:after:content-['✓'] checked:after:text-white checked:after:text-sm"
                  />
                  <label
                    htmlFor="allAgree"
                    className="ml-3 text-sm font-medium text-gray-900 cursor-pointer"
                  >
                    Agree to all terms
                  </label>
                </div>

                <div className="ml-8 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={agreements.terms}
                        onChange={() => handleAgreementChange("terms")}
                        className="appearance-none w-4 h-4 border-2 border-gray-300 rounded bg-white focus:ring-2 focus:ring-[#651d2a] focus:ring-offset-0 cursor-pointer flex items-center justify-center checked:bg-[#651d2a] checked:border-[#651d2a] checked:after:content-['✓'] checked:after:text-white checked:after:text-xs"
                      />
                      <label
                        htmlFor="terms"
                        className="ml-2 text-sm text-gray-700 cursor-pointer"
                      >
                        Terms of Service <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <a
                      href="/terms"
                      className="text-sm text-[#651d2a] hover:text-[#7a2433]"
                    >
                      View
                    </a>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="privacy"
                        checked={agreements.privacy}
                        onChange={() => handleAgreementChange("privacy")}
                        className="appearance-none w-4 h-4 border-2 border-gray-300 rounded bg-white focus:ring-2 focus:ring-[#651d2a] focus:ring-offset-0 cursor-pointer flex items-center justify-center checked:bg-[#651d2a] checked:border-[#651d2a] checked:after:content-['✓'] checked:after:text-white checked:after:text-xs"
                      />
                      <label
                        htmlFor="privacy"
                        className="ml-2 text-sm text-gray-700 cursor-pointer"
                      >
                        Privacy Policy <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <a
                      href="/privacy"
                      className="text-sm text-[#651d2a] hover:text-[#7a2433]"
                    >
                      View
                    </a>
                  </div>
                </div>
              </div>

              {/* 회원가입 버튼 */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#651d2a] to-[#7a2433] hover:from-[#7a2433] hover:to-[#8b2a3d] text-white py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Create Account
              </Button>
            </form>

            {/* 로그인 링크 */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-[#651d2a] hover:text-[#7a2433] font-medium transition-colors duration-300"
                >
                  Sign In
                </a>
              </p>
            </div>

            {/* 소셜 회원가입 구분선 */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    Or sign up with
                  </span>
                </div>
              </div>

              {/* 소셜 회원가입 버튼들 */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                {/* 구글 회원가입 버튼 */}
                <button
                  type="button"
                  onClick={handleGoogleSignup}
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

                {/* 애플 회원가입 버튼 */}
                <button
                  type="button"
                  onClick={handleAppleSignup}
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
  );
}
