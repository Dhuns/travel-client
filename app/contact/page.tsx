"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // TODO: 백엔드 API 연동
      // await fetch("/api/contact", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });

      // 임시로 성공 처리
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50">
      {/* Header */}
      <div className="pt-32 pb-12 bg-[#651d2a] text-white">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-white/90">
            Get in touch with our travel experts for personalized assistance
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="shadow-xl bg-white">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center space-x-2">
                  <MessageCircle className="w-6 h-6 text-[#651d2a]" />
                  <span className="text-black">Send us a Message</span>
                </CardTitle>
                <CardDescription className="text-black">
                  Fill out the form below and we'll get back to you within 24
                  hours
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Your first name"
                        required
                        className="border border-gray-300 focus-visible:border-[#651d2a] focus-visible:ring-1 focus-visible:ring-[#651d2a] bg-white text-gray-900 placeholder:text-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Your last name"
                        required
                        className="border border-gray-300 focus-visible:border-[#651d2a] focus-visible:ring-1 focus-visible:ring-[#651d2a] bg-white text-gray-900 placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                      className="border border-gray-300 focus-visible:border-[#651d2a] focus-visible:ring-1 focus-visible:ring-[#651d2a] bg-white text-gray-900 placeholder:text-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Phone Number
                    </label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+82-10-1234-5678"
                      className="border border-gray-300 focus-visible:border-[#651d2a] focus-visible:ring-1 focus-visible:ring-[#651d2a] bg-white text-gray-900 placeholder:text-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#651d2a] focus:border-[#651d2a] bg-white text-gray-900"
                    >
                      <option value="">Select a topic</option>
                      <option value="booking">Tour Booking Inquiry</option>
                      <option value="custom">Custom Tour Request</option>
                      <option value="service">Service Information</option>
                      <option value="product">Product Purchase</option>
                      <option value="general">General Question</option>
                      <option value="feedback">Complaint or Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please provide details about your inquiry..."
                      rows={5}
                      required
                      className="border border-gray-300 focus-visible:border-[#651d2a] focus-visible:ring-1 focus-visible:ring-[#651d2a] bg-white text-gray-900 placeholder:text-gray-400"
                    />
                  </div>

                  {submitStatus === "success" && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 text-sm">
                        Thank you! Your message has been sent successfully.
                        We'll get back to you soon.
                      </p>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 text-sm">
                        Something went wrong. Please try again or contact us
                        directly at contact@tumakr.com
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#651d2a] hover:bg-[#4a1520] flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card className="shadow-lg bg-white border-2 border-[#651d2a]/30">
              <CardHeader className="text-black">
                <CardTitle className="text-2xl">Get in Touch</CardTitle>
                <CardDescription>
                  Multiple ways to reach our friendly team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-[#651d2a] mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Office Address
                    </h3>
                    <p className="text-gray-600">Seoul, South Korea</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-[#651d2a] mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Phone Number
                    </h3>
                    <p className="text-gray-600">Korea: +82-2-1234-5678</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-[#651d2a] mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Email Address
                    </h3>
                    <p className="text-gray-600">contact@tumakr.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-[#651d2a] mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Business Hours
                    </h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM KST
                      <br />
                      Saturday: 10:00 AM - 4:00 PM KST
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="bg-red-50 border-red-300 border-2 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-red-800">
                  Emergency Contact
                </CardTitle>
                <CardDescription className="text-red-600">
                  24/7 support for travelers in Korea
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-semibold text-red-800">
                    Emergency Hotline:
                  </p>
                  <p className="text-red-700 text-lg font-bold">
                    +82-10-1234-5678
                  </p>
                  <p className="text-sm text-red-600">
                    Available 24/7 for urgent assistance during your tour
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Link */}
            <Card className="bg-[#eda89b]/10 border-[#651d2a]/30 border-2 shadow-lg">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-[#651d2a] mb-2">
                  Frequently Asked Questions
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Find quick answers to common questions about our tours and
                  services.
                </p>
                <Button
                  variant="outline"
                  className="border-[#651d2a] text-[#651d2a] hover:!bg-[#651d2a] hover:!text-white bg-transparent"
                >
                  View FAQ
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
