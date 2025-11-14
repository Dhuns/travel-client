"use client";

import { Calendar, ChevronRight, Heart, MapPin, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/**
 * 찜한상품 페이지
 *
 * 사용자가 찜한 투어를 표시합니다.
 * - 찜 해제 기능
 * - 예약 바로가기
 */

interface WishlistItem {
  id: string;
  type: "tour";
  title: string;
  image: string;
  description: string;
  price: number;
  addedDate: string;
  details: {
    location?: string;
    duration?: string;
    participants?: number;
    category?: string;
  };
}

export default function WishlistPage() {

  // TODO: 백엔드에서 실제 찜한 상품 데이터 가져오기
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: "WISH-001",
      type: "tour",
      title: "Gyeongbokgung Palace & Royal Heritage Tour",
      image: "/beautiful-korean-traditional-palace-with-tourists-.jpg",
      description:
        "조선왕조의 정궁인 경복궁을 전문 가이드와 함께 탐방하는 프리미엄 투어",
      price: 85000,
      addedDate: "2024-01-20",
      details: {
        location: "서울, 경복궁",
        duration: "3시간",
        participants: 2,
        category: "문화유산",
      },
    },
    {
      id: "WISH-002",
      type: "tour",
      title: "DMZ & Third Tunnel Discovery Tour",
      image: "/korean-dmz-border-historical-site-and-observation-.jpg",
      description: "한반도 분단의 역사를 체험하는 DMZ 투어 프로그램",
      price: 120000,
      addedDate: "2024-01-18",
      details: {
        location: "파주, DMZ",
        duration: "6시간",
        participants: 4,
        category: "역사탐방",
      },
    },
    {
      id: "WISH-003",
      type: "tour",
      title: "Bukchon Hanok Village Cultural Experience",
      image: "/bukchon-hanok-village.jpg",
      description: "전통 한옥마을에서 한국 문화를 체험하는 프로그램",
      price: 65000,
      addedDate: "2024-01-12",
      details: {
        location: "서울, 북촌",
        duration: "2시간",
        participants: 2,
        category: "문화체험",
      },
    },
  ]);

  const removeFromWishlist = (id: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  const formatPrice = (price: number) => {
    return `₩${price.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-[#faf9f7] to-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">찜한상품</h1>
          <p className="text-gray-600">
            관심있는 투어를 저장하고 비교해보세요
          </p>
        </div>

        {/* 찜한 상품 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {wishlistItems.length === 0 ? (
            <div className="col-span-full">
              <Card className="p-12 text-center shadow-lg border border-gray-200 bg-white rounded-xl">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  찜한 상품이 없습니다
                </h3>
                <p className="text-gray-600 mb-6">
                  마음에 드는 투어를 찜하고 나중에 확인해보세요
                </p>
                <Link href="/tours">
                  <Button className="bg-[#651d2a] hover:bg-[#4a1520] text-white">
                    투어 둘러보기
                  </Button>
                </Link>
              </Card>
            </div>
          ) : (
            wishlistItems.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white rounded-xl group p-0 flex flex-col h-full"
              >
                {/* 이미지 */}
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  {/* 찜 해제 버튼 */}
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute bottom-3 right-3 transition-all hover:scale-110 group/heart"
                    aria-label="찜 해제"
                  >
                    <Heart className="w-7 h-7 text-[#d1293C] fill-[#d1293C] group-hover/heart:fill-white group-hover/heart:text-[#d1293C] transition-all drop-shadow-md cursor-pointer" />
                  </button>
                </div>

                {/* 카드 내용 */}
                <CardContent className="px-6 pt-0 pb-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {item.description}
                  </p>

                  {/* 상세 정보 */}
                  <div className="space-y-2 mb-4">
                    {item.details.location && (
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{item.details.location}</span>
                      </div>
                    )}
                    {item.details.duration && (
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{item.details.duration}</span>
                      </div>
                    )}
                    {item.details.participants && (
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Users className="w-4 h-4" />
                        <span>{item.details.participants}명</span>
                      </div>
                    )}
                  </div>

                  {/* 가격 및 액션 */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                    <div className="text-xl font-bold text-gray-900">
                      {formatPrice(item.price)}
                    </div>
                    <Link href={`/tours/${item.id}`}>
                      <Button
                        size="sm"
                        className="bg-[#651d2a] hover:bg-[#4a1520] text-white"
                      >
                        예약하기
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* 도움말 섹션 */}
        {wishlistItems.length > 0 && (
          <Card className="mt-12 bg-gradient-to-r from-[#651d2a]/5 to-[#6d8675]/5 border border-gray-200 shadow-lg rounded-xl">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                마음에 드는 투어를 찾으셨나요?
              </h3>
              <p className="text-gray-600 mb-4">
                지금 바로 예약하고 특별한 한국 여행을 시작하세요
              </p>
              <div className="flex justify-center space-x-4">
                <Link href="/chat">
                  <Button className="border border-[#651d2a] text-[#651d2a] bg-white hover:!bg-[#651d2a] hover:!text-white transition-all shadow-sm cursor-pointer">
                    AI 챗봇 상담
                  </Button>
                </Link>
                <Link href="/tours">
                  <Button className="bg-[#651d2a] hover:bg-[#4a1520] text-white">
                    더 많은 투어 보기
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
