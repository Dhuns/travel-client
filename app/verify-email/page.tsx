"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyEmail } from "@/src/shared/apis/user";
import { CheckCircle2, XCircle } from "lucide-react";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setError("Invalid verification link");
        setLoading(false);
        return;
      }

      try {
        await verifyEmail(token);
        setSuccess(true);
        setError("");

        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } catch (err: any) {
        console.error("Email verification failed:", err);
        setError(err.response?.data?.message || "Verification failed. The link may have expired.");
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token, router]);

  return (
    <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center px-4">
      <div className="max-w-sm w-full text-center">
        {loading && (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 border-2 border-gray-200 border-t-[#651d2a] rounded-full animate-spin" />
            </div>
            <h1 className="text-lg font-medium text-gray-900 mb-2">
              Verifying your email
            </h1>
            <p className="text-sm text-gray-500">
              Please wait...
            </p>
          </>
        )}

        {!loading && success && (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <h1 className="text-lg font-medium text-gray-900 mb-2">
              Email verified
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              Your account is now active. Redirecting to sign in...
            </p>
            <button
              onClick={() => router.push("/login")}
              className="w-full py-3 text-sm font-medium text-white bg-[#651d2a] rounded-lg hover:bg-[#7a2433] transition-colors"
            >
              Continue to sign in
            </button>
          </>
        )}

        {!loading && error && (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
                <XCircle className="w-8 h-8 text-red-500" />
              </div>
            </div>
            <h1 className="text-lg font-medium text-gray-900 mb-2">
              Verification failed
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              {error}
            </p>
            <div className="space-y-3">
              <button
                onClick={() => router.push("/login")}
                className="w-full py-3 text-sm font-medium text-white bg-[#651d2a] rounded-lg hover:bg-[#7a2433] transition-colors"
              >
                Go to sign in
              </button>
              <button
                onClick={() => router.push("/signup")}
                className="w-full py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Create new account
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
