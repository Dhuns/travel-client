import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Users } from "lucide-react";
import {
  historyToursConfig,
  multidayToursConfig,
  privateToursConfig,
} from "@/config/tours";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getToursFromConfig } from "@/lib/bokun";

export const revalidate = 3600; // 1시간마다 재생성

// 카테고리 표시명 매핑
const categoryDisplayNames: Record<string, string> = {
  history: "History Tours",
  private: "Private Tours",
  multiday: "Multiday Tours",
};

export default async function ToursPage() {
  // 모든 설정을 하나의 배열로 통합
  const allConfigs = [
    ...historyToursConfig,
    ...privateToursConfig,
    ...multidayToursConfig,
  ];

  // Bokun API에서 실제 투어 데이터 가져오기
  const allTours = await getToursFromConfig(allConfigs);

  return (
    <div className="min-h-screen bg-[#f5f3f0]">
      {/* Hero Section */}
      <div className="relative pt-20 pb-20 bg-gradient-to-r from-[#651d2a] to-[#c4982a] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('/beautiful-korean-traditional-palace-with-tourists-.jpg')",
          }}
        ></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 text-center text-white relative z-10">
          <h1 className="text-4xl font-bold mb-4 drop-shadow-lg pt-5">
            Korea Tours & Experiences
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto mb-6 drop-shadow-md">
            Discover authentic Korean culture with our expert local guides
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-8 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-[#651d2a] mb-1">6+</div>
              <div className="text-gray-600 text-sm">Tours Available</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#651d2a] mb-1">10K+</div>
              <div className="text-gray-600 text-sm">Happy Travelers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#651d2a] mb-1">4.9</div>
              <div className="text-gray-600 text-sm">Average Rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#651d2a] mb-1">24/7</div>
              <div className="text-gray-600 text-sm">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* All Tours Grid */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            All Tours & Experiences
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our complete collection of Korean tours and experiences
          </p>
          <div className="w-16 h-1 bg-[#651d2a] mx-auto mt-4 rounded-full"></div>
        </div>

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
      </div>

      {/* CTA Section */}
      <div className="bg-[#651d2a] py-8">
        <div className="container mx-auto px-6 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            Let us create a custom tour just for you. Our local experts will
            design the perfect Korean experience.
          </p>
          <Button
            size="lg"
            className="bg-white text-[#651d2a] hover:bg-gray-100 font-semibold px-6"
          >
            Create Custom Tour
          </Button>
        </div>
      </div>
    </div>
  );
}
