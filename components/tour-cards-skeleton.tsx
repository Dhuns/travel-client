"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function TourCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Skeleton className="w-full h-full bg-gray-200" />
        <div className="absolute top-4 left-4">
          <Skeleton className="h-6 w-20 rounded-full bg-gray-300" />
        </div>
        <div className="absolute top-4 right-4">
          <Skeleton className="h-6 w-16 rounded-full bg-gray-300" />
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <Skeleton className="h-6 w-3/4 mb-2 bg-gray-200" />
        <Skeleton className="h-4 w-full mb-1 bg-gray-200" />
        <Skeleton className="h-4 w-full mb-1 bg-gray-200" />
        <Skeleton className="h-4 w-2/3 mb-4 bg-gray-200" />
        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-24 bg-gray-200" />
          <Skeleton className="h-4 w-32 bg-gray-200" />
        </div>
        <Skeleton className="h-10 w-full rounded-full mt-auto bg-gray-300" />
      </div>
    </div>
  );
}

export function PopularDestinationsSkeleton() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-[#651d2a] mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <polygon
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                fill="currentColor"
              />
            </svg>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Most Popular Destinations
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover Korea&apos;s most beloved destinations with our expert
            local guides
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, index) => (
            <TourCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
