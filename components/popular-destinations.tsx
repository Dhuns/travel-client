import { Clock, MapPin, Star } from "lucide-react";

import { FavoriteButton } from "@/components/favorite-button";
import { Button } from "@/components/ui/button";
import { getPopularTours, transformBackendTourToFrontend } from "@/lib/bokun";
import Image from "next/image";
import Link from "next/link";

const categoryDisplayNames: Record<string, string> = {
  history: "History Tours",
  private: "Private Tours",
  multiday: "Multiday Tours",
};

export async function PopularDestinations() {
  // 백엔드 API에서 인기 투어 가져오기 (Admin에서 관리)
  const backendTours = await getPopularTours();
  const popularDestinations = backendTours
    .slice(0, 4)
    .map((tour) => transformBackendTourToFrontend(tour));

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Star className="w-8 h-8 text-tumakr-maroon mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Most Popular Destinations
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover Korea&apos;s most beloved destinations with our expert local guides
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {popularDestinations.map((tour, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col h-full"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <Image
                  src={tour.image || "/placeholder.svg"}
                  alt={tour.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-tumakr-maroon/90 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {categoryDisplayNames[tour.category]}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <FavoriteButton
                    tourId={tour.bokunExperienceId}
                    tourData={{
                      id: tour.bokunExperienceId,
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
                <h3 className="text-xl font-bold text-gray-900 mb-2">{tour.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 h-16">
                  {tour.description}
                </p>
                <div className="space-y-2 mb-4">
                  <div className="text-sm text-tumakr-mustard font-medium flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {tour.duration}
                  </div>
                  {tour.location && (
                    <div className="text-sm text-gray-500 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {tour.location}
                    </div>
                  )}
                </div>
                <Link
                  href={`/tours/${tour.category}/${tour.bokunExperienceId}`}
                  className="mt-auto"
                >
                  <Button className="w-full bg-tumakr-maroon hover:bg-tumakr-maroon/90 text-white rounded-full">
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
