"use client";

import {
  Award,
  Calendar,
  Camera,
  Check,
  Clock,
  Compass,
  Gift,
  Heart,
  Instagram,
  MapPin,
  Package,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

/**
 * Package Tour 페이지
 *
 * 섹션 구성 (이미지 파일명 순서):
 * 1. Hero Section (1.png) - 위아래로 분리
 * 2. What Makes Special (2.png)
 * 3. Focus on Journey (3.png)
 * 4. What's Included (4.png)
 * 5. Products & Souvenirs (5.png)
 * 6. The Path We Take Together (6.png)
 * 7. CTA Section (7.png)
 */
export default function PackageTourPage() {
  return (
    <div className="min-h-screen bg-[#f5f3f0]">
      {/* Section 1: Hero - 1.png */}
      <section className="min-h-screen lg:h-screen flex flex-col bg-background">
        {/* 상단 타이틀 영역 */}
        <div className="px-4 md:px-8 pt-24 md:pt-28 lg:pt-32 pb-8 md:pb-12 lg:pb-16 flex-shrink-0">
          <div className="max-w-4xl mx-auto text-center space-y-4 md:space-y-6">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black text-balance">
              Tumakr Korea Package Tour
            </h1>
            <p className="text-base md:text-lg text-black leading-relaxed text-pretty">
              Flights, accommodation, transportation, and tours. The
              one-and-only solution for a perfect trip to Korea.
            </p>
          </div>
        </div>

        {/* 하단 콘텐츠 영역 */}
        <div className="relative flex-1 overflow-hidden pb-8 lg:pb-0">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center h-full">
            {/* Left Content - constrained width with padding */}
            <div className="px-6 lg:pl-24 py-6 lg:py-16 space-y-4 lg:space-y-6 max-w-3xl">
              <h1 className="font-bold text-black leading-tight text-3xl md:text-4xl lg:text-5xl">
                So that every moment of the journey is truly yours
              </h1>

              <p className="text-black leading-relaxed text-sm md:text-base">
                <span className="tracking-normal">
                  Are you tired of comparing countless hotels and worrying about
                  transportation in an unfamiliar place? <br />
                  Do you want to fully enjoy a top-tier experience, carefully
                  selected by Tumakr, without any worries?
                  <br />
                </span>
                <br />
                <span>
                  The Tumakr Package Tour is a premium, all-in-one solution that
                  prepares everything so you can focus solely on the true joy of
                  traveling in Korea.
                </span>
              </p>

              <div className="flex flex-wrap gap-3">
                <Badge className="bg-[#651d2a] hover:bg-[#4a1620] px-4 py-2 text-sm text-[#f5f3f1] rounded-md">
                  # AllInclusive
                </Badge>
                <Badge className="bg-[#651d2a] hover:bg-[#4a1620] px-4 py-2 text-sm text-[#f5f3f1] rounded-md">
                  # PremiumAllInOne
                </Badge>
              </div>
            </div>

            {/* Right Image - extends to viewport edge */}
            <div className="relative aspect-[16/10] lg:h-[500px] lg:aspect-auto">
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#f5f3f0] via-[#f5f3f0]/60 to-transparent z-10 hidden lg:block" />

              <img
                src="/images/design-mode/castle4.png"
                alt="Cyclist on Jeju coastal road"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Focus on Journey - 3.png */}
      <section className="py-20 px-6 bg-[#f5f3f0]">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* 왼쪽: 이미지 */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/design-mode/castle5.png"
                alt="Korean countryside house"
                fill
                className="object-cover"
              />
            </div>

            {/* 오른쪽: 텍스트 */}
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                You just focus on the journey.
                <br />
                We'll take care of the rest.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                An experience where every step, from start to finish, is moving.
                Discover true relaxation and the joy of discovery through a
                perfect trip crafted with Tumakr's expertise. The perfect Korean
                journey awaits you.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-[#651D2A] text-white px-4 py-2 text-sm font-medium rounded-md">
                  # TrustworthyExperts
                </span>
                <span className="bg-[#651D2A] text-white px-4 py-2 text-sm font-medium rounded-md">
                  # ProvenQuality
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Package Tour Products - 2.png */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Package Tours
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              Carefully curated all-inclusive packages designed for an
              unforgettable Korean experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Package 1: Seoul Cultural Experience */}
            <Card className="overflow-hidden border-0 shadow-lg bg-white rounded-xl p-0 hover:shadow-2xl transition-shadow">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/design-mode/castle1.png"
                  alt="Seoul Cultural Experience Package"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-[#651d2a] text-white px-3 py-1">
                    5 Days / 4 Nights
                  </Badge>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  Seoul Cultural Experience
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm mb-4">
                  Immerse yourself in Seoul's vibrant culture with palace tours,
                  traditional hanbok experience, and authentic Korean cuisine.
                  Includes flights, accommodation, and guided tours.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#651d2a]">
                    From $1,299
                  </span>
                  <Button className="bg-[#651d2a] hover:bg-[#4a1620] text-white">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>

            {/* Package 2: Jeju Island Paradise */}
            <Card className="overflow-hidden border-0 shadow-lg bg-white rounded-xl p-0 hover:shadow-2xl transition-shadow">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/design-mode/castle2.png"
                  alt="Jeju Island Paradise Package"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-[#6d8675] text-white px-3 py-1">
                    4 Days / 3 Nights
                  </Badge>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  Jeju Island Paradise
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm mb-4">
                  Discover the natural beauty of Jeju Island with volcanic
                  landscapes, pristine beaches, and unique local culture.
                  All-inclusive package with flights and accommodations.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#6d8675]">
                    From $999
                  </span>
                  <Button className="bg-[#6d8675] hover:bg-[#5a6d60] text-white">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>

            {/* Package 3: Complete Korea Tour */}
            <Card className="overflow-hidden border-0 shadow-lg bg-white rounded-xl p-0 hover:shadow-2xl transition-shadow">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/design-mode/castle3.png"
                  alt="Complete Korea Tour Package"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-[#c4982a] text-white px-3 py-1">
                    7 Days / 6 Nights
                  </Badge>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  Complete Korea Tour
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm mb-4">
                  Experience the best of Korea from Seoul to Busan and Jeju. A
                  comprehensive journey through history, culture, and natural
                  wonders with expert guides throughout.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#c4982a]">
                    From $1,899
                  </span>
                  <Button className="bg-[#c4982a] hover:bg-[#a67d22] text-white">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* NEW Section: Why Choose Tumakr Package Tour */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Tumakr Package Tour?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience the difference that sets us apart from ordinary travel
              packages
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* 1. 완벽한 올인원 솔루션 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-[#651d2a]/10 rounded-full flex items-center justify-center">
                    <Package className="w-7 h-7 text-[#651d2a]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Complete All-in-One Solution
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Flights, accommodation, transportation, and tours integrated
                    into one seamless package. No need to waste time comparing
                    dozens of websites or worrying about missing connections.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. 계획의 부담 제로 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-[#6d8675]/10 rounded-full flex items-center justify-center">
                    <Shield className="w-7 h-7 text-[#6d8675]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Zero Planning Stress
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Say goodbye to transportation anxiety and booking mistakes
                    in an unfamiliar country. Tumakr handles all reservations
                    and entry procedures perfectly.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. 전문가 검증 프리미엄 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-[#c4982a]/10 rounded-full flex items-center justify-center">
                    <Award className="w-7 h-7 text-[#c4982a]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Expert-Verified Premium Quality
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Only the finest experiences personally tested and vetted by
                    our travel experts. Not just sightseeing, but Tumakr's
                    signature deep cultural immersion.
                  </p>
                </div>
              </div>
            </div>

            {/* 4. 현지 전문가의 진짜 한국 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-[#651d2a]/10 rounded-full flex items-center justify-center">
                    <Compass className="w-7 h-7 text-[#651d2a]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Authentic Korea with Local Experts
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Discover the real Korea that tourists never see through
                    local insights. Gain deep understanding of history and
                    culture with our expert guides.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md">
              <Sparkles className="w-5 h-5 text-[#c4982a]" />
              <span className="font-semibold text-gray-900">
                The Tumakr Difference: Quality, Trust, and Unforgettable
                Memories
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Products & Souvenirs - 5.png */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#651d2a]/5 to-[#6d8675]/5">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Gift className="w-8 h-8 text-[#651d2a] mr-3" />
              <h2 className="text-4xl font-bold text-gray-900">
                Products & Souvenirs
              </h2>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Take home beautiful memories of Korea with our curated selection
              of traditional products and special souvenirs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Product 1 */}
            <Card className="overflow-hidden border-0 shadow-lg group cursor-pointer bg-white rounded-xl p-0">
              <div className="relative aspect-video">
                <Image
                  src="/images/design-mode/gift-1.png"
                  alt="Traditional Hanbok"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-2">
                  Hidden waterfall discovered with the best crew!
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" /> 234
                    </span>
                    <span className="flex items-center">
                      <Camera className="w-4 h-4 mr-1" /> 18
                    </span>
                  </div>
                  <span className="text-[#c4982a]">@emma_travels</span>
                </div>
              </div>
            </Card>

            {/* Product 2 */}
            <Card className="overflow-hidden border-0 shadow-lg group cursor-pointer bg-white rounded-xl p-0">
              <div className="relative aspect-video">
                <Image
                  src="/images/design-mode/gift-2.png"
                  alt="Korean Skincare"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-2">
                  Best Korean BBQ with new friends from 5 countries 🔥
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" /> 189
                    </span>
                    <span className="flex items-center">
                      <Camera className="w-4 h-4 mr-1" /> 24
                    </span>
                  </div>
                  <span className="text-[#c4982a]">@marco_adventures</span>
                </div>
              </div>
            </Card>

            {/* Product 3 */}
            <Card className="overflow-hidden border-0 shadow-lg group cursor-pointer bg-white rounded-xl p-0">
              <div className="relative aspect-video">
                <Image
                  src="/images/design-mode/gift-3.png"
                  alt="Korean Tea Set"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-2">
                  Worth the 5am wake up call! Sunrise at Seongsan 🌅
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" /> 312
                    </span>
                    <span className="flex items-center">
                      <Camera className="w-4 h-4 mr-1" /> 31
                    </span>
                  </div>
                  <span className="text-[#c4982a]">@lisa_wanderlust</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Instagram Follow */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Follow along and share your own journey
            </p>
            <Button className="bg-white border-2 border-[#651d2a] text-[#651d2a] hover:bg-[#651d2a] hover:text-white px-8 py-3 rounded-full">
              <Instagram className="w-5 h-5 mr-2" />
              @OnedayKorea
            </Button>
          </div>
        </div>
      </section>

      {/* Section 7: CTA - 7.png */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Start your special journey now.
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Experience the true joy of travel with a private tour and a
            dedicated guide.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Link href="/chat">
              <Button className="bg-[#651d2a] hover:bg-[#651d2a]/90 text-white px-8 py-6 text-lg rounded-full">
                Request a Free Consultation
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="border-2 border-[#651d2a] text-[#651d2a] hover:bg-[#651d2a]/10 px-8 py-6 text-lg rounded-full bg-transparent"
              >
                Contact Us
              </Button>
            </Link>
          </div>

          {/* 하단 정보 */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-[#651d2a]/20 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-[#651d2a]" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                Nationwide Tours Available
              </h3>
              <p className="text-sm text-gray-600">Seoul, Busan, Jeju, etc.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-[#6d8675]/20 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-[#6d8675]" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-sm text-gray-600">Inquire anytime</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-[#c4982a]/20 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-[#c4982a]" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                Safety Guaranteed
              </h3>
              <p className="text-sm text-gray-600">
                Traveler's insurance included
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
