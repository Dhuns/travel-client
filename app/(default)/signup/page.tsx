"use client";

import {
  checkUsername,
  getAppleAuthUrl,
  getGoogleAuthUrl,
  signup,
} from "@/src/shared/apis/user";
import { isValidPassword, ValidationMessages } from "@/src/shared/utils/validation";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  User,
  XCircle,
} from "lucide-react";

import { PolicyDialog } from "@/components/policy-dialog";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/src/shared/store/authStore";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  // 이미 로그인된 사용자는 홈으로 리다이렉트
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    allAgree: false,
  });

  const [policyDialogType, setPolicyDialogType] = useState<"terms" | "privacy" | null>(
    null
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "email") {
      setEmailChecked(false);
      setEmailAvailable(false);
    }
  };

  const handleCheckEmail = async () => {
    if (!formData.email) {
      alert("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    setIsCheckingEmail(true);

    try {
      await checkUsername(formData.email);
      setEmailChecked(true);
      setEmailAvailable(true);
    } catch (error) {
      console.error("Email check failed:", error);
      setEmailChecked(true);
      setEmailAvailable(false);
    } finally {
      setIsCheckingEmail(false);
    }
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailChecked || !emailAvailable) {
      alert("Please check email availability");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert(ValidationMessages.PASSWORD_MISMATCH);
      return;
    }

    if (!isValidPassword(formData.password)) {
      alert(ValidationMessages.PASSWORD_TOO_SHORT);
      return;
    }

    if (!agreements.terms || !agreements.privacy) {
      alert("Please agree to the required terms");
      return;
    }

    setIsSubmitting(true);
    try {
      await signup({
        username: formData.email,
        password: formData.password,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        termsAgreed: agreements.terms,
        privacyAgreed: agreements.privacy,
      });

      router.push(`/email-sent?email=${encodeURIComponent(formData.email)}`);
    } catch (error) {
      console.error("Signup failed:", error);
      const axiosError = error as { response?: { data?: { message?: string } } };
      alert(axiosError.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = getGoogleAuthUrl();
  };

  const handleAppleSignup = () => {
    window.location.href = getAppleAuthUrl();
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Create your account
            </h1>
            <p className="text-gray-500 text-sm">
              Join us and discover authentic Korean experiences
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 focus:ring-0 transition-colors"
                  placeholder="Full name"
                  required
                  autoComplete="name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleCheckEmail}
                  className={`w-full pl-10 pr-10 py-3 bg-white border rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 transition-colors ${
                    emailChecked
                      ? emailAvailable
                        ? "border-green-400 focus:border-green-400"
                        : "border-red-400 focus:border-red-400"
                      : "border-gray-200 focus:border-gray-400"
                  }`}
                  placeholder="Email address"
                  required
                  autoComplete="email"
                />
                {isCheckingEmail && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                  </div>
                )}
                {emailChecked && !isCheckingEmail && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {emailAvailable ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              {emailChecked && !emailAvailable && (
                <p className="mt-1.5 text-xs text-red-500">
                  This email is already registered
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 focus:ring-0 transition-colors"
                  placeholder="Password (min 8 characters)"
                  required
                  autoComplete="new-password"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </Button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-10 py-3 bg-white border rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 transition-colors ${
                    formData.confirmPassword &&
                    formData.password !== formData.confirmPassword
                      ? "border-red-400 focus:border-red-400"
                      : "border-gray-200 focus:border-gray-400"
                  }`}
                  placeholder="Confirm password"
                  required
                  autoComplete="new-password"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </Button>
              </div>
              {formData.confirmPassword &&
                formData.password !== formData.confirmPassword && (
                  <p className="mt-1.5 text-xs text-red-500">Passwords do not match</p>
                )}
            </div>

            {/* Phone (Optional) */}
            <div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 focus:ring-0 transition-colors"
                  placeholder="Phone number (optional)"
                  autoComplete="tel"
                />
              </div>
            </div>

            {/* Terms */}
            <div className="pt-2 space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreements.allAgree}
                  onChange={() => handleAgreementChange("allAgree")}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 text-tumakr-maroon focus:ring-tumakr-maroon focus:ring-offset-0"
                />
                <span className="text-sm text-gray-700">
                  I agree to all terms and conditions
                </span>
              </label>

              <div className="pl-7">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={agreements.terms}
                      onChange={() => handleAgreementChange("terms")}
                      className="w-4 h-4 rounded border-gray-300 text-tumakr-maroon focus:ring-tumakr-maroon focus:ring-offset-0"
                    />
                    <span className="text-sm text-gray-600">
                      Terms of Service
                      <span className="text-red-500 ml-0.5">*</span>
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => setPolicyDialogType("terms")}
                    className="text-xs text-gray-400 hover:text-gray-600 underline cursor-pointer"
                  >
                    View
                  </Button>
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={agreements.privacy}
                      onChange={() => handleAgreementChange("privacy")}
                      className="w-4 h-4 rounded border-gray-300 text-tumakr-maroon focus:ring-tumakr-maroon focus:ring-offset-0"
                    />
                    <span className="text-sm text-gray-600">
                      Privacy Policy
                      <span className="text-red-500 ml-0.5">*</span>
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => setPolicyDialogType("privacy")}
                    className="text-xs text-gray-400 hover:text-gray-600 underline cursor-pointer"
                  >
                    View
                  </Button>
                </label>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={
                isSubmitting ||
                !formData.name.trim() ||
                !formData.email.trim() ||
                !formData.password.trim() ||
                !formData.confirmPassword.trim() ||
                !emailChecked ||
                !emailAvailable ||
                !agreements.terms ||
                !agreements.privacy
              }
              className="w-full py-3 h-[44px] bg-tumakr-maroon hover:bg-tumakr-maroon/90 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-[#faf9f7] text-sm text-gray-400">or</span>
            </div>
          </div>

          {/* Social Signup */}
          <div className="space-y-3">
            <Button
              type="button"
              onClick={handleGoogleSignup}
              className="w-full flex items-center justify-center gap-3 py-5 px-4 bg-white border cursor-pointer border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors"
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
            </Button>
          </div>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-tumakr-maroon hover:text-tumakr-maroon/90 font-medium"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>

      {/* Policy Dialog */}
      <PolicyDialog
        type={policyDialogType}
        open={policyDialogType !== null}
        onOpenChange={(open) => !open && setPolicyDialogType(null)}
      />
    </div>
  );
}
