"use client";

import {
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Info,
  MapPin,
  Minus,
  Plus,
  Shield,
  Star,
  Users,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function MultidayTourPage() {
  // 갤러리 상태
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const tourImages = [
    "/seoul-royal-palace-gyeongbokgung.jpg",
    "/korean-traditional-palace-with-pond-reflection.jpg",
    "/korean-traditional-hanbok-people-at-palace.jpg",
    "/group-of-tourists-in-hanbok-at-korean-palace.jpg",
  ];

  // 기념품 캐러셀 상태
  const [currentSouvenirIndex, setCurrentSouvenirIndex] = useState(0);
  const souvenirs = [
    {
      title: "[Souvenir Name Here 1]",
      description: "[A brief description of the souvenir 1]",
      image: "/korean-calligraphy-hunminjeongeum.jpg",
    },
    {
      title: "[Souvenir Name Here 2]",
      description: "[A brief description of the souvenir 2]",
      image: "/korean-traditional-celadon-vase.jpg",
    },
  ];

  // 예약 폼 상태
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const pricePerPerson = 1500;
  const totalPrice = (adults + children) * pricePerPerson;

  // 리뷰 필터 상태
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = [
    "All",
    "Great food",
    "Informative",
    "Clear communication",
    "Pickup experience",
    "Family fun",
    "Tour planning",
  ];

  const reviews = [
    {
      name: "JOHN_B",
      date: "Sep 2025",
      rating: 5,
      text: "Nice day trip. Liked the palace. The museum was nice. Good tour guide and driver, comfortable seats on the bus",
    },
    {
      name: "A_J",
      date: "Aug 2025",
      rating: 5,
      text: "So much fun! Lizzy knew so much about the history of South Korea. Pickup was easy and transportation was luxurious. We got to see the palace, change of gu...",
    },
    {
      name: "Joanne_N",
      date: "Jul 2025",
      rating: 5,
      text: "Absolutely brilliant full day tour with our favourite guide so far in South Korea! AJ was so friendly, informative and made sure we had plenty of shade in the hot ...",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f3f0]">
      {/* Section 1: Tour Detail Hero - 1.png */}
      <section className="py-20 px-6 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">
                Multiday Tour Name
              </h1>
              <p className="text-lg text-black mb-6 text-black">
                Description of the multi-day tour
              </p>

              {/* Tour Info */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#651d2a]" />
                  <span className="text-sm text-black">1 Days</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-[#651d2a]" />
                  <span className="text-sm text-black">
                    Seoul & Gyeonggi-do
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#651d2a]" />
                  <span className="text-sm text-black">Group Tour</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-primary text-[#651d2a]" />
                  <span className="text-sm font-medium text-black">
                    4.9 (120 reviews)
                  </span>
                </div>
              </div>

              {/* Main Image */}
              <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                <Image
                  src="/images/design-mode/castle1.png"
                  alt="Gyeongbokgung Palace"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  1 / 4
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-2">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src="/images/design-mode/castle2.png"
                    alt="Palace gate"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src="/images/design-mode/castle3.png"
                    alt="Palace pavilion"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src="/images/design-mode/castle4.png"
                    alt="Hanbok experience"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden bg-black/80 flex items-center justify-center">
                  <span className="text-white font-medium">+12 more</span>
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1 text-black">
              <Card className="p-6 sticky top-24 bg-white border-0 shadow-xl">
                <div className="mb-6">
                  <div className="text-3xl font-bold mb-1">$1,500 USD</div>
                  <div className="text-sm text-black">per person</div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Select your tour date
                    </label>
                    <input
                      type="date"
                      lang="en"
                      className="w-full px-4 py-2 border border-input rounded-lg"
                      placeholder="Year. Month. Day."
                    />
                  </div>

                  <div className="flex items-center justify-between border border-input rounded-lg px-4 py-3">
                    <label className="text-sm font-medium">Adults</label>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setAdults(Math.max(0, adults - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="font-medium min-w-[20px] text-center">
                        {adults}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setAdults(adults + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border border-input rounded-lg px-4 py-3">
                    <label className="text-sm font-medium">Children</label>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setChildren(Math.max(0, children - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="font-medium min-w-[20px] text-center">
                        {children}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setChildren(children + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between mb-4">
                      <span className="font-medium">Total Price</span>
                      <span className="text-2xl font-bold">
                        ${totalPrice.toLocaleString()} USD
                      </span>
                    </div>
                    <Button
                      className="w-full bg-[#651d2a] hover:bg-[#4a1620] text-white"
                      size="lg"
                    >
                      Book Now
                    </Button>
                    <p className="text-xs text-black text-center mt-2">
                      Free cancellation up to 48 hours before departure
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Reviews - 2.png */}
      <section className="py-10 px-6 flex items-center bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-2 mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Why travelers loved this
            </h2>
            <Info className="w-5 h-5 text-gray-400" />
          </div>

          <div className="flex items-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-6xl font-bold text-gray-900 mb-2">4.9</div>
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#651d2a] text-[#651d2a]"
                  />
                ))}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">2,002</div>
              <Link
                href="#"
                className="text-gray-600 underline hover:text-gray-900"
              >
                Reviews
              </Link>
            </div>
          </div>

          {/* 필터 버튼 */}
          <div className="mb-8">
            <div className="text-sm text-gray-600 mb-3">Filter by</div>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === filter
                      ? "bg-[#651d2a] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* 리뷰 카드 */}
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, idx) => (
              <div key={idx} className="bg-[#f5f3f0] rounded-xl p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#651d2a] text-[#651d2a]"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-semibold text-gray-900">
                    {review.name}
                  </span>
                  <span className="text-gray-500">·</span>
                  <span className="text-gray-500 text-sm">{review.date}</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  {review.text}
                </p>
                <button className="text-[#651d2a] text-sm font-medium hover:underline">
                  Read more
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Overview - 3.png */}
      <section className="py-20 px-6 flex items-center">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative h-[500px]">
              <Image
                src="/images/design-mode/castle1.png"
                alt="Korean traditional celadon vase"
                fill
                className="rounded-2xl shadow-2xl object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                overview
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  There is a depth and flow to history that cannot be captured
                  in a single day. From the ancient capital of Gyeongju to
                  Seoul, the heart of the Joseon Dynasty, do you want to
                  experience the scattered pieces of history coming together to
                  form a complete picture?
                </p>
                <p className="font-semibold text-[#651d2a]">
                  The Tumakr Multi-Day Tour is the most in-depth and expansive
                  historical exploration that time allows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: What is Special - 4.png */}
      <section className="py-20 px-6 flex items-center bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                what is special?
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed mb-8">
                <p>
                  Complete a historical narrative that a single day simply
                  cannot tell, discovering the intricate connections between
                  each region over several days. You will witness firsthand how
                  historical sites are interconnected, how they influenced one
                  another, and see the panorama of history unfold.
                </p>
                <p>
                  Instead of rushing from place to place, you will stay long
                  enough in one area to fully absorb its culture and atmosphere,
                  allowing for a much deeper understanding of its history.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-[#c4982a] flex-shrink-0 mt-1" />
                  <span className="text-gray-800">
                    A Cohesive Theme Connecting Scattered Histories
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-[#c4982a] flex-shrink-0 mt-1" />
                  <span className="text-gray-800">
                    Relaxed Itinerary, Deeper Understanding
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-[#c4982a] flex-shrink-0 mt-1" />
                  <span className="text-gray-800">
                    The Perfect Balance of Core Tours and Free Time화
                  </span>
                </div>
              </div>
            </div>
            <div className="relative h-[500px]">
              <Image
                src="/korean-traditional-pottery-making.jpg"
                alt="Korean traditional pottery making"
                fill
                className="rounded-2xl shadow-2xl object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: CTA Section - 7.png */}
      <section className="py-20 px-6 flex items-center bg-[#272b38]">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Start Your Special Journey Now
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Experience the true joy of travel
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Button className="bg-white text-[#272b38] hover:bg-gray-100 px-8 py-6 text-lg rounded-lg">
              Request a Consultation
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                Nationwide Tours Available
              </h3>
              <p className="text-white/70">(Seoul, Busan, Jeju, etc.)</p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                24/7 Support
              </h3>
              <p className="text-white/70">Inquire anytime</p>
            </div>
            <div className="text-center">
              <Shield className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                Safety Guaranteed
              </h3>
              <p className="text-white/70">Traveler's insurance included</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Souvenir - 6.png */}
      <section className="py-20 px-6 min-h-screen flex items-center bg-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Receive a special, custom-made souvenir.
          </h2>

          <div className="relative">
            {/* 캐러셀 컨테이너 */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[500px]">
              <Image
                src={
                  souvenirs[currentSouvenirIndex].image || "/placeholder.svg"
                }
                alt={souvenirs[currentSouvenirIndex].title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 z-10">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {souvenirs[currentSouvenirIndex].title}
                </h3>
                <p className="text-white/90">
                  {souvenirs[currentSouvenirIndex].description}
                </p>
              </div>

              {/* 좌우 화살표 */}
              <button
                onClick={() =>
                  setCurrentSouvenirIndex(
                    (currentSouvenirIndex - 1 + souvenirs.length) %
                      souvenirs.length
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-900" />
              </button>
              <button
                onClick={() =>
                  setCurrentSouvenirIndex(
                    (currentSouvenirIndex + 1) % souvenirs.length
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-gray-900" />
              </button>
            </div>

            {/* 인디케이터 */}
            <div className="flex justify-center gap-2 mt-6">
              {souvenirs.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSouvenirIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === currentSouvenirIndex
                      ? "bg-[#651d2a] w-8"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Other Tours - 8.png */}
      <section className="py-20 px-6 min-h-screen flex items-center">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#651d2a] text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
              TOURS
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Other Multi-day Tours
            </h2>
            <p className="text-gray-600">
              The deepest and most expansive historical exploration that time
              allows
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* 투어 1 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <Image
                  src="/seoul-royal-palace-gyeongbokgung.jpg"
                  alt="Seoul Royal Palace"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Seoul Palace Private Tour
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Explore Gyeongbokgung and Changdeokgung palaces in-depth with
                  a private guide
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>6 Hours</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>1-6 People</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    ₩180,000
                  </span>
                  <Button className="bg-[#651d2a] hover:bg-[#4a1620] text-white rounded-lg">
                    View Details
                  </Button>
                </div>
              </div>
            </div>

            {/* 투어 2 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <Image
                  src="/jeju-island-waterfall-nature.jpg"
                  alt="Jeju Island"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Jeju Island Hidden Gems Tour
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Discover the true beauty of Jeju, unknown to many tourists
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>8 Hours</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>1-8 People</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    ₩220,000
                  </span>
                  <Button className="bg-[#c4982a] hover:bg-[#4a1620] text-white rounded-lg">
                    View Details
                  </Button>
                </div>
              </div>
            </div>

            {/* 투어 3 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <Image
                  src="/busan-gamcheon-culture-village-colorful.jpg"
                  alt="Busan"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Busan Coastal Culture Tour
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  From Gamcheon Culture Village to Haeundae Beach, experience
                  all the charms of Busan
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>7 Hours</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>1-6 People</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    ₩200,000
                  </span>
                  <Button className="bg-[#6d8675] hover:bg-[#4a1620] text-white rounded-lg">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
