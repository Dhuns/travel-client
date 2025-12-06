"use client";

import { useAuthStore } from "@/src/shared/store/authStore";
import { Loader2, XCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setTokens, fetchUser } = useAuthStore();
  const [error, setError] = useState("");

  useEffect(() => {
    const handleCallback = async () => {
      // URL에서 토큰 가져오기
      const accessToken = searchParams.get("accessToken");
      const refreshToken = searchParams.get("refreshToken");
      const errorParam = searchParams.get("error");

      if (errorParam) {
        setError(decodeURIComponent(errorParam));
        setTimeout(() => router.push("/login"), 3000);
        return;
      }

      if (!accessToken || !refreshToken) {
        setError("Authentication failed. Missing tokens.");
        setTimeout(() => router.push("/login"), 3000);
        return;
      }

      // 토큰 저장
      setTokens({
        accessToken,
        refreshToken,
        accessTokenExpiresIn: 3600,
        refreshTokenExpiresIn: 604800,
      });

      // 사용자 정보 가져오기
      await fetchUser();

      // 메인 페이지로 리다이렉트
      setTimeout(() => router.push("/"), 1000);
    };

    handleCallback();
  }, [searchParams, router, setTokens, fetchUser]);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f5f3f0] to-[#faf8f5] flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
        {!error ? (
          <div className="text-center">
            <Loader2 className="w-16 h-16 mx-auto text-tumakr-maroon animate-spin mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Signing you in...</h2>
            <p className="text-gray-600">Please wait a moment</p>
          </div>
        ) : (
          <div className="text-center">
            <XCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Authentication Failed
            </h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <p className="text-sm text-gray-500">Redirecting to login page...</p>
          </div>
        )}
      </div>
    </div>
  );
}
