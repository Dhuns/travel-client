"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, HelpCircle, MessageCircle, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const faqCategories = [
  {
    title: "About One Day Korea",
    faqs: [
      {
        question: "What is One Day Korea?",
        answer:
          "One Day Korea is one of the top traveler platforms based in South Korea that connects travelers with authentic Korean experiences. We offer a variety of tours including day trips, private tours, history tours, and multi-day adventures throughout Korea.",
      },
      {
        question: "Why was One Day Korea created?",
        answer:
          "We were founded to share South Korean culture through local hosts and help travelers plan safe, authentic trips. Our mission is to provide memorable experiences that go beyond typical tourist attractions.",
      },
      {
        question: "How can I contact One Day Korea?",
        answer:
          "You can reach us via email at info@onedaykorea.com, by phone at +82 70 7556 5355 or +82 10 2479 1242, or visit our Contact page to send us a message directly.",
      },
    ],
  },
  {
    title: "Booking & Tours",
    faqs: [
      {
        question: "How do I book a tour?",
        answer:
          "Booking is easy! Simply browse our tours, select your preferred date and number of participants, and complete the booking process online. You'll receive a confirmation email with all the details.",
      },
      {
        question: "Can I modify my booking after it's confirmed?",
        answer:
          "Yes, you can request to modify your booking. Simply contact us via email or use our messaging system to discuss changes with us. We'll do our best to accommodate your needs.",
      },
      {
        question: "Is transportation included in the tours?",
        answer:
          "Unless expressly stated by the tour description, transportation costs are upon the traveler. Many of our tours include pickup from central Seoul locations - please check the specific tour details.",
      },
      {
        question: "Can I book a private tour for my group?",
        answer:
          "Absolutely! We specialize in private tours that can be customized to your interests. You can book privately with friends or family, or join a group experience with other international travelers.",
      },
      {
        question: "What languages do your guides speak?",
        answer:
          "Most of our tour guides speak fluent English. If you need a guide who speaks another language, please contact us in advance and we'll try to accommodate your request.",
      },
    ],
  },
  {
    title: "Payment & Pricing",
    faqs: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept PayPal and major credit cards. Payment is processed securely through our platform.",
      },
      {
        question: "Are there any booking fees for travelers?",
        answer:
          "No, we do not charge any booking fees to travelers. The price you see is the price you pay.",
      },
      {
        question: "What is your cancellation policy?",
        answer:
          "You have up to two weeks before your scheduled tour to cancel your booking. Please note that our platform fee may be retained from refunds. Specific cancellation terms vary by tour, so please check the tour details.",
      },
      {
        question: "Are prices displayed in local currency?",
        answer:
          "Prices are typically displayed in USD or KRW. You can pay in your preferred currency through our payment processor.",
      },
    ],
  },
  {
    title: "During Your Tour",
    faqs: [
      {
        question: "What should I bring on the tour?",
        answer:
          "We recommend comfortable walking shoes, weather-appropriate clothing, a camera, and any personal items you might need. Specific requirements will be mentioned in your tour confirmation email.",
      },
      {
        question: "What happens if there's bad weather?",
        answer:
          "Most tours operate rain or shine with minor adjustments to the itinerary if needed. In case of severe weather that makes the tour unsafe, we'll contact you to reschedule or provide a refund.",
      },
      {
        question: "Can I leave a review after my tour?",
        answer:
          "Yes! We encourage you to share your experience. After your tour, you can write a review on our platform or on TripAdvisor to help future travelers.",
      },
      {
        question: "What if I have dietary restrictions?",
        answer:
          "Please let us know about any dietary restrictions when booking. Our guides will do their best to accommodate your needs, especially for tours that include meals.",
      },
    ],
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      faqs: category.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.faqs.length > 0);

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="bg-tumakr-maroon py-16">
        <div className="container mx-auto px-6 text-center text-white">
          <HelpCircle className="w-16 h-16 mx-auto mb-4 opacity-80" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto">
            Find answers to common questions about our tours, bookings, and services.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-[#f5f3f0]">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg bg-white border-gray-200"
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">
                No results found for "{searchQuery}"
              </p>
              <Button variant="outline" onClick={() => setSearchQuery("")}>
                Clear search
              </Button>
            </div>
          ) : (
            <div className="space-y-10">
              {filteredCategories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-tumakr-maroon">
                    {category.title}
                  </h2>
                  <div className="space-y-3">
                    {category.faqs.map((faq, faqIndex) => {
                      const key = `${categoryIndex}-${faqIndex}`;
                      const isOpen = openItems[key];

                      return (
                        <div
                          key={faqIndex}
                          className="border border-gray-200 rounded-lg overflow-hidden"
                        >
                          <button
                            onClick={() => toggleItem(key)}
                            className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                          >
                            <span className="font-semibold text-gray-900 pr-4">
                              {faq.question}
                            </span>
                            <ChevronDown
                              className={`w-5 h-5 text-tumakr-maroon shrink-0 transition-transform ${
                                isOpen ? "transform rotate-180" : ""
                              }`}
                            />
                          </button>
                          {isOpen && (
                            <div className="px-5 pb-5 bg-gray-50">
                              <p className="text-gray-600 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-6 bg-[#f5f3f0]">
        <div className="container mx-auto max-w-4xl text-center">
          <MessageCircle className="w-12 h-12 text-tumakr-maroon mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Can't find what you're looking for? Our team is here to help. Contact us and
            we'll get back to you as soon as possible.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button className="bg-tumakr-maroon hover:bg-tumakr-maroon/90">
                Contact Us
              </Button>
            </Link>
            <Link href="/chat">
              <Button
                variant="outline"
                className="border-tumakr-maroon text-tumakr-maroon hover:bg-tumakr-maroon hover:text-white"
              >
                Plan Your Trip
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
