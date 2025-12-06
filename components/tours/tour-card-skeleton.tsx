import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function TourCardSkeleton() {
  return (
    <Card className="overflow-hidden border-0 bg-white p-0 flex flex-col h-full">
      {/* Image skeleton */}
      <div className="relative h-48 overflow-hidden">
        <Skeleton className="w-full h-full bg-gray-200" />
        <Skeleton className="absolute top-3 left-3 h-6 w-24 rounded-full bg-gray-300" />
        <Skeleton className="absolute top-3 right-3 h-6 w-16 rounded-full bg-gray-300" />
      </div>

      <CardHeader className="pb-2 px-6">
        {/* Title skeleton */}
        <Skeleton className="h-6 w-3/4 mb-2 bg-gray-200" />
        {/* Tags skeleton */}
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-16 rounded-full bg-gray-200" />
          <Skeleton className="h-6 w-20 rounded-full bg-gray-200" />
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-6 flex flex-col flex-1">
        {/* Description skeleton */}
        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-full bg-gray-200" />
          <Skeleton className="h-4 w-full bg-gray-200" />
          <Skeleton className="h-4 w-2/3 bg-gray-200" />
        </div>

        {/* Button skeleton */}
        <Skeleton className="h-10 w-full mt-auto rounded-lg bg-gray-300" />
      </CardContent>
    </Card>
  );
}

export function TourGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <TourCardSkeleton key={index} />
      ))}
    </div>
  );
}
