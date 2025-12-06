import { Compass, Lock, Sparkles, Star, User } from "lucide-react";

import { TourCard } from "@/components/tours/tour-card";
import { Button } from "@/components/ui/button";
import { getToursFromBackend } from "@/lib/bokun";
import Link from "next/link";

export default async function PrivateTourPage() {
  // 백엔드 API에서 투어 데이터 가져오기 (안정적)
  const tours = await getToursFromBackend("private", "Private Tour");

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* 배경 이미지 */}
        <div className="absolute inset-0">
          <img
            src="/theme-private-tours-hero.jpg"
            alt="Themed Private Tour"
            className="w-full h-full object-cover"
          />
          {/* 그라디언트 오버레이 */}
          <div className="absolute inset-0 bg-linear-to-b from-tumakr-dark-blue/95 via-tumakr-dark-blue/30 to-transparent"></div>
          {/* 패턴 오버레이 */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }}
          ></div>
        </div>

        {/* 콘텐츠 */}
        <div className="container mx-auto max-w-5xl px-6 relative z-10 text-center">
          {/* 배지 */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8 bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
            <Star className="w-4 h-4" fill="white" />
            <span className="text-sm font-semibold text-white tracking-wider">
              THEMED PRIVATE TOURS
            </span>
          </div>

          {/* 메인 제목 */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Dive Deeper
            <br />
            into Seoul
          </h1>

          {/* 설명 */}
          <p className="text-white/90 text-xl mb-10 leading-relaxed max-w-3xl mx-auto">
            Each tour is crafted around a unique story — from Korean history and <br />
            philosophy to K-Drama, and nature. Enjoy a fully private, customizable journey
            guided by experts who bring each theme to life.
          </p>

          {/* CTA 버튼 */}
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#tour-list">
              <Button
                size="lg"
                className="bg-white text-tumakr-dark-blue hover:bg-white/90 font-semibold text-lg px-8 py-6 shadow-2xl hover:shadow-white/20 transition-all"
              >
                Explore Tours
              </Button>
            </a>
            <a href="#about">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 font-semibold text-lg px-8 py-6 backdrop-blur-sm transition-all"
              >
                Learn More
              </Button>
            </a>
          </div>

          {/* 통계 정보 */}
          <div className="mt-16 grid grid-cols-3  rounded-xl p-6 gap-6 max-w-3xl mx-auto">
            <div className="text-center bg-white p-6 border rounded-xl border-white/20">
              <div className="text-4xl font-bold text-tumakr-dark-blue mb-2">4.9★</div>
              <div className="text-tumakr-dark-blue text-sm font-medium">
                Customer Rating
              </div>
            </div>
            <div className="text-center bg-white p-6 border rounded-xl border-white/20">
              <div className="text-4xl font-bold text-tumakr-dark-blue mb-2">700+</div>
              <div className="text-tumakr-dark-blue text-sm font-medium">
                Happy Travelers
              </div>
            </div>
            <div className="text-center bg-white p-6 border rounded-xl border-white/20">
              <div className="text-4xl font-bold text-tumakr-dark-blue mb-2">8+</div>
              <div className="text-tumakr-dark-blue text-sm font-medium">
                Unique Themes
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Special Section */}
      <section id="about" className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-7xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 bg-tumakr-maroon/10 border border-tumakr-maroon/20">
            <span className="text-xs font-medium text-tumakr-maroon tracking-wide">
              WHY CHOOSE US
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            What Makes Us
            <span className="text-tumakr-maroon"> Special</span>
          </h2>

          <p className="text-gray-600 mb-8 leading-relaxed text-lg max-w-7xl mx-auto">
            Enjoy a fully private, customizable journey guided by experts who bring each
            theme to life. <br /> Perfect for families, friends, and travelers seeking a
            more meaningful and immersive experience.
          </p>

          {/* 특징 카드 */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="p-8 rounded-xl bg-linear-to-br from-tumakr-maroon/5 to-tumakr-maroon/10 border border-tumakr-maroon/10 hover:border-tumakr-maroon/30 transition-all">
              <div className="flex w-full justify-center items-center gap-2 mb-4">
                <Sparkles className="w-8 h-8 text-tumakr-maroon" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Unique Themes</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                From Korean history and philosophy to K-Drama locations and nature
              </p>
            </div>

            <div className="p-8 rounded-xl bg-linear-to-br from-tumakr-maroon/5 to-tumakr-maroon/10 border border-tumakr-maroon/10 hover:border-tumakr-maroon/30 transition-all">
              <div className="flex w-full justify-center items-center gap-2 mb-4">
                <User className="w-8 h-8 text-tumakr-maroon" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Guides</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Passionate specialists with deep knowledge and engaging storytelling
              </p>
            </div>

            <div className="p-8 rounded-xl bg-linear-to-br from-tumakr-maroon/5 to-tumakr-maroon/10 border border-tumakr-maroon/10 hover:border-tumakr-maroon/30 transition-all">
              <div className="flex w-full justify-center items-center gap-2 mb-4">
                <Lock className="w-8 h-8 text-tumakr-maroon" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fully Private</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Customizable experience at your own pace with personalized attention
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tours Section */}
      <section id="tour-list" className="py-24 px-6 bg-linear-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl w-full">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 bg-tumakr-maroon/10 border border-tumakr-maroon/20">
              <span className="text-xs font-medium text-tumakr-maroon tracking-wide">
                OUR TOURS
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Popular Tours
            </h2>
            <p className="text-gray-600 text-lg">
              Explore Seoul through captivating themes
            </p>
          </div>

          {tours.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600">No tours available at the moment.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tours.map((tour) => (
                <TourCard
                  key={tour.bokunExperienceId}
                  tour={tour}
                  href={`/tours/themed-private/${tour.bokunExperienceId}`}
                  categoryBadge="Themed Private Tour"
                  themeColor="tumakr-maroon"
                />
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-linear-to-r from-tumakr-maroon via-tumakr-maroon/90 to-tumakr-maroon"></div>
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              }}
            ></div>

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 p-10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <Compass className="text-white" size={32} />
                </div>
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-1">Interested in Other Tours?</h3>
                  <p className="text-white/90 text-sm">
                    Explore our full collection of Group Tours, Multiday Tours, and more
                  </p>
                </div>
              </div>
              <Link href="/tours">
                <Button
                  size="lg"
                  className="bg-white text-tumakr-maroon hover:bg-white/90 font-semibold text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all"
                >
                  View All Tours
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - 6.png */}
      {/* TODO: Products & Souvenirs - 개발 후 활성화 예정 */}
      {/* <section className="py-16 px-6 flex items-center bg-tumakr-dark-blue">
        <div className="container mx-auto max-w-6xl w-full">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Gift className="text-tumakr-mustard" size={32} />
              <h2 className="text-4xl font-bold text-white">Products & Souvenirs</h2>
            </div>
            <p className="text-gray-300 text-lg">
              Take home beautiful memories of Korea with our curated selection of
              traditional products and special souvenirs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <img
                  src="/korean-traditional-hanbok-dress-pink.jpg"
                  alt="Traditional Hanbok"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white bg-tumakr-maroon">
                  Traditional
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Traditional Hanbok Set
                </h3>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <img
                  src="/korean-beauty-skincare-products.jpg"
                  alt="K-Beauty Skincare"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white bg-tumakr-mustard">
                  Beauty
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  K-Beauty Skincare Kit
                </h3>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <img
                  src="/korean-traditional-tea-set-ceramic.jpg"
                  alt="Korean Tea Collection"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white bg-tumakr-sage-green">
                  Food
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
      </section> */}

      {/* Pricing Section - 개발 후 활성화 예정 */}
      {/* <PrivateTourInquiryForm /> */}
    </div>
  );
}
