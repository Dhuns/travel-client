"use client";

import { TourCard } from "@/components/tours/tour-card";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface Tour {
  bokunExperienceId: string;
  title: string;
  image: string;
  price?: string;
  duration?: string;
  location?: string;
  description: string;
}

interface MultidayTourListProps {
  tours: Tour[];
  initialDisplayCount?: number;
}

export default function MultidayTourList({
  tours,
  initialDisplayCount = 3,
}: MultidayTourListProps) {
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);

  const showMore = () => {
    setDisplayCount((prev) => prev + 3);
  };

  const displayedTours = tours.slice(0, displayCount);
  const hasMore = displayCount < tours.length;

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedTours.length === 0 ? (
          <div className="col-span-3 text-center py-20">
            <p className="text-gray-600">No tours available at the moment.</p>
          </div>
        ) : (
          displayedTours.map((tour, index) => (
            <TourCard
              key={`${tour.bokunExperienceId}-${index}`}
              tour={tour}
              href={`/tours/multiday/${tour.bokunExperienceId}`}
              categoryBadge="Multiday Tour"
              themeColor="tumakr-maroon"
            />
          ))
        )}
      </div>

      {hasMore && (
        <div className="text-center mt-12">
          <Button
            onClick={showMore}
            className="bg-white hover:bg-gray-50 text-tumakr-maroon font-semibold px-8 py-3 rounded-full text-lg flex items-center gap-2 mx-auto shadow-lg border border-gray-200 transition-all"
          >
            <ChevronDown className="w-5 h-5" />
          </Button>
        </div>
      )}
    </>
  );
}
