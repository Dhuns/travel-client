import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function TourCardSkeleton() {
  return (
    <Card className="overflow-hidden border-0 bg-white p-0 flex flex-col h-full animate-pulse">
      {/* Image skeleton */}
      <div className="relative h-48 overflow-hidden bg-gray-300">
        {/* Category badge skeleton */}
        <div className="absolute top-3 left-3 h-6 w-24 rounded bg-gray-400"></div>
        {/* Price badge skeleton */}
        <div className="absolute top-3 right-3 h-6 w-16 rounded bg-gray-400"></div>
        {/* Favorite button skeleton */}
        <div className="absolute bottom-3 right-3 h-10 w-10 rounded-full bg-gray-400"></div>
      </div>

      <CardHeader className="pb-2 px-6">
        {/* Title skeleton */}
        <div className="space-y-2 mb-2">
          <div className="h-5 w-full bg-gray-300 rounded"></div>
          <div className="h-5 w-4/5 bg-gray-300 rounded"></div>
        </div>
        {/* Badges skeleton */}
        <div className="flex flex-wrap gap-2">
          <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
          <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-6 flex flex-col flex-1">
        {/* Description skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
        </div>

        {/* Button skeleton */}
        <div className="mt-auto">
          <div className="h-9 w-full bg-gray-300 rounded-lg"></div>
        </div>
      </CardContent>
    </Card>
  );
}

export function TourCardGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <TourCardSkeleton key={i} />
      ))}
    </div>
  );
}
