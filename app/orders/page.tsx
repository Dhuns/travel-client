"use client";

import { Calendar, ChevronRight, MapPin, Package, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/**
 * 주문내역 페이지
 *
 * 사용자의 투어 예약 및 견적 요청 내역을 표시합니다.
 * - 주문 필터링 (전체, 투어, 견적서)
 * - 주문 상태별 표시 (완료, 취소, 견적 검토중, 견적서 도착, 견적 승인됨)
 * - 상세보기 링크
 */

interface Order {
  id: string;
  type: "tour" | "quote";
  title: string;
  image: string;
  date: string;
  status:
    | "completed"
    | "cancelled"
    | "quote-pending"
    | "quote-received"
    | "quote-approved";
  price: number;
  details: {
    location?: string;
    participants?: number;
    tourDate?: string;
    quoteDetails?: string;
    quoteStage?: 1 | 2;
  };
}

export default function OrdersPage() {
  const [filter, setFilter] = useState<"all" | "tour" | "quote">(
    "all"
  );

  // TODO: 백엔드에서 실제 주문 데이터 가져오기
  const orders: Order[] = [
    {
      id: "QUOTE-2024-001",
      type: "quote",
      title: "맞춤형 패밀리 투어 견적 요청",
      image: "/beautiful-korean-traditional-palace-with-tourists-.jpg",
      date: "2024-01-25",
      status: "quote-pending",
      price: 0,
      details: {
        location: "서울, 경주, 부산",
        participants: 4,
        tourDate: "2024-03-15 ~ 2024-03-20",
        quoteDetails: "5박 6일 패밀리 투어 - 문화체험, 한복체험, 전통음식 포함",
        quoteStage: 1,
      },
    },
    {
      id: "QUOTE-2024-002",
      type: "quote",
      title: "기업 단체 투어 견적 요청",
      image: "/korean-dmz-border-historical-site-and-observation-.jpg",
      date: "2024-01-18",
      status: "quote-received",
      price: 2800000,
      details: {
        location: "서울, DMZ",
        participants: 25,
        tourDate: "2024-02-28 ~ 2024-03-01",
        quoteDetails: "2일 기업 워크샵 투어 - 팀빌딩 액티비티, 한식 디너 포함",
        quoteStage: 2,
      },
    },
    {
      id: "QUOTE-2023-050",
      type: "quote",
      title: "웨딩 포토 투어 견적 요청",
      image: "/bukchon-hanok-village.jpg",
      date: "2023-12-20",
      status: "quote-approved",
      price: 580000,
      details: {
        location: "경복궁, 북촌한옥마을",
        participants: 2,
        tourDate: "2024-04-05",
        quoteDetails: "한복 웨딩 포토 투어 - 전문 사진작가, 한복 대여 포함",
        quoteStage: 2,
      },
    },
    {
      id: "ORD-2024-001",
      type: "tour",
      title: "Gyeongbokgung Palace & Royal Heritage Tour",
      image: "/beautiful-korean-traditional-palace-with-tourists-.jpg",
      date: "2024-01-15",
      status: "completed",
      price: 85000,
      details: {
        location: "Seoul, Korea",
        participants: 2,
        tourDate: "2024-02-10",
      },
    },
    {
      id: "ORD-2024-002",
      type: "tour",
      title: "DMZ & Third Tunnel Discovery Tour",
      image: "/korean-dmz-border-historical-site-and-observation-.jpg",
      date: "2024-01-10",
      status: "completed",
      price: 120000,
      details: {
        location: "DMZ, Korea",
        participants: 3,
        tourDate: "2024-01-20",
      },
    },
    {
      id: "ORD-2024-004",
      type: "tour",
      title: "Bukchon Hanok Village Cultural Experience",
      image: "/bukchon-hanok-village.jpg",
      date: "2024-01-20",
      status: "completed",
      price: 65000,
      details: {
        location: "Seoul, Korea",
        participants: 1,
        tourDate: "2024-02-25",
      },
    },
    {
      id: "ORD-2023-099",
      type: "tour",
      title: "Jeju Island 3-Day Adventure Tour",
      image: "/beautiful-jeju-island-hallasan-mountain-and-nature.jpg",
      date: "2023-12-15",
      status: "cancelled",
      price: 450000,
      details: {
        location: "Jeju Island, Korea",
        participants: 2,
        tourDate: "2024-01-08",
      },
    },
  ];

  const filteredOrders =
    filter === "all" ? orders : orders.filter((order) => order.type === filter);

  const getStatusBadge = (status: Order["status"]) => {
    const statusConfig = {
      completed: { label: "구매완료", color: "bg-[#6d8675] text-white" },
      cancelled: { label: "취소됨", color: "bg-[#8b4a52] text-white" },
      "quote-pending": {
        label: "1차 견적 검토중",
        color: "bg-[#6d8675] text-white animate-pulse",
      },
      "quote-received": {
        label: "2차 견적서 도착",
        color: "bg-[#c4982a] text-white",
      },
      "quote-approved": {
        label: "견적 승인됨",
        color: "bg-[#5a7263] text-white",
      },
    };
    const config = statusConfig[status];
    return (
      <Badge className={`${config.color} px-3 py-1`}>{config.label}</Badge>
    );
  };

  const formatPrice = (price: number) => {
    return `₩${price.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-[#faf9f7] to-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">주문내역</h1>
          <p className="text-gray-600">
            투어 예약 및 견적 요청 내역을 확인하세요
          </p>
        </div>

        {/* 필터 버튼 */}
        <div className="flex items-center space-x-3 mb-8">
          <Button
            onClick={() => setFilter("all")}
            className={
              filter === "all"
                ? "border border-[#651d2a] bg-[#651d2a] hover:bg-[#4a1520] text-white transition-all shadow-sm"
                : "border border-[#651d2a] text-[#651d2a] bg-white hover:!bg-[#651d2a] hover:!text-white transition-all shadow-sm cursor-pointer"
            }
          >
            전체
          </Button>
          <Button
            onClick={() => setFilter("quote")}
            className={
              filter === "quote"
                ? "border border-[#651d2a] bg-[#651d2a] hover:bg-[#4a1520] text-white transition-all shadow-sm"
                : "border border-[#651d2a] text-[#651d2a] bg-white hover:!bg-[#651d2a] hover:!text-white transition-all shadow-sm cursor-pointer"
            }
          >
            견적 요청
          </Button>
          <Button
            onClick={() => setFilter("tour")}
            className={
              filter === "tour"
                ? "border border-[#651d2a] bg-[#651d2a] hover:bg-[#4a1520] text-white transition-all shadow-sm"
                : "border border-[#651d2a] text-[#651d2a] bg-white hover:!bg-[#651d2a] hover:!text-white transition-all shadow-sm cursor-pointer"
            }
          >
            투어 예약
          </Button>
        </div>

        {/* 주문 목록 */}
        <div className="space-y-8">
          {filteredOrders.length === 0 ? (
            <Card className="p-12 text-center shadow-lg border border-gray-200 bg-white rounded-xl">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                주문 내역이 없습니다
              </h3>
              <p className="text-gray-600 mb-6">
                새로운 투어를 예약하거나 견적을 요청해보세요
              </p>
              <Link href="/tours">
                <Button className="bg-[#651d2a] hover:bg-[#4a1520] text-white">
                  투어 둘러보기
                </Button>
              </Link>
            </Card>
          ) : (
            filteredOrders.map((order) => (
              <Card
                key={order.id}
                className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 p-0 border border-gray-200 bg-white rounded-xl"
              >
                {order.type === "quote" ? (
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          {getStatusBadge(order.status)}
                          {order.details.quoteStage && (
                            <Badge className="bg-[#651d2a] text-white">
                              {order.details.quoteStage}차 견적
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {order.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          견적번호: {order.id}
                        </p>
                      </div>
                      <div className="text-right">
                        {order.status === "quote-pending" ? (
                          <div className="text-center">
                            <div className="inline-flex items-center space-x-2 bg-[#6d8675]/10 rounded-lg px-4 py-2">
                              <div className="w-2 h-2 bg-[#6d8675] rounded-full animate-pulse"></div>
                              <p className="text-sm font-semibold text-[#6d8675]">
                                1차 견적 검토 중...
                              </p>
                            </div>
                          </div>
                        ) : order.price === 0 ? (
                          <p className="text-lg font-semibold text-gray-500">
                            견적 대기중
                          </p>
                        ) : (
                          <p className="text-2xl font-bold text-gray-900">
                            {formatPrice(order.price)}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* 견적서 상세 정보 */}
                    {order.details.quoteDetails && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-4 border-l-4 border-gray-300">
                        <p className="text-sm font-semibold text-gray-900 mb-1">
                          요청 내용:
                        </p>
                        <p className="text-sm text-gray-700">
                          {order.details.quoteDetails}
                        </p>
                      </div>
                    )}

                    {/* 상세 정보 */}
                    <div className="grid md:grid-cols-3 gap-4 mb-4 text-sm">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>주문일: {order.date}</span>
                      </div>
                      {order.details.location && (
                        <div className="flex items-center space-x-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{order.details.location}</span>
                        </div>
                      )}
                      {order.details.participants && (
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>{order.details.participants}명</span>
                        </div>
                      )}
                    </div>

                    {/* 견적 진행 상태 타임라인 */}
                    <div className="bg-gradient-to-r from-[#6d8675]/10 to-[#c4982a]/10 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col items-center flex-1">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                              order.details.quoteStage &&
                              order.details.quoteStage >= 1
                                ? "bg-[#6d8675] text-white"
                                : "bg-gray-300 text-gray-600"
                            }`}
                          >
                            ✓
                          </div>
                          <p className="text-xs font-semibold text-gray-700">
                            1차 견적 제출
                          </p>
                        </div>
                        <div className="flex-1 h-1 bg-gray-300 relative">
                          <div
                            className={`absolute left-0 top-0 h-full transition-all duration-500 ${
                              order.status === "quote-received" ||
                              order.status === "quote-approved"
                                ? "bg-[#5a7263] w-full"
                                : "bg-[#6d8675] w-1/2 animate-pulse"
                            }`}
                          ></div>
                        </div>
                        <div className="flex flex-col items-center flex-1">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                              order.status === "quote-received" ||
                              order.status === "quote-approved"
                                ? "bg-[#5a7263] text-white"
                                : order.status === "quote-pending"
                                ? "bg-[#c4982a] text-white animate-pulse"
                                : "bg-gray-300 text-gray-600"
                            }`}
                          >
                            {order.status === "quote-received" ||
                            order.status === "quote-approved"
                              ? "✓"
                              : "2"}
                          </div>
                          <p className="text-xs font-semibold text-gray-700">
                            2차 견적 도착
                          </p>
                        </div>
                      </div>
                      {order.status === "quote-pending" && (
                        <p className="text-center text-xs text-gray-600 mt-3">
                          담당자가 견적서를 검토하고 있습니다. 영업일 기준 2-3일
                          소요됩니다.
                        </p>
                      )}
                    </div>

                    {order.details.tourDate && (
                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">투어 예정일:</span>{" "}
                          {order.details.tourDate}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center space-x-3">
                      {order.status === "quote-received" && (
                        <>
                          <Button className="flex-1 bg-[#651d2a] hover:bg-[#4a1520] text-white">
                            견적서 승인
                          </Button>
                          <Button
                            className="flex-1 border border-gray-400 text-gray-700 bg-white hover:!bg-gray-500 hover:!text-white transition-all shadow-sm cursor-pointer"
                          >
                            견적서 거절
                          </Button>
                        </>
                      )}
                      {order.status === "quote-approved" && (
                        <Button className="flex-1 bg-[#651d2a] hover:bg-[#4a1520] text-white">
                          예약 확정하기
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      )}
                      {order.status === "quote-pending" && (
                        <Link href={`/orders/${order.id}`} className="flex-1">
                          <Button
                            className="w-full border border-[#651d2a] text-[#651d2a] bg-white hover:!bg-[#651d2a] hover:!text-white transition-all shadow-sm cursor-pointer"
                          >
                            요청 상세보기
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-3 gap-0">
                    {/* 이미지 */}
                    <div className="relative h-48 md:h-auto">
                      <Image
                        src={order.image || "/placeholder.svg"}
                        alt={order.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* 주문 정보 */}
                    <div className="md:col-span-2 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            {getStatusBadge(order.status)}
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {order.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            주문번호: {order.id}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">
                            {formatPrice(order.price)}
                          </p>
                        </div>
                      </div>

                      {/* 상세 정보 */}
                      <div className="grid md:grid-cols-3 gap-4 mb-4 text-sm">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>주문일: {order.date}</span>
                        </div>
                        {order.type === "tour" && order.details.location && (
                          <div className="flex items-center space-x-2 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{order.details.location}</span>
                          </div>
                        )}
                        {order.type === "tour" &&
                          order.details.participants && (
                            <div className="flex items-center space-x-2 text-gray-600">
                              <Users className="w-4 h-4" />
                              <span>{order.details.participants}명</span>
                            </div>
                          )}
                      </div>

                      {order.type === "tour" && order.details.tourDate && (
                        <div className="bg-gray-50 rounded-lg p-3 mb-4">
                          <p className="text-sm text-gray-700">
                            <span className="font-semibold">투어 예정일:</span>{" "}
                            {order.details.tourDate}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center space-x-3">
                        <Link href={`/orders/${order.id}`} className="flex-1">
                          <Button
                            className="w-full border border-[#651d2a] text-[#651d2a] bg-white hover:!bg-[#651d2a] hover:!text-white transition-all shadow-sm cursor-pointer"
                          >
                            상세보기
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                        {order.status === "completed" && (
                          <Button
                            className="flex-1 border border-[#6d8675] text-[#6d8675] bg-white hover:!bg-[#6d8675] hover:!text-white transition-all shadow-sm cursor-pointer"
                          >
                            리뷰 작성
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            ))
          )}
        </div>

        {/* 도움말 섹션 */}
        <Card className="mt-12 bg-gradient-to-r from-[#651d2a]/5 to-[#6d8675]/5 border border-gray-200 shadow-lg rounded-xl">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              주문 관련 문의가 있으신가요?
            </h3>
            <p className="text-gray-600 mb-4">
              고객센터에서 친절하게 도와드리겠습니다
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/contact">
                <Button
                  className="border border-[#651d2a] text-[#651d2a] bg-white hover:!bg-[#651d2a] hover:!text-white transition-all shadow-sm cursor-pointer"
                >
                  문의하기
                </Button>
              </Link>
              <Link href="/tours">
                <Button className="bg-[#651d2a] hover:bg-[#4a1520] text-white">
                  새 투어 예약하기
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
