import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import { FavoriteButton } from "@/components/favorite-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TourCardProps {
  tour: {
    bokunExperienceId: string;
    title: string;
    image?: string;
    description?: string;
    price?: string;
    duration?: string;
    location?: string;
  };
  href: string;
  categoryBadge?: string;
  themeColor?:
    | "tumakr-maroon"
    | "tumakr-mustard"
    | "tumakr-sage-green"
    | "tumakr-dusty-pink"
    | "tumakr-dark-blue";
}

// 테마별 색상 클래스 매핑
const themeClasses = {
  "tumakr-maroon": {
    badgeBg: "bg-tumakr-maroon/10",
    badgeText: "text-tumakr-maroon",
    iconColor: "text-tumakr-maroon",
    buttonBg: "bg-tumakr-maroon hover:bg-tumakr-maroon/90",
    titleHover: "group-hover:text-tumakr-maroon",
    priceText: "text-tumakr-maroon",
  },
  "tumakr-mustard": {
    badgeBg: "bg-tumakr-mustard/10",
    badgeText: "text-tumakr-mustard",
    iconColor: "text-tumakr-mustard",
    buttonBg: "bg-tumakr-mustard hover:bg-tumakr-mustard/90",
    titleHover: "group-hover:text-tumakr-mustard",
    priceText: "text-tumakr-mustard",
  },
  "tumakr-sage-green": {
    badgeBg: "bg-tumakr-sage-green/10",
    badgeText: "text-tumakr-sage-green",
    iconColor: "text-tumakr-sage-green",
    buttonBg: "bg-tumakr-sage-green hover:bg-tumakr-sage-green/90",
    titleHover: "group-hover:text-tumakr-sage-green",
    priceText: "text-tumakr-sage-green",
  },
  "tumakr-dusty-pink": {
    badgeBg: "bg-tumakr-dusty-pink/10",
    badgeText: "text-tumakr-dusty-pink",
    iconColor: "text-tumakr-dusty-pink",
    buttonBg: "bg-tumakr-dusty-pink hover:bg-tumakr-dusty-pink/90",
    titleHover: "group-hover:text-tumakr-dusty-pink",
    priceText: "text-tumakr-dusty-pink",
  },
  "tumakr-dark-blue": {
    badgeBg: "bg-tumakr-dark-blue/10",
    badgeText: "text-tumakr-dark-blue",
    iconColor: "text-tumakr-dark-blue",
    buttonBg: "bg-tumakr-dark-blue hover:bg-tumakr-dark-blue/90",
    titleHover: "group-hover:text-tumakr-dark-blue",
    priceText: "text-tumakr-dark-blue",
  },
};

// HTML 태그 제거 함수
const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ").trim();
};

export function TourCard({
  tour,
  href,
  categoryBadge,
  themeColor = "tumakr-maroon",
}: TourCardProps) {
  const theme = themeClasses[themeColor];
  const cleanDescription = tour.description ? stripHtml(tour.description) : "";

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-white hover:-translate-y-1 p-0 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img
          src={tour.image || "/placeholder.svg"}
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>
        {categoryBadge && (
          <Badge className="absolute top-3 left-3 bg-tumakr-maroon/90 text-white font-medium px-3 py-1 text-xs">
            {categoryBadge}
          </Badge>
        )}
        {tour.price && (
          <Badge
            className={cn(
              "absolute top-3 right-3 bg-white font-bold px-3 py-1",
              theme.priceText
            )}
          >
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
              description: cleanDescription,
              price: tour.price,
              duration: tour.duration,
              location: tour.location,
              bokunExperienceId: tour.bokunExperienceId,
            }}
          />
        </div>
      </div>

      <CardHeader className="pb-2 px-6">
        <CardTitle
          className={cn(
            "text-lg text-gray-900 transition-colors",
            theme.titleHover
          )}
        >
          {tour.title}
        </CardTitle>
        <div className="flex flex-wrap gap-2 text-sm">
          {tour.duration && (
            <div
              className={cn(
                "flex items-center space-x-1 px-2 py-1 rounded-full",
                theme.badgeBg
              )}
            >
              <Clock className={cn("w-3 h-3", theme.iconColor)} />
              <span className={cn("font-medium text-xs", theme.badgeText)}>
                {tour.duration}
              </span>
            </div>
          )}
          {tour.location && (
            <div className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full">
              <MapPin className="w-3 h-3 text-gray-600" />
              <span className="font-medium text-xs text-gray-600">
                {tour.location}
              </span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-6 flex flex-col flex-1">
        <p className="text-sm text-gray-600 line-clamp-3 overflow-hidden mb-4">
          {cleanDescription}
        </p>

        <Link href={href} className="mt-auto">
          <Button
            className={cn(
              "w-full text-white font-semibold py-2 rounded-lg transition-all duration-300",
              theme.buttonBg
            )}
          >
            Book Now
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

