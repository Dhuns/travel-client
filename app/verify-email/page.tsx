"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyEmail } from "@/src/shared/apis/user";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        const result = await verifyEmail(token);
        setSuccess(true);
        setError("");

        // 3초 후 자동으로 로그인 페이지로 이동
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
    <div className="min-h-screen bg-gradient-to-br from-[#f5f3f0] to-[#faf8f5] flex items-center justify-center pt-32 pb-16">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
        {loading && (
          <div className="text-center">
            <Loader2 className="w-16 h-16 mx-auto text-[#651d2a] animate-spin mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Verifying your email...</h2>
            <p className="text-gray-600">Please wait a moment</p>
          </div>
        )}

        {!loading && success && (
          <div className="text-center">
            <CheckCircle2 className="w-16 h-16 mx-auto text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Email Verified!</h2>
            <p className="text-gray-600 mb-2">
              Your email has been successfully verified. You can now sign in to your account.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Redirecting to login page in 3 seconds...
            </p>
            <Button
              onClick={() => router.push("/login")}
              className="w-full bg-gradient-to-r from-[#651d2a] to-[#7a2433] hover:from-[#7a2433] hover:to-[#8b2a3d] text-white"
            >
              Go to Login Now
            </Button>
          </div>
        )}

        {!loading && error && (
          <div className="text-center">
            <XCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Verification Failed</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="space-y-2">
              <Button
                onClick={() => router.push("/login")}
                className="w-full bg-gradient-to-r from-[#651d2a] to-[#7a2433] hover:from-[#7a2433] hover:to-[#8b2a3d] text-white"
              >
                Go to Login
              </Button>
              <Button
                onClick={() => router.push("/signup")}
                variant="outline"
                className="w-full"
              >
                Back to Sign Up
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
