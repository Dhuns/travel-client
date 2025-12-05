import { Card } from "@/components/ui/card";
import { BookOpen, Calendar, Sparkles, Users } from "lucide-react";

export default function HistoryTourLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section Skeleton */}
      <section className="relative min-h-screen flex items-center px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* 왼쪽: 텍스트 콘텐츠 스켈레톤 */}
            <div className="space-y-4">
              {/* Badge Skeleton */}
              <div className="w-32 h-8 bg-gray-200 rounded animate-pulse"></div>

              {/* Title Skeleton */}
              <div className="space-y-3">
                <div className="w-3/4 h-12 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-2/3 h-12 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Description Skeleton */}
              <div className="space-y-2 pt-4">
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>

              <div className="space-y-2">
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-4/5 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Button Skeleton */}
              <div className="pt-4">
                <div className="w-40 h-12 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Icons Row Skeleton */}
              <div className="flex items-center gap-6 pt-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* 오른쪽: 이미지 스켈레톤 */}
            <div className="relative h-[550px] rounded-2xl bg-gray-200 animate-pulse overflow-hidden">
              {/* 왼쪽 하단 모달 스켈레톤 */}
              <div className="absolute bottom-6 left-6 bg-white rounded-lg shadow-lg p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="space-y-2">
                  <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-20 h-3 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why is Korean History Special Section Skeleton */}
      <section className="min-h-screen flex items-center px-6 bg-linear-to-br from-tumakr-dusty-pink/10 to-tumakr-sage-green/10">
        <div className="container mx-auto max-w-7xl py-20">
          {/* Title Skeleton */}
          <div className="flex justify-center mb-16">
            <div className="w-96 h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* 이미지 스켈레톤 */}
            <div className="relative h-[350px] rounded-2xl bg-gray-200 animate-pulse"></div>

            {/* 텍스트 스켈레톤 */}
            <div className="space-y-4">
              <div className="w-3/4 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="space-y-2">
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="space-y-2 pt-2">
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-4/5 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* 두 번째 섹션 스켈레톤 - 역순 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* 텍스트 스켈레톤 */}
            <div className="space-y-4 order-2 md:order-1">
              <div className="w-3/4 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="space-y-2">
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="space-y-2 pt-2">
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-4/5 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            {/* 이미지 스켈레톤 */}
            <div className="relative h-[350px] rounded-2xl bg-gray-200 animate-pulse order-1 md:order-2"></div>
          </div>
        </div>
      </section>

      {/* Historical Destinations Section Skeleton */}
      <section className="min-h-screen flex items-center px-6 bg-white">
        <div className="container mx-auto max-w-7xl py-20">
          {/* Title Skeleton */}
          <div className="flex justify-center mb-4">
            <div className="w-96 h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex justify-center mb-16">
            <div className="w-80 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="space-y-8">
            {/* 투어 카드 스켈레톤 - 3개 */}
            {[1, 2, 3].map((index) => (
              <div key={index} className="max-w-5xl mx-auto">
                <Card className="overflow-hidden border-0 bg-white p-0 shadow-md">
                  <div className="grid md:grid-cols-5 gap-0">
                    {/* Left: Large Image Skeleton */}
                    <div className="relative md:col-span-2 h-64 md:h-auto bg-gray-200 animate-pulse">
                      {/* Badge Skeleton */}
                      <div className="absolute top-4 left-4 w-24 h-7 bg-gray-300 rounded animate-pulse"></div>
                      {/* Favorite Button Skeleton */}
                      <div className="absolute bottom-4 right-4 w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
                    </div>

                    {/* Right: Content Skeleton */}
                    <div className="md:col-span-3 p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1 space-y-3">
                            {/* Title Skeleton */}
                            <div className="w-3/4 h-8 bg-gray-200 rounded animate-pulse"></div>
                            {/* Tags Skeleton */}
                            <div className="flex flex-wrap gap-3">
                              <div className="w-24 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                              <div className="w-32 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                            </div>
                          </div>
                          {/* Price Skeleton */}
                          <div className="w-20 h-10 bg-gray-200 rounded animate-pulse"></div>
                        </div>

                        {/* Description Skeleton */}
                        <div className="space-y-2 mb-6">
                          <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse"></div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          {/* Included Skeleton */}
                          <div>
                            <div className="w-32 h-5 bg-gray-200 rounded animate-pulse mb-3"></div>
                            <div className="space-y-2">
                              {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-start space-x-2">
                                  <div className="w-4 h-4 bg-gray-200 rounded mt-0.5 animate-pulse"></div>
                                  <div className="flex-1 h-4 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Excluded Skeleton */}
                          <div>
                            <div className="w-32 h-5 bg-gray-200 rounded animate-pulse mb-3"></div>
                            <div className="space-y-2">
                              {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-start space-x-2">
                                  <div className="w-4 h-4 bg-gray-200 rounded mt-0.5 animate-pulse"></div>
                                  <div className="flex-1 h-4 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Highlights Skeleton */}
                        <div className="mb-6">
                          <div className="w-32 h-5 bg-gray-200 rounded animate-pulse mb-3"></div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {[1, 2, 3, 4].map((i) => (
                              <div key={i} className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-gray-200 rounded-full animate-pulse"></div>
                                <div className="flex-1 h-4 bg-gray-200 rounded animate-pulse"></div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Button Skeleton */}
                      <div className="w-full md:w-48 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feel the Breath of History Section Skeleton */}
      <section className="flex items-center px-6 bg-gray-50">
        <div className="container mx-auto max-w-7xl py-32">
          {/* Title Skeleton */}
          <div className="flex justify-center mb-4">
            <div className="w-80 h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex justify-center mb-16">
            <div className="w-64 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[BookOpen, Calendar, Users, Sparkles].map((Icon, i) => (
              <Card
                key={i}
                className="text-center p-8 shadow-lg bg-white border border-gray-200"
              >
                {/* Icon Skeleton */}
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Icon className="w-8 h-8 text-gray-300" />
                </div>
                {/* Title Skeleton */}
                <div className="flex justify-center mb-4">
                  <div className="w-48 h-6 bg-gray-200 rounded animate-pulse"></div>
                </div>
                {/* Description Skeleton */}
                <div className="space-y-2">
                  <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse mx-auto"></div>
                </div>
              </Card>
            ))}
          </div>

          {/* Quote Box Skeleton */}
          <div className="mt-12 p-6 bg-white rounded-lg text-center shadow-lg border border-gray-200">
            <div className="space-y-2">
              <div className="flex justify-center">
                <div className="w-80 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex justify-center">
                <div className="w-96 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
