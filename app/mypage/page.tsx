"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/src/shared/store/authStore";
import { ChevronRight, LogOut, Mail, Phone, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout, fetchUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const loadUser = async () => {
      try {
        await fetchUser();
      } catch (error) {
        console.error("Failed to load user:", error);
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [isAuthenticated, fetchUser, router]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-[#fafafa] pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-gray-600 mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] pt-24 pb-16">
      <div className="max-w-lg mx-auto px-5">
        {/* Profile Header */}
        <div className="text-center mb-8">
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border border-gray-200"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-gray-400" />
            </div>
          )}
          <h1 className="text-xl font-semibold text-gray-900">{user.name}</h1>
          <p className="text-sm text-gray-500 mt-1">{user.email}</p>
          {user.provider !== "local" && (
            <span className="inline-block mt-2 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
              {user.provider === "google" ? "Google Account" : "Apple Account"}
            </span>
          )}
        </div>

        {/* Profile Info Card */}
        <div className="bg-white rounded-xl border border-gray-200 mb-4">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-medium text-gray-900">Profile Information</h2>
          </div>

          <div className="divide-y divide-gray-100">
            <div className="px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Name</span>
              </div>
              <span className="text-sm text-gray-900">{user.name}</span>
            </div>

            <div className="px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Email</span>
              </div>
              <span className="text-sm text-gray-900">{user.email || "-"}</span>
            </div>

            <div className="px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Phone</span>
              </div>
              <span className="text-sm text-gray-900">{user.phone || "-"}</span>
            </div>
          </div>
        </div>

        {/* Action Links */}
        <div className="bg-white rounded-xl border border-gray-200 mb-4">
          <Link
            href="/mypage/edit"
            className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
          >
            <span className="text-sm text-gray-900">Edit Profile</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </Link>

          {user.provider === "local" && (
            <Link
              href="/mypage/change-password"
              className="flex items-center justify-between px-5 py-4 border-t border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm text-gray-900">Change Password</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
          )}
        </div>

        {/* Account Info */}
        <div className="bg-white rounded-xl border border-gray-200 mb-4">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-medium text-gray-900">Account</h2>
          </div>

          <div className="divide-y divide-gray-100">
            <div className="px-5 py-4 flex items-center justify-between">
              <span className="text-sm text-gray-600">Account Type</span>
              <span className="text-sm text-gray-900">
                {user.provider === "google"
                  ? "Google"
                  : user.provider === "apple"
                  ? "Apple"
                  : "Email"}
              </span>
            </div>

            <div className="px-5 py-4 flex items-center justify-between">
              <span className="text-sm text-gray-600">Member Grade</span>
              <span className="text-sm text-gray-900">{user.userGrade || "일반"}</span>
            </div>

            <div className="px-5 py-4 flex items-center justify-between">
              <span className="text-sm text-gray-600">Email Verified</span>
              <span
                className={`text-sm ${
                  user.emailVerified || user.provider !== "local"
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
              >
                {user.emailVerified || user.provider !== "local"
                  ? "Verified"
                  : "Not Verified"}
              </span>
            </div>
          </div>
        </div>

        {/* Sign Out */}
        <Button
          onClick={handleLogout}
          className="w-full h-13 bg-white rounded-xl border border-gray-200 px-5 py-4 flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Sign Out</span>
        </Button>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Member since {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
