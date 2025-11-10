"use client";

import {
  Calendar,
  Check,
  Clock,
  Compass,
  MapPin,
  Mountain,
  Quote,
  Shield,
  Star,
  Sunrise,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

/**
 * Multiday Tour 설명 페이지
 *
 * 예약 페이지가 아닌 Multiday Tour가 무엇인지 설명하는 페이지로 재구성
 */
export default function MultidayTourPage() {
  return (
    <div className="min-h-screen bg-[#f5f3f0]">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/design-mode/castle2.png"
            alt="Korean landscape"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        <div className="relative container mx-auto px-6 py-32 lg:py-40">
          <div className="max-w-2xl text-white space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Multi-day Tours
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              The deepest and most expansive historical exploration that time
              allows
            </p>
            <p className="text-lg text-white/80">
              Complete a historical narrative that a single day simply cannot
              tell, discovering the intricate connections between each region
              over several days.
            </p>
          </div>
        </div>
      </section>

      {/* What is Multi-day Tour */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="bg-[#651d2a] text-white px-4 py-2 rounded-full text-sm font-medium">
                  MULTI-DAY EXPERIENCE
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                What makes our Multi-day Tours special?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                There is a depth and flow to history that cannot be captured in
                a single day. From the ancient capital of Gyeongju to Seoul, the
                heart of the Joseon Dynasty, experience the scattered pieces of
                history coming together to form a complete picture.
              </p>
              <p className="text-lg text-[#651d2a] font-semibold">
                The Tumakr Multi-Day Tour is the most in-depth and expansive
                historical exploration that time allows.
              </p>

              <div className="pt-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#651d2a]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Compass className="w-6 h-6 text-[#651d2a]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      A Cohesive Theme Connecting Scattered Histories
                    </h3>
                    <p className="text-gray-600">
                      See how historical sites are interconnected across regions
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#6d8675]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mountain className="w-6 h-6 text-[#6d8675]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      Relaxed Itinerary, Deeper Understanding
                    </h3>
                    <p className="text-gray-600">
                      Stay long enough to fully absorb the culture and
                      atmosphere
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#c4982a]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Sunrise className="w-6 h-6 text-[#c4982a]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      The Perfect Balance of Tours and Free Time
                    </h3>
                    <p className="text-gray-600">
                      Guided exploration combined with personal discovery
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/design-mode/castle1.png"
                alt="Traditional Korean architecture"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tour Highlights */}
      <section id="tour-highlights" className="py-20 px-6 bg-white scroll-mt-24">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tour Highlights
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience the full spectrum of Korean history and culture across
              multiple days
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-0 overflow-hidden border-0 shadow-lg">
              <div className="relative h-64">
                <Image
                  src="/images/design-mode/castle1.png"
                  alt="Royal Palace"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Royal Palaces & Dynasties
                </h3>
                <p className="text-gray-600">
                  Explore the grand palaces of Seoul and understand the Joseon
                  Dynasty's legacy
                </p>
              </div>
            </Card>

            <Card className="p-0 overflow-hidden border-0 shadow-lg">
              <div className="relative h-64">
                <Image
                  src="/images/design-mode/castle1.png"
                  alt="Temple Stay"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Temple Stay Experience
                </h3>
                <p className="text-gray-600">
                  Immerse yourself in Buddhist culture with overnight temple
                  stays
                </p>
              </div>
            </Card>

            <Card className="p-0 overflow-hidden border-0 shadow-lg">
              <div className="relative h-64">
                <Image
                  src="/images/design-mode/castle1.png"
                  alt="Traditional Village"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Traditional Villages
                </h3>
                <p className="text-gray-600">
                  Visit preserved hanok villages and experience traditional
                  Korean life
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#6d8675]/5 to-[#651d2a]/5">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#651d2a] text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4 fill-current" />
              <span>4.9/5 from 300+ reviews</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Travelers Say
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Real experiences from travelers who explored Korea's history with
              us
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Review 1 */}
            <Card className="p-8 border-0 shadow-lg bg-white relative">
              <Quote className="absolute top-6 right-6 w-10 h-10 text-[#651d2a]/10" />
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[#c4982a] text-[#c4982a]"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "The 5-day tour from Gyeongju to Seoul was absolutely
                incredible. Our guide's knowledge of Korean history brought
                every site to life. The pace was perfect - enough time to really
                absorb each location without feeling rushed."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#651d2a]/10 rounded-full flex items-center justify-center">
                  <span className="text-[#651d2a] font-bold">SK</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Sarah K.</p>
                  <p className="text-sm text-gray-600">
                    Australia • March 2024
                  </p>
                </div>
              </div>
            </Card>

            {/* Review 2 */}
            <Card className="p-8 border-0 shadow-lg bg-white relative">
              <Quote className="absolute top-6 right-6 w-10 h-10 text-[#651d2a]/10" />
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[#c4982a] text-[#c4982a]"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "Temple stay experience was a highlight! Small group size meant
                we got personal attention. The hotels were excellent, and the
                regional food experiences were unforgettable. Worth every
                penny."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#651d2a]/10 rounded-full flex items-center justify-center">
                  <span className="text-[#651d2a] font-bold">MJ</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Michael J.</p>
                  <p className="text-sm text-gray-600">USA • February 2024</p>
                </div>
              </div>
            </Card>

            {/* Review 3 */}
            <Card className="p-8 border-0 shadow-lg bg-white relative">
              <Quote className="absolute top-6 right-6 w-10 h-10 text-[#651d2a]/10" />
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[#c4982a] text-[#c4982a]"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "As a history teacher, I was impressed by the depth of
                information. The tour connected dots I never knew existed.
                Perfect balance of guided tours and free exploration time."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#651d2a]/10 rounded-full flex items-center justify-center">
                  <span className="text-[#651d2a] font-bold">EC</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Emma C.</p>
                  <p className="text-sm text-gray-600">UK • January 2024</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Stats */}
          <div className="mt-16 grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#651d2a] mb-2">300+</div>
              <p className="text-gray-600">Happy Travelers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#651d2a] mb-2">
                4.9/5
              </div>
              <p className="text-gray-600">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#651d2a] mb-2">98%</div>
              <p className="text-gray-600">Would Recommend</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#651d2a] mb-2">50+</div>
              <p className="text-gray-600">Tours This Year</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#651d2a] to-[#4a1620]">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to explore Korea in depth?
          </h2>
          <p className="text-xl mb-10 text-white/90">
            Join us for an unforgettable multi-day journey through Korean
            history and culture
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Button
              className="bg-white text-[#651d2a] hover:bg-white/90 px-8 py-6 text-lg rounded-full"
              onClick={() => {
                document.getElementById('tour-highlights')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Available Tours
            </Button>
            <Link href="/chat">
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full bg-transparent"
              >
                Request Custom Tour
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Expert Guides</h3>
                <p className="text-white/80 text-sm">
                  Deep knowledge of history and culture
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold mb-1">24/7 Support</h3>
                <p className="text-white/80 text-sm">
                  We're here throughout your journey
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Safety First</h3>
                <p className="text-white/80 text-sm">
                  Travel insurance and support included
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Exclusive Goods Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#651d2a] text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              <span>COMPLIMENTARY GIFTS</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Special Gifts Included with Your Tour
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Every participant receives exclusive souvenirs to commemorate your
              journey through Korean history
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Product 1 */}
            <Card className="overflow-hidden border-0 shadow-lg p-0 bg-white rounded-xl">
              <div className="relative aspect-square">
                <Image
                  src="/images/design-mode/gift-1.png"
                  alt="History Tour Gift Set"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-[#651d2a] text-white px-3 py-1 rounded-full text-sm font-medium">
                  Included with Tour
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Historical Journey Gift Set
                </h3>
                <p className="text-gray-600">
                  Curated collection featuring traditional crafts and historical
                  replicas as a special memento of your journey
                </p>
              </div>
            </Card>

            {/* Product 2 */}
            <Card className="overflow-hidden border-0 shadow-lg p-0 bg-white rounded-xl">
              <div className="relative aspect-square">
                <Image
                  src="/images/design-mode/gift-2.png"
                  alt="Traditional Accessories"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-[#6d8675] text-white px-3 py-1 rounded-full text-sm font-medium">
                  Included with Tour
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Traditional Accessories Set
                </h3>
                <p className="text-gray-600">
                  Handcrafted accessories inspired by Joseon Dynasty designs,
                  yours to keep after the tour
                </p>
              </div>
            </Card>

            {/* Product 3 */}
            <Card className="overflow-hidden border-0 shadow-lg p-0 bg-white rounded-xl">
              <div className="relative aspect-square">
                <Image
                  src="/images/design-mode/gift-3.png"
                  alt="Tour Guidebook"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-[#c4982a] text-white px-3 py-1 rounded-full text-sm font-medium">
                  Included with Tour
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Illustrated History Journal
                </h3>
                <p className="text-gray-600">
                  Beautiful illustrated journal with historical insights -
                  perfect for documenting your travel memories
                </p>
              </div>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-700">
              <span className="font-semibold text-[#651d2a]">
                All items are complimentary
              </span>{" "}
              and will be presented to you during the tour
            </p>
          </div>
        </div>
      </section>

      {/* AI Chatbot Customization CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#6d8675]/5 to-[#651d2a]/5 min-h-screen flex items-center">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left: Image */}
              <div className="relative h-64 md:h-auto">
                <Image
                  src="/images/design-mode/castle1.png"
                  alt="Customize your journey"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#651d2a]/20 to-transparent" />
              </div>

              {/* Right: Content */}
              <div className="p-10 md:p-12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 bg-[#651d2a]/10 text-[#651d2a] px-4 py-2 rounded-full text-sm font-medium mb-4 w-fit">
                  <Compass className="w-4 h-4" />
                  <span>PERSONALIZED EXPERIENCE</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Customize Your Perfect Journey
                </h2>

                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Every traveler is unique. Let our AI travel assistant help you
                  craft a personalized itinerary that perfectly matches your
                  interests, pace, and preferences.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#651d2a] rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">
                      Personalized route recommendations
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#651d2a] rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">
                      Flexible schedule adjustments
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#651d2a] rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">
                      Real-time answers to your questions
                    </span>
                  </div>
                </div>

                <Link href="/chat" className="w-full">
                  <Button className="bg-gradient-to-r from-[#651d2a] to-[#4a1620] hover:from-[#4a1620] hover:to-[#651d2a] text-white px-8 py-6 text-lg rounded-full w-full group flex items-center justify-center">
                    <span>Chat with Travel AI</span>
                    <Compass className="w-5 h-5 ml-2 group-hover:rotate-90 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
