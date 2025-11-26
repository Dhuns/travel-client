"use client";

import { ChevronDown, Clock, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FavoriteButton } from "@/components/favorite-button";
import Link from "next/link";
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
      <div className="grid md:grid-cols-3 gap-8">
        {displayedTours.length === 0 ? (
          <div className="col-span-3 text-center py-20">
            <p className="text-gray-600">No tours available at the moment.</p>
          </div>
        ) : (
          displayedTours.map((tour, index) => (
            <Link
              key={`${tour.bokunExperienceId}-${index}`}
              href={`/tours/multiday/${tour.bokunExperienceId}`}
            >
              <Card className="p-0 overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group h-full flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={tour.image || "/placeholder.svg"}
                    alt={tour.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  {tour.price && (
                    <div className="absolute top-4 right-4 bg-white text-[#651d2a] font-bold px-3 py-1 rounded-full text-sm shadow-lg">
                      {tour.price}
                    </div>
                  )}
                  <div className="absolute bottom-4 right-4">
                    <FavoriteButton
                      tourId={`${tour.bokunExperienceId}-${index}`}
                      tourData={{
                        id: `${tour.bokunExperienceId}-${index}`,
                        title: tour.title,
                        image: tour.image || "/placeholder.svg",
                        description: tour.description,
                        price: tour.price,
                        duration: tour.duration,
                        location: tour.location,
                        bokunExperienceId: tour.bokunExperienceId,
                      }}
                    />
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#651d2a] transition-colors">
                    {tour.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {tour.duration && (
                      <div className="flex items-center gap-1 bg-[#651d2a]/10 px-2 py-1 rounded-full">
                        <Clock className="w-3 h-3 text-[#651d2a]" />
                        <span className="text-xs text-[#651d2a] font-medium">
                          {tour.duration}
                        </span>
                      </div>
                    )}
                    {tour.location && (
                      <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                        <MapPin className="w-3 h-3 text-gray-600" />
                        <span className="text-xs text-gray-600">
                          {tour.location}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {tour.description}
                  </p>
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <Button className="w-full bg-[#651d2a] hover:bg-[#651d2a]/90 text-white font-semibold">
                      View Details & Book
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
          ))
        )}
      </div>

      {hasMore && (
        <div className="text-center mt-12">
          <Button
            onClick={showMore}
            className="bg-white hover:bg-gray-50 text-[#651d2a] font-semibold px-8 py-3 rounded-full text-lg flex items-center gap-2 mx-auto shadow-lg border border-gray-200 transition-all"
          >
            <ChevronDown className="w-5 h-5" />
          </Button>
        </div>
      )}
    </>
  );
}
