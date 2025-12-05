"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PrivacyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f3f0] to-[#faf8f5] pt-32 pb-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* 헤더 */}
          <div className="bg-gradient-to-r from-tumakr-maroon to-tumakr-maroon/90 text-white p-8">
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
          <div className="p-8 prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. Information We Collect
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Name and contact information (email address, phone number)</li>
                <li>Account credentials (username and password)</li>
                <li>
                  Payment information (processed securely through third-party payment
                  processors)
                </li>
                <li>Booking and travel preferences</li>
                <li>Communications with us</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process your bookings and transactions</li>
                <li>Send you confirmations, updates, and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>
                  Detect, prevent, and address technical issues and fraudulent activity
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. Information Sharing
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We may share your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>With service providers who perform services on our behalf</li>
                <li>
                  With tour operators and activity providers to fulfill your bookings
                </li>
                <li>When required by law or to protect our rights</li>
                <li>With your consent or at your direction</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                We do not sell your personal information to third parties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate technical and organizational measures to protect
                your personal information against unauthorized access, alteration,
                disclosure, or destruction. However, no method of transmission over the
                Internet or electronic storage is 100% secure, and we cannot guarantee
                absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Retention</h2>
              <p className="text-gray-700 leading-relaxed">
                We retain your personal information for as long as necessary to fulfill
                the purposes outlined in this Privacy Policy, unless a longer retention
                period is required or permitted by law. When we no longer need your
                information, we will securely delete or anonymize it.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Depending on your location, you may have the following rights regarding
                your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Access and receive a copy of your personal information</li>
                <li>Correct or update your personal information</li>
                <li>Delete your personal information</li>
                <li>Object to or restrict the processing of your personal information</li>
                <li>Withdraw consent (where processing is based on consent)</li>
                <li>Data portability</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                To exercise these rights, please contact us using the information provided
                below.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. Cookies and Tracking Technologies
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We use cookies and similar tracking technologies to collect information
                about your browsing activities and to improve your experience on our
                website. You can control cookies through your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. Third-Party Links
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Our service may contain links to third-party websites. We are not
                responsible for the privacy practices of these websites. We encourage you
                to read their privacy policies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                9. Children's Privacy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Our services are not directed to children under the age of 13. We do not
                knowingly collect personal information from children under 13. If you
                become aware that a child has provided us with personal information,
                please contact us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                10. Changes to This Policy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of
                any changes by posting the new Privacy Policy on this page and updating
                the "Last updated" date. You are advised to review this Privacy Policy
                periodically for any changes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices,
                please contact us at:
              </p>
              <p className="text-gray-700 leading-relaxed mt-3">
                Email:{" "}
                <a
                  href="mailto:info@onedaykorea.com"
                  className="text-tumakr-maroon hover:underline"
                >
                  info@onedaykorea.com
                </a>
                <br />
                Phone: +82 70 7556 5355 / +82 10 2479 1242
                <br />
                Address: 2F, Bukhansan TheSharp Sang-ga, 510 Tongil-ro,
                <br />
                Seodaemun-gu, Seoul 03615, Korea
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
