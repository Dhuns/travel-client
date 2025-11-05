import {
  Award,
  Calendar,
  Check,
  Clock,
  Gift,
  MapPin,
  Shield,
  Star,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function PrivateTourPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - 1.png */}
      <section className="relative px-6 min-h-screen flex items-center">
        {/* 배경 이미지 */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/design-mode/multiday-tour-hero.png"
            alt="Korean Palace Background"
            className="w-full h-full object-cover"
          />
          {/* 어두운 오버레이로 텍스트 가독성 확보 */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
        </div>

        {/* 콘텐츠 */}
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          {/* 로고와 부제목 */}
          <h1 className="font-bold text-white mb-2 drop-shadow-lg text-3xl">
            Tumakr Korea Private Tour
          </h1>

          {/* 배지 */}
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full mb-8 bg-[#651d2a]/90 backdrop-blur-sm shadow-lg">
            <span className="text-sm font-medium text-white">
              Dedicated Guide · Your Own Pace · Perfect Customization
            </span>
          </div>

          {/* 메인 제목 */}
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight drop-shadow-lg md:text-5xl">
            A Journey Perfectly Tailored
            <br />
            <span className="text-white">To Your Own Rhythm</span>
          </h2>

          {/* 설명 */}
          <p className="text-white/90 text-black md:text-lg mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Have you felt disappointed by tours that follow rigid schedules with
            large groups?
            <br />
            Do you dream of a journey where every question receives full
            attention, and you can
            <br />
            linger wherever your curiosity leads?
          </p>

          {/* 검색 폼 */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-3xl mx-auto mb-8">
            <div className="space-y-4">
              {/* 위치 입력 */}
              <div className="relative">
                <MapPin
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  placeholder="Where would you like to go?"
                  className="pl-12 h-14 text-black border-gray-200"
                />
              </div>

              {/* 날짜 입력 */}
              <div className="relative">
                <Calendar
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  type="date"
                  placeholder="Select your date"
                  className="pl-12 h-14 text-black border-gray-200"
                />
              </div>

              {/* 인원수 입력 */}
              <div className="relative">
                <Users
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  type="number"
                  placeholder="Number of guests"
                  className="pl-12 h-14 text-black border-gray-200"
                  min="1"
                  max="12"
                />
              </div>

              {/* 검색 버튼 */}
              <Button className="w-full h-14 text-black font-semibold bg-[#651d2a] hover:bg-[#651d2a]/90 text-white">
                Search
              </Button>
            </div>
          </div>

          {/* CTA 버튼들 */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-[#651d2a] hover:bg-[#651d2a]/90 text-white font-semibold shadow-lg"
            >
              Book Your Journey Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="font-semibold border-2 border-white text-white hover:bg-white/10 bg-white/5 backdrop-blur-sm shadow-lg"
            >
              Explore Tours
            </Button>
          </div>
        </div>
      </section>

      {/* What Makes Special Section - 3.png */}
      <section className="py-16 px-6 min-h-screen flex items-center">
        <div className="container mx-auto max-w-6xl w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* 왼쪽: 텍스트 */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                What Makes Private Tours
                <br />
                <span className="text-[#651d2a]">Truly Special</span>
              </h2>

              <p className="text-gray-700 mb-6 leading-relaxed">
                <strong>Tumakr Private Tours</strong> offer a perfectly
                customized journey through time, designed exclusively for you
                and your loved ones.
              </p>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Your dedicated guide accompanies you throughout, redesigning
                every aspect of the itinerary to match your interests.
              </p>

              <p className="text-gray-900 font-semibold mb-8">
                Your smallest curiosity becomes the beginning of a new
                exploration.
              </p>

              {/* 체크리스트 */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 bg-[#651d2a]">
                    <Check className="text-white" size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Perfectly Customized Itinerary:
                    </p>
                    <p className="text-gray-600">
                      Delve deeper into eras that fascinate you, or spend extra
                      time at places that unexpectedly win your heart.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 bg-[#651d2a]">
                    <Check className="text-white" size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Your Personal Expert Storyteller:
                    </p>
                    <p className="text-gray-600">
                      Your guide exists solely to satisfy your intellectual
                      curiosity.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 bg-[#651d2a]">
                    <Check className="text-white" size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Incomparable Freedom:
                    </p>
                    <p className="text-gray-600">
                      Walk, rest, and explore at your own pace while
                      experiencing the most comfortable atmosphere.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 오른쪽: 이미지 */}
            <div className="relative">
              <img
                src="/korean-tour-guide-with-tourists-by-the-ocean.jpg"
                alt="Tour Guide"
                className="w-full h-[600px] object-cover rounded-2xl shadow-xl"
              />
              {/* 평점 배지 */}
              <div className="absolute bottom-6 left-6 bg-[#651d2a] rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="text-yellow-400 fill-yellow-400" size={24} />
                  <span className="text-2xl font-bold text-white">4.9/5</span>
                </div>
                <p className="text-white text-sm">Customer Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tours Section - 4.png */}
      <section className="py-16 px-6 min-h-screen flex items-center bg-gradient-to-br from-[#eda89b]/10 to-[#6d8675]/10">
        <div className="container mx-auto max-w-6xl w-full">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Private Tours
            </h2>
            <p className="text-gray-600 text-lg">
              Discover extraordinary historical journeys with your dedicated
              expert guide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Tour 1 */}
            <Link href="/tours/private/1">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative h-64">
                  <img
                    src="/seoul-royal-palace-gyeongbokgung.jpg"
                    alt="Seoul Royal Palace"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white bg-[#651d2a]">
                    Dedicated Guide
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span>Seoul</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>6 hours</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Seoul Royal Palace Private Tour
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700">
                      Gyeongbokgung
                    </span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700">
                      Changdeokgung
                    </span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700">
                      Hanbok Experience
                    </span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700">
                      Traditional Tea
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#651d2a]">
                      $280
                    </span>
                    <Button className="bg-[#651d2a] hover:bg-[#651d2a]/90 text-white">
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            </Link>

            {/* Tour 2 */}
            <Link href="/tours/private/2">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative h-64">
                  <img
                    src="/jeju-island-traditional-architecture.jpg"
                    alt="Jeju Island"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white bg-[#c4982a]">
                    Dedicated Guide
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span>Jeju Island</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>8 hours</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Jeju Hidden Gems Tour
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700">
                      Secret Beaches
                    </span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700">
                      Local Cuisine
                    </span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700">
                      Oreum Hiking
                    </span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700">
                      Tangerine Farm
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#c4982a]">
                      $335
                    </span>
                    <Button className="bg-[#c4982a] hover:bg-[#c4982a]/90 text-white">
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            </Link>

            {/* Tour 3 */}
            <Link href="/tours/private/3">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative h-64">
                  <img
                    src="/busan-coastal-scenery-haeundae.jpg"
                    alt="Busan Coast"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white bg-[#6d8675]">
                    Dedicated Guide
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span>Busan</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>7 hours</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Busan Coastal Private Tour
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700">
                      Haeundae Port
                    </span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700">
                      Gamcheon Village
                    </span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700">
                      Jagalchi Market
                    </span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700">
                      Haeundae Beach
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#6d8675]">
                      $305
                    </span>
                    <Button className="bg-[#6d8675] hover:bg-[#6d8675]/90 text-white">
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section - 2.png */}
      <section className="py-16 px-6 flex items-center bg-white">
        <div className="container mx-auto max-w-6xl w-full">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center bg-[#6d8675]">
                <Users className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Your Personal Expert Storyteller
              </h3>
              <p className="text-gray-600 leading-relaxed">
                No need to miss your chance to ask questions in a crowd. Your
                guide exists solely to satisfy your intellectual curiosity.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center bg-[#c4982a]">
                <MapPin className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Unparalleled Freedom
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Walk, rest, and explore at your own pace while experiencing the
                essence of history in the most comfortable atmosphere.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center bg-[#eda89b]">
                <Calendar className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Perfectly Customized Itinerary
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Dive deeper into periods that interest you, or spend more time
                at places that unexpectedly capture your heart. Everything
                unfolds according to your wishes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section - 5.png */}
      <section className="py-16 px-6 min-h-screen flex items-center">
        <div className="container mx-auto max-w-6xl w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your Journey Through Seoul
            </h2>
            <p className="text-gray-600 text-lg">
              Unforgettable moments exploring the perfect harmony of tradition
              and modernity
            </p>
          </div>

          {/* Storytelling 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative">
              <img
                src="/korean-traditional-palace-with-pond-reflection.jpg"
                alt="Palace Reflection"
                className="w-full h-[400px] object-cover rounded-2xl shadow-xl"
              />
            </div>
            <div>
              <div className="inline-block px-4 py-1 rounded-full text-sm font-semibold text-white mb-4 bg-[#6d8675]">
                Storytelling 1
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Step Into History, Deepen Through Conversation
              </h3>
              <p className="text-gray-600 leading-relaxed">
                "How accurate is this palace scene I saw in that drama?" From
                your simple question, our journey enters an entirely different
                dimension. Your guide goes beyond simply saying 'right' or
                'wrong'—they unveil the political circumstances of the era and
                the hidden relationships between historical figures,
                transforming the space before you into a living stage of
                history. This deep conversation, impossible in a crowded group
                tour, becomes not just a tour but a personal humanities concert
                crafted exclusively for you.
              </p>
            </div>
          </div>

          {/* Storytelling 2 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-block px-4 py-1 rounded-full text-sm font-semibold text-white mb-4 bg-[#6d8675]">
                Storytelling 2
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                The Joy of Unexpected Discovery, Time That's Truly Ours
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Walking beneath the palace eaves, you pause at a beautiful path
                where light pours through. In a group tour, you would have had
                to hurry along with regret, but your guide instead points to a
                quiet bench and suggests taking a rest. There, they quietly
                share secrets about the architectural style visible only from
                this spot. These unplanned pauses and unexpected discoveries are
                the greatest gift that a private tour, moving at our own pace,
                can offer.
              </p>
            </div>
            <div className="relative order-1 md:order-2">
              <div className="space-y-4">
                <img
                  src="/korean-traditional-hanbok-people-at-palace.jpg"
                  alt="Hanbok Experience"
                  className="w-full h-[250px] object-cover rounded-2xl shadow-xl"
                />
                <img
                  src="/group-of-tourists-in-hanbok-at-korean-palace.jpg"
                  alt="Group Tour"
                  className="w-full h-[250px] object-cover rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - 6.png */}
      <section className="py-16 px-6 flex items-center bg-[#272b38]">
        <div className="container mx-auto max-w-6xl w-full">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Gift className="text-[#c4982a]" size={32} />
              <h2 className="text-4xl font-bold text-white">
                Products & Souvenirs
              </h2>
            </div>
            <p className="text-gray-300 text-lg">
              Take home beautiful memories of Korea with our curated selection
              of traditional products and special souvenirs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Product 1 */}
            <div className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <img
                  src="/korean-traditional-hanbok-dress-pink.jpg"
                  alt="Traditional Hanbok"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white bg-[#651d2a]">
                  Traditional
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white px-2 py-1 rounded-full">
                  <Star className="text-yellow-400 fill-yellow-400" size={14} />
                  <span className="text-xs font-semibold">4.9</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Traditional Hanbok Set
                </h3>
              </div>
            </div>

            {/* Product 2 */}
            <div className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <img
                  src="/korean-beauty-skincare-products.jpg"
                  alt="K-Beauty Skincare"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white bg-[#eda89b]">
                  Beauty
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white px-2 py-1 rounded-full">
                  <Star className="text-yellow-400 fill-yellow-400" size={14} />
                  <span className="text-xs font-semibold">4.8</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  K-Beauty Skincare Kit
                </h3>
              </div>
            </div>

            {/* Product 3 */}
            <div className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <img
                  src="/korean-traditional-tea-set-ceramic.jpg"
                  alt="Korean Tea Collection"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white bg-[#6d8675]">
                  Food
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white px-2 py-1 rounded-full">
                  <Star className="text-yellow-400 fill-yellow-400" size={14} />
                  <span className="text-xs font-semibold">4.7</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Korean Tea Collection
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - 7.png */}
      <section className="py-16 px-6 min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-white">
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#651d2a]/95 via-[#651d2a]/70 to-transparent"></div>
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
                    Limited spots available for an intimate, unforgettable
                    experience
                  </p>
                </div>

                {/* 특징 하이라이트 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Star
                        className="text-yellow-400 fill-yellow-400"
                        size={20}
                      />
                      <span className="text-white font-semibold">
                        4.9/5 Rating
                      </span>
                    </div>
                    <p className="text-white/80 text-sm">500+ Reviews</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="text-[#c4982a]" size={20} />
                      <span className="text-white font-semibold">
                        Award Winning
                      </span>
                    </div>
                    <p className="text-white/80 text-sm">Best Tour 2024</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="text-[#eda89b]" size={20} />
                      <span className="text-white font-semibold">
                        Small Groups
                      </span>
                    </div>
                    <p className="text-white/80 text-sm">Max 12 People</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="text-[#6d8675]" size={20} />
                      <span className="text-white font-semibold">Secure</span>
                    </div>
                    <p className="text-white/80 text-sm">Safe Booking</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 오른쪽: 가격 및 예약 정보 */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col">
              {/* 가격 */}
              <div className="text-center mb-8 pb-8 border-b border-gray-200">
                <div className="inline-block">
                  <div className="font-bold mb-2 text-[#651d2a] text-4xl">
                    $899
                  </div>

                  <div className="text-gray-500 text-sm">4 days / 3 nights</div>
                </div>
              </div>

              {/* 투어 정보 */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Calendar className="text-[#651d2a] mx-auto mb-2" size={24} />
                  <div className="font-semibold text-gray-900 text-sm">
                    Duration
                  </div>
                  <div className="text-xs text-gray-600">4 Days</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Users className="text-[#651d2a] mx-auto mb-2" size={24} />
                  <div className="font-semibold text-gray-900 text-sm">
                    Group Size
                  </div>
                  <div className="text-xs text-gray-600">Max 12</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Clock className="text-[#651d2a] mx-auto mb-2" size={24} />
                  <div className="font-semibold text-gray-900 text-sm">
                    Start Time
                  </div>
                  <div className="text-xs text-gray-600">9:00 AM</div>
                </div>
              </div>

              {/* What's Included */}
              <div className="mb-8 flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Check className="text-[#6d8675]" size={24} />
                  What's Included
                </h3>
                <div className="space-y-3">
                  {[
                    "Expert English-speaking guide",
                    "All entrance fees included",
                    "Traditional hanbok rental",
                    "Exclusive night palace access",
                    "Local food tastings",
                    "Small group (max 12 people)",
                    "Hotel pickup & drop-off",
                    "Professional photos included",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-[#6d8675]">
                        <Check className="text-white" size={14} />
                      </div>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA 버튼 */}
              <div className="space-y-3">
                <Button className="w-full h-14 text-black font-semibold bg-[#651d2a] hover:bg-[#651d2a]/90 text-white shadow-lg">
                  Check Availability
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-14 text-black font-semibold border-2 border-[#651d2a] text-[#651d2a] hover:bg-[#651d2a]/5 bg-transparent"
                >
                  Contact Us
                </Button>
              </div>

              {/* 보안 배지 */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
