"use client";

import { PrivacyContent } from "@/components/privacy-content";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PrivacyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f5f3f0] to-[#faf8f5] pt-32 pb-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* 헤더 */}
          <div className="bg-linear-to-r from-tumakr-maroon to-tumakr-maroon/90 text-white p-8">
            <Button
              onClick={() => router.back()}
              variant="ghost"
              className="text-white hover:bg-white/10 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
            <p className="text-[#f5f3f0] mt-2">Last updated: November 2025</p>
          </div>

          {/* 내용 */}
          <div className="p-8">
            <PrivacyContent />
          </div>
        </div>
      </div>
    </div>
  );
}
