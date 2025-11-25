"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function TourCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Skeleton className="w-full h-full" />
        <div className="absolute top-4 left-4">
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <div className="absolute top-4 right-4">
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-10 w-full rounded-full mt-auto" />
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
            <Skeleton className="w-8 h-8 rounded mr-3" />
            <Skeleton className="h-10 w-80" />
          </div>
          <Skeleton className="h-6 w-96 mx-auto" />
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
