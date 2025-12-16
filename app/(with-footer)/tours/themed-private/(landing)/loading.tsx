import { TourCardGridSkeleton } from "@/components/tours/tour-card-skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center w-full mx-auto bg-white animate-pulse">
      {/* Hero Section Skeleton */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden w-full ">
        <div className="md:py-24 container mx-auto max-w-5xl px-6 relative z-10 text-center">
          {/* 배지 스켈레톤 */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8 bg-gray-300 w-56 h-8"></div>

          {/* 메인 제목 스켈레톤 */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="bg-gray-300 h-16 w-96 rounded-lg"></div>
            <div className="bg-gray-300 h-16 w-80 rounded-lg"></div>
          </div>

          {/* 설명 스켈레톤 */}
          <div className="flex flex-col items-center gap-3 mb-10">
            <div className="bg-gray-300 h-6 w-[600px] rounded"></div>
            <div className="bg-gray-300 h-6 w-[550px] rounded"></div>
          </div>

          {/* CTA 버튼 스켈레톤 */}
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="bg-gray-300 h-14 w-44 rounded-lg"></div>
            <div className="bg-gray-300 h-14 w-44 rounded-lg"></div>
          </div>

          {/* 통계 정보 스켈레톤 */}
          <div className="mt-16 grid sm:grid-cols-3 grid-cols-1 rounded-xl p-6 gap-6 sm:max-w-3xl max-w-[300px] mx-auto">
            <div className="text-center bg-gray-100 p-6 border rounded-xl">
              <div className="bg-gray-300 h-10 w-20 mx-auto mb-2 rounded"></div>
              <div className="bg-gray-300 h-4 w-28 mx-auto rounded"></div>
            </div>
            <div className="text-center bg-gray-100 p-6 border rounded-xl">
              <div className="bg-gray-300 h-10 w-20 mx-auto mb-2 rounded"></div>
              <div className="bg-gray-300 h-4 w-28 mx-auto rounded"></div>
            </div>
            <div className="text-center bg-gray-100 p-6 border rounded-xl">
              <div className="bg-gray-300 h-10 w-20 mx-auto mb-2 rounded"></div>
              <div className="bg-gray-300 h-4 w-28 mx-auto rounded"></div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl w-full mx-auto md:px-8 px-4">
        {/* What Makes Special Section Skeleton */}
        <section className="py-24 bg-white">
          <div className="text-center">
            <div className="bg-gray-200 h-7 w-32 mx-auto rounded-full mb-6"></div>

            <div className="flex flex-col items-center gap-3 mb-6">
              <div className="bg-gray-300 h-12 w-96 rounded-lg"></div>
            </div>

            <div className="flex flex-col items-center gap-2 mb-8">
              <div className="bg-gray-200 h-5 w-[600px] rounded"></div>
              <div className="bg-gray-200 h-5 w-[550px] rounded"></div>
            </div>

            {/* 특징 카드 스켈레톤 */}
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-8 rounded-xl bg-gray-100 border border-gray-200"
                >
                  <div className="bg-gray-300 h-12 w-12 mx-auto mb-4 rounded-full"></div>
                  <div className="bg-gray-300 h-6 w-32 mx-auto mb-3 rounded"></div>
                  <div className="space-y-2">
                    <div className="bg-gray-200 h-4 w-full rounded"></div>
                    <div className="bg-gray-200 h-4 w-5/6 mx-auto rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Tours Section Skeleton */}
        <section className="py-24">
          <div className="w-full">
            <div className="text-center mb-16">
              <div className="bg-gray-200 h-7 w-28 mx-auto rounded-full mb-6"></div>
              <div className="bg-gray-300 h-12 w-80 mx-auto rounded-lg mb-4"></div>
              <div className="bg-gray-200 h-6 w-96 mx-auto rounded"></div>
            </div>

            <TourCardGridSkeleton count={8} />

            {/* CTA 스켈레톤 */}
            <div className="mt-16 rounded-2xl bg-gray-300 p-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-400"></div>
                  <div className="space-y-2">
                    <div className="bg-gray-400 h-7 w-64 rounded"></div>
                    <div className="bg-gray-400 h-4 w-80 rounded"></div>
                  </div>
                </div>
                <div className="bg-gray-400 h-14 w-44 rounded-lg"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
