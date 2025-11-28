"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle } from "lucide-react";

export default function EmailVerifiedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const success = searchParams.get("success") === "true";
  const error = searchParams.get("error");
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (success) {
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
    <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center px-4">
      <div className="max-w-sm w-full text-center">
        {success ? (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <h1 className="text-lg font-medium text-gray-900 mb-2">
              You're all set
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              Redirecting to sign in in {countdown}s...
            </p>
            <button
              onClick={() => router.push("/login")}
              className="w-full py-3 text-sm font-medium text-white bg-[#651d2a] rounded-lg hover:bg-[#7a2433] transition-colors"
            >
              Continue to sign in
            </button>
          </>
        ) : (
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
              {error || "The link may have expired or is invalid."}
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
