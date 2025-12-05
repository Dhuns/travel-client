import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

import { FavoriteButton } from "@/components/favorite-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllTours, getEffectiveCategory } from "@/src/shared/apis/tour";
import Link from "next/link";

// 카테고리 표시명 매핑
const categoryDisplayNames: Record<string, string> = {
  history: "History Tours",
  private: "Private Tours",
  multiday: "Multiday Tours",
};

export async function TourGrid() {
  // 백엔드 API에서 모든 투어 데이터 가져오기
  const allTours = await getAllTours();

  // HTML 태그 제거 함수
  const stripHtml = (html: string) => {
    return html
      .replace(/<[^>]*>/g, "")
      .replace(/&[^;]+;/g, " ")
      .trim();
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {allTours.map((tour) => {
        const category = getEffectiveCategory(tour);
        const imageUrl = tour.thumbnailUrl || "/placeholder.svg";
        const cleanDescription = stripHtml(tour.description);

        return (
          <Card
            key={tour.bokunExperienceId}
            className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-white hover:-translate-y-1 p-0 flex flex-col h-full"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={imageUrl}
                alt={tour.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>
              <Badge className="absolute top-3 left-3 bg-tumakr-maroon/90 text-white font-medium px-3 py-1 text-xs">
                {categoryDisplayNames[category] || "Tour"}
              </Badge>
              {tour.price && (
                <Badge className="absolute top-3 right-3 bg-white text-tumakr-maroon font-bold px-3 py-1">
                  {tour.price}
                </Badge>
              )}
              <div className="absolute bottom-3 right-3">
                <FavoriteButton
                  tourId={tour.bokunExperienceId}
                  tourData={{
                    title: tour.title,
                    image: imageUrl,
                    description: cleanDescription,
                    price: tour.price || undefined,
                    duration: tour.duration,
                  }}
                />
              </div>
            </div>

            <CardHeader className="pb-2 px-6">
              <CardTitle className="text-lg text-gray-900 group-hover:text-tumakr-maroon transition-colors">
                {tour.title}
              </CardTitle>
              <div className="flex flex-wrap gap-2 text-sm">
                <div className="flex items-center space-x-1 bg-tumakr-maroon/10 px-2 py-1 rounded-full">
                  <Clock className="w-3 h-3 text-tumakr-maroon" />
                  <span className="text-tumakr-maroon font-medium text-xs">
                    {tour.duration}
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="px-6 pb-6 flex flex-col flex-1">
              <p className="text-sm text-gray-600 line-clamp-3 overflow-hidden mb-4">
                {cleanDescription}
              </p>

              <Link
                href={`/tours/${category}/${tour.bokunExperienceId}`}
                className="mt-auto"
              >
                <Button className="w-full bg-tumakr-maroon hover:bg-tumakr-maroon/90 text-white font-semibold py-2 rounded-lg transition-all duration-300">
                  Book Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
