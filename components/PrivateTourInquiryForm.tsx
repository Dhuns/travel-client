"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Award, Check, Shield, Star, Users } from "lucide-react";
import { useState } from "react";

export default function PrivateTourInquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    travelDate: "",
    numberOfTravelers: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // TODO: 백엔드 API 연동
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        travelDate: "",
        numberOfTravelers: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="inquiry-section"
      className="py-28 px-6 min-h-screen flex items-center bg-linear-to-br from-gray-50 to-white"
    >
      <div className="container mx-auto max-w-7xl w-full">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* 왼쪽: 이미지와 특징 */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            {/* 배경 이미지 */}
            <div className="absolute inset-0">
              <img
                src="/korean-traditional-palace-with-pond-reflection.jpg"
                alt="Seoul Adventure"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-tumakr-maroon/95 via-tumakr-maroon/70 to-transparent"></div>
            </div>

            {/* 콘텐츠 */}
            <div className="relative z-10 p-8 h-full flex flex-col justify-end">
              <div className="mb-6">
                <div className="inline-block px-4 py-2 rounded-full text-sm font-semibold text-white mb-4 bg-white/20 backdrop-blur-sm">
                  Premium Experience
                </div>
                <h2 className="text-4xl font-bold text-white mb-4">
                  Ready for Your Seoul Adventure?
                </h2>
                <p className="text-white/90 text-lg mb-8">
                  Limited spots available for an intimate, unforgettable experience
                </p>
              </div>

              {/* 특징 하이라이트 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="text-yellow-400 fill-yellow-400" size={20} />
                    <span className="text-white font-semibold">4.9/5 Rating</span>
                  </div>
                  <p className="text-white/80 text-sm">500+ Reviews</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="text-tumakr-mustard" size={20} />
                    <span className="text-white font-semibold">Award Winning</span>
                  </div>
                  <p className="text-white/80 text-sm">Best Tour 2024</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="text-tumakr-dusty-pink" size={20} />
                    <span className="text-white font-semibold">Small Groups</span>
                  </div>
                  <p className="text-white/80 text-sm">Max 12 People</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="text-tumakr-sage-green" size={20} />
                    <span className="text-white font-semibold">Secure</span>
                  </div>
                  <p className="text-white/80 text-sm">Safe Booking</p>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽: 문의하기 패널 */}
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            {/* 제목 */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Request Your Private Tour
              </h2>
              <p className="text-gray-600 text-sm">
                Fill out the form below and we'll create a customized itinerary for you
              </p>
            </div>

            {/* 가이드 */}
            <div className="bg-tumakr-maroon/5 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 text-sm mb-2">
                Please include:
              </h3>
              <ul className="space-y-1 text-xs text-gray-700">
                <li className="flex items-start gap-2">
                  <Check className="w-3 h-3 text-tumakr-maroon mt-0.5 flex-shrink-0" />
                  <span>Your preferred travel dates</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3 h-3 text-tumakr-maroon mt-0.5 flex-shrink-0" />
                  <span>Number of travelers in your group</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3 h-3 text-tumakr-maroon mt-0.5 flex-shrink-0" />
                  <span>Your interests and tour preferences</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3 h-3 text-tumakr-maroon mt-0.5 flex-shrink-0" />
                  <span>Desired tour duration (half-day, full-day, or multi-day)</span>
                </li>
              </ul>
            </div>

            {/* 폼 */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="border border-gray-300 focus-visible:border-tumakr-maroon focus-visible:ring-1 focus-visible:ring-tumakr-maroon bg-white text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  className="border border-gray-300 focus-visible:border-tumakr-maroon focus-visible:ring-1 focus-visible:ring-tumakr-maroon bg-white text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Preferred Travel Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-tumakr-maroon focus:border-tumakr-maroon bg-white text-gray-900 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-datetime-edit-text]:text-gray-400 [&::-webkit-datetime-edit-month-field]:text-gray-400 [&::-webkit-datetime-edit-day-field]:text-gray-400 [&::-webkit-datetime-edit-year-field]:text-gray-400"
                  style={{
                    colorScheme: "light",
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Number of Travelers <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  name="numberOfTravelers"
                  value={formData.numberOfTravelers}
                  onChange={handleChange}
                  placeholder="e.g., 2"
                  min="1"
                  required
                  className="border border-gray-300 focus-visible:border-tumakr-maroon focus-visible:ring-1 focus-visible:ring-tumakr-maroon bg-white text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your interests, preferences, and desired tour duration..."
                  rows={4}
                  required
                  className="border border-gray-300 focus-visible:border-tumakr-maroon focus-visible:ring-1 focus-visible:ring-tumakr-maroon bg-white text-gray-900 placeholder:text-gray-400"
                />
              </div>

              {submitStatus === "success" && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-sm">
                    Thank you! Your request has been sent. We'll get back to you within 24
                    hours.
                  </p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm">
                    Something went wrong. Please try again or contact us directly.
                  </p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 font-semibold bg-tumakr-maroon hover:bg-tumakr-maroon/90 text-white shadow-lg"
              >
                {isSubmitting ? "Sending..." : "Send Request"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
