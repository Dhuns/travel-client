"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function TermsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f3f0] to-[#faf8f5] pt-32 pb-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* 헤더 */}
          <div className="bg-gradient-to-r from-[#651d2a] to-[#7a2433] text-white p-8">
            <Button
              onClick={() => router.back()}
              variant="ghost"
              className="text-white hover:bg-white/10 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold">Terms of Service</h1>
            <p className="text-[#f5f3f0] mt-2">Last updated: November 2025</p>
          </div>

          {/* 내용 */}
          <div className="p-8 prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using OneDayKorea's services, you agree to be bound by these Terms of Service
                and all applicable laws and regulations. If you do not agree with any of these terms, you are
                prohibited from using or accessing this site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use License</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Permission is granted to temporarily access the materials on OneDayKorea's website for personal,
                non-commercial transitory viewing only. This is the grant of a license, not a transfer of title,
                and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on OneDayKorea's website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Service Description</h2>
              <p className="text-gray-700 leading-relaxed">
                OneDayKorea provides travel planning and booking services for tours and activities in South Korea.
                We act as an intermediary between travelers and service providers. All bookings are subject to
                availability and confirmation.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Accounts</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                When you create an account with us, you must provide accurate, complete, and current information.
                Failure to do so constitutes a breach of the Terms, which may result in immediate termination of
                your account.
              </p>
              <p className="text-gray-700 leading-relaxed">
                You are responsible for safeguarding the password and for all activities that occur under your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Booking and Payment</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                All prices are displayed in the local currency and include applicable taxes unless otherwise stated.
                Payment is required at the time of booking. We accept various payment methods as displayed on our
                platform.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Cancellation and refund policies vary by service provider and are clearly stated at the time of booking.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                OneDayKorea shall not be liable for any indirect, incidental, special, consequential or punitive
                damages resulting from your use of or inability to use the service. We do not guarantee the accuracy,
                completeness, or usefulness of any information provided by third-party service providers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify or replace these Terms at any time. We will provide notice of any
                significant changes by posting the new Terms on this page. Your continued use of the service after
                such modifications constitutes your acknowledgment and acceptance of the modified Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="text-gray-700 leading-relaxed mt-3">
                Email: info@onedaykorea.com<br />
                Address: Seoul, South Korea
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
