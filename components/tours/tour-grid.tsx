import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Users } from "lucide-react";
import {
  historyToursConfig,
  multidayToursConfig,
  privateToursConfig,
} from "@/config/tours";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FavoriteButton } from "@/components/favorite-button";
import Link from "next/link";
import { getToursFromConfig } from "@/lib/bokun";

// 카테고리 표시명 매핑
const categoryDisplayNames: Record<string, string> = {
  history: "History Tours",
  private: "Private Tours",
  multiday: "Multiday Tours",
};

export async function TourGrid() {
  // 모든 설정을 하나의 배열로 통합
  const allConfigs = [
    ...historyToursConfig,
    ...privateToursConfig,
    ...multidayToursConfig,
  ];

  // Bokun API에서 실제 투어 데이터 가져오기
  const allTours = await getToursFromConfig(allConfigs);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {allTours.map((tour) => (
        <Card
          key={tour.bokunExperienceId}
          className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-white hover:-translate-y-1 p-0 flex flex-col h-full"
        >
          <div className="relative h-48 overflow-hidden">
            <img
              src={tour.image || "/placeholder.svg"}
              alt={tour.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            <Badge className="absolute top-3 left-3 bg-[#651d2a]/90 text-white font-medium px-3 py-1 text-xs">
              {categoryDisplayNames[tour.category]}
            </Badge>
            {tour.price && (
              <Badge className="absolute top-3 right-3 bg-white text-[#651d2a] font-bold px-3 py-1">
                {tour.price}
              </Badge>
            )}
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

          <CardHeader className="pb-2 px-6">
            <CardTitle className="text-lg text-gray-900 group-hover:text-[#651d2a] transition-colors">
              {tour.title}
            </CardTitle>
            <div className="flex flex-wrap gap-2 text-sm">
              <div className="flex items-center space-x-1 bg-[#651d2a]/10 px-2 py-1 rounded-full">
                <Clock className="w-3 h-3 text-[#651d2a]" />
                <span className="text-[#651d2a] font-medium text-xs">
                  {tour.duration}
                </span>
              </div>
              {tour.location && (
                <div className="flex items-center space-x-1 bg-[#6d8675]/10 px-2 py-1 rounded-full">
                  <Users className="w-3 h-3 text-[#6d8675]" />
                  <span className="text-[#6d8675] font-medium text-xs">
                    {tour.location}
                  </span>
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="px-6 pb-6 flex flex-col flex-1">
            <p className="text-sm text-gray-600 line-clamp-3 overflow-hidden mb-4 ">
              {tour.description}
            </p>

            <Link
              href={`/tours/${tour.category}/${tour.bokunExperienceId}`}
              className="mt-auto"
            >
              <Button className="w-full bg-[#651d2a] hover:bg-[#651d2a]/90 text-white font-semibold py-2 rounded-lg transition-all duration-300">
                Book Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
