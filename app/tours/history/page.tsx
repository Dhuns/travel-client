"use client";

import { ArrowRight, BookOpen, Calendar, Check, MapPin, Sparkles, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import type React from "react";
import { useState } from "react";
import { historyTours } from "@/data/mockTours";

export default function HistoryTourPage() {
  // 폼 상태 관리
  const [formData, setFormData] = useState({
    name: "",
    contactMethod: "",
    email: "",
    travelDate: "",
    numberOfTravelers: "",
  });

  // 폼 제출 핸들러 - 백엔드 API 연동 시 이 부분을 수정
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: API 호출하여 견적 요청 전송
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* 왼쪽: 텍스트 콘텐츠 */}
            <div>
              <Badge className="bg-[#651d2a] text-white mb-4 px-4 py-1">
                History Tour
              </Badge>
              <h1 className="font-bold text-gray-900 mb-6 text-5xl">
                Tumakr
                <br />
                Korea History Tour
              </h1>
              <p className="text-gray-700 leading-relaxed mb-6">
                An Unparalleled Korean History Tour Awaits!
              </p>
              <p className="text-gray-700 leading-relaxed mb-8">
                It is a profound voyage into the very soul of Korea—the
                definitive experience designed to satisfy your curiosity and
                create lifelong memories.
              </p>
              <div className="mb-8">
                <Button
                  className="bg-[#651d2a] hover:bg-[#651d2a]/90 text-white px-6 flex items-center gap-2"
                  onClick={() => {
                    document
                      .getElementById("tour-list")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Explore Tours
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Tumakr</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Complete Privacy</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Dedicated Guide</span>
                </div>
              </div>
            </div>

            {/* 오른쪽: 이미지 */}
            <div className="relative h-[550px] rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/beautiful-korean-traditional-hanbok-dress.jpg"
                alt="Korean History Tour"
                className="w-full h-full object-cover"
              />

              {/* 왼쪽 하단 모달 */}
              <div className="absolute bottom-6 left-6 bg-white rounded-lg shadow-lg p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#651d2a] rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">
                    100% Customized
                  </h4>
                  <p className="text-xs text-gray-600">Your special journey</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why is Korean History Special Section */}
      <section className="min-h-screen flex items-center px-6 bg-gradient-to-br from-[#eda89b]/10 to-[#6d8675]/10">
        <div className="container mx-auto max-w-6xl py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            Why is Korean History Special?
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* 이미지 */}
            <div className="relative h-[350px] rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/beautiful-korean-traditional-palace-with-tourists-.jpg"
                alt="Korean Palace"
                className="w-full h-full object-cover"
              />
            </div>

            {/* 텍스트 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Discover the World Through an Eastern Lens
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Surrounded by powerful nations, the Korean Peninsula has a
                unique geopolitical story. Despite centuries of foreign
                influence, its people have preserved their distinct culture,
                language, and traditions, all rooted in a rich, ancient history.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Observed by its neighbors but never entirely lost, Korea's past
                gives insight about world history. Tumaku invites you to explore
                this fascinating journey through time, where East meets history,
                and the stories of the nation they built.
              </p>
            </div>
          </div>

          {/* 두 번째 섹션 - 역순 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* 텍스트 */}
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Uncover the Excellence and Majesty of Korean Cultural Heritage
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Korea's architectural and cultural heritage stands among the
                world's finest. From the elegant curves of palace roofs to the
                intricate details of temple art, every structure tells a story
                of artistic excellence and spiritual depth.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Walk through centuries-old palaces where kings once ruled,
                explore temples that have weathered wars and time, and discover
                the values of the nation they built.
              </p>
            </div>

            {/* 이미지 */}
            <div className="relative h-[350px] rounded-2xl overflow-hidden shadow-lg order-1 md:order-2">
              <img
                src="/beautiful-korean-traditional-palace-with-tourists-.jpg"
                alt="Korean Cultural Heritage"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#651d2a] via-[#c4982a] to-[#6d8675]">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Now, it's your turn to begin your story.
          </h2>
          <p className="text-lg mb-8 text-white/90">
            Embark on a journey through time and discover the soul of Korea
          </p>
          <Link href="/chat">
            <Button
              size="lg"
              className="bg-white text-[#651d2a] hover:bg-gray-100 font-semibold px-8"
            >
              Plan with AI Assistant
            </Button>
          </Link>
        </div>
      </section>

      {/* Historical Destinations Section */}
      <section
        id="tour-list"
        className="min-h-screen flex items-center px-6 bg-white"
      >
        <div className="container mx-auto max-w-6xl py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Historical Destinations Come Alive
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Discover Korea's rich history and culture through our carefully curated tours
          </p>

          <div className="space-y-8">
            {/* 히스토리 투어 목록 */}
            {historyTours.map((tour) => (
              <Link key={tour.id} href={`/tours/history/${tour.id}`} className="block">
                <Card className="overflow-hidden hover:shadow-xl transition-shadow p-0 cursor-pointer">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-[300px] md:h-auto">
                      <img
                        src={tour.image}
                        alt={tour.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <Badge className="bg-[#651d2a] text-white w-fit mb-3">
                        {tour.badge}
                      </Badge>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {tour.title}
                      </h3>
                      {tour.location && (
                        <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {tour.location}
                        </p>
                      )}
                      <p className="text-gray-700 mb-4">
                        {tour.description}
                      </p>
                      {tour.included && tour.included.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Included:</h4>
                          <ul className="space-y-2 text-sm text-gray-600">
                            {tour.included.map((item, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-[#651d2a] mt-0.5 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {tour.highlights && tour.highlights.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Highlights:</h4>
                          <ul className="space-y-2 text-sm text-gray-600">
                            {tour.highlights.map((highlight, index) => (
                              <li key={index}>• {highlight}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <Button className="bg-[#651d2a] hover:bg-[#651d2a]/90 text-white w-fit">
                        View Details & Book
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Feel the Breath of History Section */}
      <section className=" flex items-center px-6 bg-gradient-to-br from-[#6d8675]/10 to-[#eda89b]/10">
        <div className="container mx-auto max-w-6xl py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Feel the Breath of History
          </h2>
          <p className="text-center text-gray-600 mb-16">
            What makes our history tours unique
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: BookOpen, title: "Cinematic & In-Depth Storytelling" },
              { icon: Calendar, title: "Interactive Dialogue, Not a Lecture" },
              { icon: Users, title: "Unforgettable & Spontaneous Moments" },
              { icon: Sparkles, title: "An Exclusive, Custom-Made Memento" },
            ].map((feature, i) => (
              <Card
                key={i}
                className="text-center p-8 hover:shadow-xl transition-shadow bg-white"
              >
                <div className="w-16 h-16 bg-[#651d2a] rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {i === 0 &&
                    "More than just visiting sites, we provide rich historical context and engaging narratives that bring the past to life."}
                  {i === 1 &&
                    "Our guides encourage questions and discussions, making history an interactive experience rather than a one-way lecture."}
                  {i === 2 &&
                    "We leave room for spontaneity, allowing unexpected discoveries and memorable moments to unfold naturally."}
                  {i === 3 &&
                    "To help you cherish your memories forever, we present you with a one-of-a-kind souvenir, custom-made by us to embody the beauty of Korea and the spirit of your journey."}
                </p>
              </Card>
            ))}
          </div>

          <div className="mt-12 p-6 bg-white rounded-lg text-center shadow-md">
            <p className="text-gray-700 italic">
              <span>"This is not a common, mass-produced souvenir.</span>
              <br />
              <span>
                "It is a special, custom-made memento that fully embodies the
                emotions of our journey and the beauty of Korea."
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Custom Quote Section */}
      <section className="min-h-screen flex items-center px-6 bg-gradient-to-br from-[#eda89b]/10 to-[#6d8675]/10">
        <div className="container mx-auto max-w-4xl py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Get a Custom Quote
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Tell us about your interests and we'll create a personalized history
            tour just for you
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* 왼쪽: 견적 요청 폼 */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                📝 Request Consultation
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#651d2a] focus:border-transparent"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Method *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#651d2a] focus:border-transparent"
                    value={formData.contactMethod}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contactMethod: e.target.value,
                      })
                    }
                  >
                    <option value="">Select method</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="whatsapp">WhatsApp</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#651d2a] focus:border-transparent"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Travel Date *
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#651d2a] focus:border-transparent"
                    value={formData.travelDate}
                    onChange={(e) =>
                      setFormData({ ...formData, travelDate: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Travelers *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#651d2a] focus:border-transparent"
                    value={formData.numberOfTravelers}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        numberOfTravelers: e.target.value,
                      })
                    }
                  />
                </div>

                <p className="text-xs text-gray-500">
                  Your information is safe with us. We'll only use it to provide
                  you with the best tour experience.
                </p>

                <Button
                  type="submit"
                  className="w-full bg-[#651d2a] hover:bg-[#651d2a]/90 text-white py-3"
                >
                  Submit Request
                </Button>
              </form>
            </div>

            {/* 오른쪽: 빠른 상담 */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                💬 For a Faster Consultation
              </h3>
              <div className="space-y-6">
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-gray-900 mb-2">
                    Phone Consultation
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Speak directly with our history tour experts
                  </p>
                  <p className="text-[#651d2a] font-semibold">
                    📞 +82-2-1234-5678
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Mon-Fri: 9AM-6PM KST
                  </p>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-gray-900 mb-2">
                    Email Inquiry
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Get detailed information about our history tours
                  </p>
                  <p className="text-[#651d2a] font-semibold">
                    ✉️ history@onedaykorea.com
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Response within 24 hours
                  </p>
                </Card>
                {/* 
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="font-bold text-gray-900 mb-3">Why Choose Our History Tours?</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ Expert historians as guides</li>
                    <li>✓ Small group sizes (max 15 people)</li>
                    <li>✓ Flexible itineraries</li>
                    <li>✓ Exclusive access to special sites</li>
                    <li>✓ Complimentary cultural souvenirs</li>
                  </ul>
                </div>
                */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
