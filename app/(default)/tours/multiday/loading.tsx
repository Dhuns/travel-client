import { Card } from "@/components/ui/card";
import { Clock, Compass, MapPin, Mountain, Quote, Shield, Sunrise } from "lucide-react";

export default function MultidayTourLoading() {
  return (
    <div className="min-h-screen bg-[#f5f3f0]">
      {/* Hero Section Skeleton */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        <div className="relative container mx-auto px-6 py-32 lg:py-40">
          <div className="max-w-2xl text-white space-y-6">
            <div className="w-96 h-14 bg-white/20 rounded animate-pulse"></div>
            <div className="space-y-3">
              <div className="w-full h-8 bg-white/20 rounded animate-pulse"></div>
              <div className="w-3/4 h-8 bg-white/20 rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="w-full h-5 bg-white/20 rounded animate-pulse"></div>
              <div className="w-5/6 h-5 bg-white/20 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Multi-day Tour Skeleton */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="w-48 h-8 bg-gray-200 rounded-full animate-pulse"></div>

              <div className="space-y-3">
                <div className="w-full h-12 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-5/6 h-12 bg-gray-200 rounded animate-pulse"></div>
              </div>

              <div className="space-y-2">
                <div className="w-full h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-full h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-4/5 h-5 bg-gray-200 rounded animate-pulse"></div>
              </div>

              <div className="space-y-2">
                <div className="w-full h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-3/4 h-5 bg-gray-200 rounded animate-pulse"></div>
              </div>

              <div className="pt-6 space-y-4">
                {[Compass, Mountain, Sunrise].map((Icon, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center shrink-0 animate-pulse">
                      <Icon className="w-6 h-6 text-gray-300" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="w-3/4 h-5 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-[600px] rounded-2xl bg-gray-200 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Tour Highlights Skeleton */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <div className="w-96 h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex justify-center">
              <div className="w-80 h-5 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* 투어 카드 스켈레톤 - 3개 */}
          <div className="space-y-8">
            {[1, 2, 3].map((index) => (
              <div key={index} className="max-w-5xl mx-auto">
                <Card className="overflow-hidden border-0 bg-white p-0 shadow-md">
                  <div className="grid md:grid-cols-5 gap-0">
                    {/* Left: Large Image Skeleton */}
                    <div className="relative md:col-span-2 h-64 md:h-auto bg-gray-200 animate-pulse">
                      <div className="absolute top-4 left-4 w-24 h-7 bg-gray-300 rounded animate-pulse"></div>
                      <div className="absolute bottom-4 right-4 w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
                    </div>

                    {/* Right: Content Skeleton */}
                    <div className="md:col-span-3 p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1 space-y-3">
                            <div className="w-3/4 h-8 bg-gray-200 rounded animate-pulse"></div>
                            <div className="flex flex-wrap gap-3">
                              <div className="w-24 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                              <div className="w-32 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                            </div>
                          </div>
                          <div className="w-20 h-10 bg-gray-200 rounded animate-pulse"></div>
                        </div>

                        <div className="space-y-2 mb-6">
                          <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse"></div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <div className="w-32 h-5 bg-gray-200 rounded animate-pulse mb-3"></div>
                            <div className="space-y-2">
                              {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-start space-x-2">
                                  <div className="w-4 h-4 bg-gray-200 rounded mt-0.5 animate-pulse"></div>
                                  <div className="flex-1 h-4 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <div className="w-32 h-5 bg-gray-200 rounded animate-pulse mb-3"></div>
                            <div className="space-y-2">
                              {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-start space-x-2">
                                  <div className="w-4 h-4 bg-gray-200 rounded mt-0.5 animate-pulse"></div>
                                  <div className="flex-1 h-4 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full md:w-48 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section Skeleton */}
      <section className="py-20 px-6 bg-linear-to-br from-tumakr-sage-green/5 to-tumakr-maroon/5">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <div className="w-56 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
            <div className="flex justify-center mb-4">
              <div className="w-80 h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex justify-center">
              <div className="w-96 h-5 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-8 border-0 shadow-lg bg-white relative">
                <Quote className="absolute top-6 right-6 w-10 h-10 text-gray-100" />
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div
                      key={star}
                      className="w-6 h-6 bg-gray-200 rounded animate-pulse"
                    ></div>
                  ))}
                </div>
                <div className="space-y-2 mb-6">
                  <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-32 h-3 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Stats Skeleton */}
          <div className="mt-16 grid md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="w-24 h-10 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="flex justify-center">
                  <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="py-20 px-6 bg-linear-to-br from-tumakr-maroon to-tumakr-maroon/90">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <div className="flex justify-center mb-6">
            <div className="w-96 h-12 bg-white/20 rounded animate-pulse"></div>
          </div>
          <div className="flex justify-center mb-10">
            <div className="w-80 h-7 bg-white/20 rounded animate-pulse"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <div className="w-56 h-14 bg-white/20 rounded-full animate-pulse"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[MapPin, Clock, Shield].map((Icon, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0 animate-pulse">
                  <Icon className="w-6 h-6 text-white/50" />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="w-32 h-5 bg-white/20 rounded animate-pulse"></div>
                  <div className="w-full h-4 bg-white/20 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore More Section Skeleton */}
      <section className="py-20 px-6 bg-linear-to-br from-tumakr-sage-green/5 to-tumakr-maroon/5 min-h-screen flex items-center">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left: Image Skeleton */}
              <div className="relative h-64 md:h-auto bg-gray-200 animate-pulse"></div>

              {/* Right: Content Skeleton */}
              <div className="p-10 md:p-12 flex flex-col justify-center">
                <div className="w-40 h-8 bg-gray-200 rounded-full animate-pulse mb-4"></div>

                <div className="space-y-3 mb-4">
                  <div className="w-full h-10 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-3/4 h-10 bg-gray-200 rounded animate-pulse"></div>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="w-full h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-5/6 h-5 bg-gray-200 rounded animate-pulse"></div>
                </div>

                <div className="space-y-3 mb-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gray-200 rounded-full shrink-0 animate-pulse"></div>
                      <div className="flex-1 h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>

                <div className="w-full h-14 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
