import { Calendar, MapPin, Users } from "lucide-react";

export default function PrivateTourLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section Skeleton */}
      <section className="relative px-6 min-h-screen flex items-center">
        {/* 배경 이미지 스켈레톤 */}
        <div className="absolute inset-0 z-0 bg-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/70"></div>
        </div>

        {/* 콘텐츠 스켈레톤 */}
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          {/* 로고와 부제목 스켈레톤 */}
          <div className="flex justify-center mb-2">
            <div className="w-80 h-9 bg-white/20 rounded animate-pulse"></div>
          </div>

          {/* 배지 스켈레톤 */}
          <div className="flex justify-center mb-8">
            <div className="w-96 h-10 bg-white/20 rounded-full animate-pulse"></div>
          </div>

          {/* 메인 제목 스켈레톤 */}
          <div className="flex flex-col items-center gap-3 mb-6">
            <div className="w-96 h-12 bg-white/20 rounded animate-pulse"></div>
            <div className="w-80 h-12 bg-white/20 rounded animate-pulse"></div>
          </div>

          {/* 설명 스켈레톤 */}
          <div className="flex flex-col items-center gap-2 mb-12 max-w-3xl mx-auto">
            <div className="w-full h-5 bg-white/20 rounded animate-pulse"></div>
            <div className="w-5/6 h-5 bg-white/20 rounded animate-pulse"></div>
            <div className="w-4/5 h-5 bg-white/20 rounded animate-pulse"></div>
          </div>

          {/* CTA 버튼 스켈레톤 */}
          <div className="flex justify-center">
            <div className="w-44 h-12 bg-white/20 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* What Makes Special Section Skeleton */}
      <section className="py-16 px-6 min-h-screen flex items-center">
        <div className="container mx-auto max-w-6xl w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* 왼쪽: 텍스트 스켈레톤 */}
            <div className="space-y-4">
              {/* 제목 스켈레톤 */}
              <div className="space-y-2">
                <div className="w-80 h-10 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-64 h-10 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* 설명 스켈레톤 */}
              <div className="space-y-2 pt-4">
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>

              <div className="space-y-2">
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-4/5 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>

              <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>

              {/* 체크리스트 스켈레톤 */}
              <div className="space-y-4 pt-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse shrink-0 mt-1"></div>
                    <div className="flex-1 space-y-2">
                      <div className="w-3/4 h-5 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 오른쪽: 이미지 스켈레톤 */}
            <div className="relative">
              <div className="w-full h-[600px] bg-gray-200 rounded-2xl animate-pulse"></div>
              {/* 평점 배지 스켈레톤 */}
              <div className="absolute bottom-6 left-6 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tours Section Skeleton */}
      <section className="py-16 px-6 min-h-screen flex items-center bg-linear-to-br from-tumakr-dusty-pink/10 to-tumakr-sage-green/10">
        <div className="container mx-auto max-w-6xl w-full">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-80 h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex justify-center">
              <div className="w-96 h-5 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          <div className="space-y-8">
            {/* 첫 줄: 2개의 큰 카드 스켈레톤 */}
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2].map((index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                  <div className="relative h-72 bg-gray-200 animate-pulse">
                    {/* Badge Skeleton */}
                    <div className="absolute top-4 left-4 w-24 h-6 bg-gray-300 rounded-full animate-pulse"></div>
                    {/* Favorite Button Skeleton */}
                    <div className="absolute bottom-3 right-3 w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
                  </div>
                  <div className="p-6 space-y-4">
                    {/* Location & Duration Skeleton */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                    {/* Title Skeleton */}
                    <div className="w-3/4 h-7 bg-gray-200 rounded animate-pulse"></div>
                    {/* Description Skeleton */}
                    <div className="space-y-2">
                      <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    {/* Price Skeleton */}
                    <div className="w-28 h-8 bg-gray-200 rounded animate-pulse"></div>
                    {/* Button Skeleton */}
                    <div className="w-full h-10 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* 둘째 줄: 3개의 작은 카드 스켈레톤 */}
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                  <div className="relative h-48 bg-gray-200 animate-pulse">
                    {/* Badge Skeleton */}
                    <div className="absolute top-4 left-4 w-20 h-6 bg-gray-300 rounded-full animate-pulse"></div>
                    {/* Favorite Button Skeleton */}
                    <div className="absolute bottom-3 right-3 w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
                  </div>
                  <div className="p-5 space-y-3">
                    {/* Location & Duration Skeleton */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-16 h-3 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-12 h-3 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                    {/* Title Skeleton */}
                    <div className="space-y-2">
                      <div className="w-full h-5 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-2/3 h-5 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    {/* Description Skeleton */}
                    <div className="space-y-2">
                      <div className="w-full h-3 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-4/5 h-3 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    {/* Price Skeleton */}
                    <div className="w-24 h-7 bg-gray-200 rounded animate-pulse"></div>
                    {/* Button Skeleton */}
                    <div className="w-full h-9 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chatbot CTA Skeleton */}
          <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 bg-gray-200 rounded-2xl p-8 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gray-300 animate-pulse"></div>
              <div className="space-y-2">
                <div className="w-48 h-6 bg-gray-300 rounded animate-pulse"></div>
                <div className="w-64 h-4 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="w-40 h-12 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section Skeleton */}
      <section className="py-16 px-6 flex items-center bg-white">
        <div className="container mx-auto max-w-6xl w-full">
          <div className="grid md:grid-cols-3 gap-8">
            {[Users, MapPin, Calendar].map((Icon, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 text-center shadow-sm">
                <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center bg-gray-200 animate-pulse">
                  <Icon className="text-gray-300" size={28} />
                </div>
                <div className="flex justify-center mb-4">
                  <div className="w-48 h-6 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse mx-auto"></div>
                  <div className="w-4/5 h-4 bg-gray-200 rounded animate-pulse mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Section Skeleton */}
      <section className="py-16 px-6 min-h-screen flex items-center">
        <div className="container mx-auto max-w-6xl w-full">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <div className="w-80 h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex justify-center">
              <div className="w-96 h-5 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Storytelling 1 Skeleton */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative">
              <div className="w-full h-[400px] bg-gray-200 rounded-2xl animate-pulse"></div>
            </div>
            <div className="space-y-4">
              <div className="w-32 h-6 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="space-y-2">
                <div className="w-full h-9 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-5/6 h-9 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="space-y-2 pt-2">
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Storytelling 2 Skeleton */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4 order-2 md:order-1">
              <div className="w-32 h-6 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="space-y-2">
                <div className="w-full h-9 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-5/6 h-9 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="space-y-2 pt-2">
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="relative order-1 md:order-2">
              <div className="space-y-4">
                <div className="w-full h-[250px] bg-gray-200 rounded-2xl animate-pulse"></div>
                <div className="w-full h-[250px] bg-gray-200 rounded-2xl animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
