"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmailVerifiedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const success = searchParams.get("success") === "true";
  const error = searchParams.get("error");
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (success) {
      // 성공 시 3초 카운트다운 후 로그인 페이지로 이동
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            router.push("/login");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [success, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f3f0] to-[#faf8f5] flex items-center justify-center pt-32 pb-16">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
        {success ? (
          <div className="text-center">
            <CheckCircle2 className="w-16 h-16 mx-auto text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Registration Complete!
            </h2>
            <p className="text-gray-600 mb-2">
              Your email has been successfully verified. Welcome to OneDayKorea!
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Redirecting to login page in {countdown} seconds...
            </p>
            <Button
              onClick={() => router.push("/login")}
              className="w-full bg-gradient-to-r from-[#651d2a] to-[#7a2433] hover:from-[#7a2433] hover:to-[#8b2a3d] text-white"
            >
              Go to Login Now
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <XCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Verification Failed
            </h2>
            <p className="text-gray-600 mb-6">
              {error || "The verification link may have expired or is invalid."}
            </p>
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
