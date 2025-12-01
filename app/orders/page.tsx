"use client";

import { Calendar, ChevronRight, Package, Users, Loader2, FileText, ShoppingBag, Search, Mail, Hash, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/src/shared/store/authStore";

/**
 * 주문내역 페이지
 *
 * 두 가지 탭으로 구성:
 * 1. 구매 내역 - Bokun API 연동 실제 예약
 * 2. 견적서 현황 - 커스텀 투어 견적 요청 (추후 백엔드 연동)
 */

// ==================== Bokun 예약 타입 ====================
interface ProductBooking {
  id: number;
  confirmationCode: string;
  productTitle: string;
  productType: string;
  startDate: string;
  startTime?: string;
  participants: number;
  totalPrice: number;
  totalPriceFormatted: string;
  status: string;
}

interface BokunBooking {
  id: number;
  confirmationCode: string;
  status: string;
  creationDate: string;
  totalPrice: number;
  totalPriceFormatted: string;
  currency: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
  };
  productBookings: ProductBooking[];
}

interface BookingSearchResult {
  items: BokunBooking[];
  totalCount: number;
  pageSize: number;
  page: number;
}

// ==================== 견적서 타입 ====================
interface QuoteRequest {
  id: string;
  title: string;
  status: "quote-pending" | "quote-received" | "quote-approved" | "quote-rejected";
  createdAt: string;
  price: number | null;
  details: {
    location: string;
    participants: number;
    tourDate: string;
    quoteDetails: string;
    quoteStage: 1 | 2;
  };
}

export default function OrdersPage() {
  const { user, isAuthenticated } = useAuthStore();

  // 탭 상태
  const [activeTab, setActiveTab] = useState<"bookings" | "quotes">("bookings");

  // Bokun 예약 상태
  const [bookings, setBookings] = useState<BokunBooking[]>([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);
  const [bookingsError, setBookingsError] = useState<string | null>(null);
  const [bookingFilter, setBookingFilter] = useState<"all" | "confirmed" | "cancelled">("all");

  // 예약 검색 상태 (비로그인 or 수동 검색용)
  const [searchType, setSearchType] = useState<"email" | "confirmation">("email"); // 검색 유형
  const [searchEmail, setSearchEmail] = useState("");
  const [searchConfirmationCode, setSearchConfirmationCode] = useState("");
  const [showManualSearch, setShowManualSearch] = useState(false); // 로그인 사용자의 수동 검색 표시 여부
  const [hasSearched, setHasSearched] = useState(false); // 검색 실행 여부

  // 견적서 상태 (TODO: 백엔드 연동)
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [isLoadingQuotes, setIsLoadingQuotes] = useState(false);

  /**
   * 로그인 사용자용: 페이지 로드 시 자동으로 예약 데이터 조회
   * - 로그인 상태이고 이메일이 있을 때만 자동 실행
   */
  useEffect(() => {
    async function fetchBookings() {
      if (!isAuthenticated || !user?.email) {
        return;
      }

      try {
        setIsLoadingBookings(true);
        setBookingsError(null);

        const response = await fetch(`/api/orders?email=${encodeURIComponent(user.email)}`);

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data: BookingSearchResult = await response.json();
        setBookings(data.items || []);
        setHasSearched(true);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setBookingsError("Failed to load booking history.");
      } finally {
        setIsLoadingBookings(false);
      }
    }

    fetchBookings();
  }, [isAuthenticated, user?.email]);

  /**
   * 예약 검색 함수 (비로그인 or 수동 검색)
   * - 이메일: 해당 이메일로 예약된 모든 건 조회
   * - 예약번호: 특정 예약 1건만 조회
   */
  const handleBookingSearch = async () => {
    setBookingsError(null);
    setBookings([]);

    // 이메일로 검색
    if (searchType === "email") {
      if (!searchEmail || !searchEmail.includes("@")) {
        setBookingsError("Please enter a valid email address.");
        return;
      }

      try {
        setIsLoadingBookings(true);
        const response = await fetch(`/api/orders?email=${encodeURIComponent(searchEmail)}`);

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data: BookingSearchResult = await response.json();
        setBookings(data.items || []);
        setHasSearched(true);

        if (!data.items || data.items.length === 0) {
          setBookingsError("No bookings found for this email address.");
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setBookingsError("Failed to search bookings. Please try again.");
      } finally {
        setIsLoadingBookings(false);
      }
    } else {
      // 예약번호(confirmation code)로 검색
      if (!searchConfirmationCode.trim()) {
        setBookingsError("Please enter a confirmation code.");
        return;
      }

      try {
        setIsLoadingBookings(true);
        const response = await fetch(`/api/orders?confirmationCode=${encodeURIComponent(searchConfirmationCode.trim())}`);

        if (!response.ok) {
          if (response.status === 404) {
            setBookingsError("No booking found with this confirmation code.");
            setHasSearched(true);
            return;
          }
          throw new Error("Failed to fetch booking");
        }

        const data = await response.json();
        // 단일 예약을 배열로 변환 (UI 일관성)
        setBookings(data ? [data] : []);
        setHasSearched(true);
      } catch (err) {
        console.error("Error fetching booking:", err);
        setBookingsError("Failed to search booking. Please try again.");
      } finally {
        setIsLoadingBookings(false);
      }
    }
  };

  /**
   * 로그인 사용자의 내 예약 다시 불러오기
   */
  const handleRefreshMyBookings = async () => {
    if (!user?.email) return;

    setShowManualSearch(false);
    setBookingsError(null);
    setBookings([]);

    try {
      setIsLoadingBookings(true);
      const response = await fetch(`/api/orders?email=${encodeURIComponent(user.email)}`);

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data: BookingSearchResult = await response.json();
      setBookings(data.items || []);
      setHasSearched(true);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setBookingsError("Failed to load booking history.");
    } finally {
      setIsLoadingBookings(false);
    }
  };

  // 견적서 데이터 가져오기 (TODO: 백엔드 연동)
  useEffect(() => {
    async function fetchQuotes() {
      if (!isAuthenticated || !user?.id) {
        return;
      }

      setIsLoadingQuotes(true);

      // TODO: 실제 API 연동
      // const response = await fetch(`/api/quotes?userId=${user.id}`);
      // const data = await response.json();
      // setQuotes(data.items || []);

      // 임시 더미 데이터
      setQuotes([
        {
          id: "QUOTE-2024-001",
          title: "맞춤형 패밀리 투어 견적 요청",
          status: "quote-pending",
          createdAt: "2024-01-25",
          price: null,
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
          title: "기업 단체 투어 견적 요청",
          status: "quote-received",
          createdAt: "2024-01-18",
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
          title: "웨딩 포토 투어 견적 요청",
          status: "quote-approved",
          createdAt: "2023-12-20",
          price: 580000,
          details: {
            location: "경복궁, 북촌한옥마을",
            participants: 2,
            tourDate: "2024-04-05",
            quoteDetails: "한복 웨딩 포토 투어 - 전문 사진작가, 한복 대여 포함",
            quoteStage: 2,
          },
        },
      ]);

      setIsLoadingQuotes(false);
    }

    if (activeTab === "quotes") {
      fetchQuotes();
    }
  }, [isAuthenticated, user?.id, activeTab]);

  // 필터링된 예약 목록
  const filteredBookings = bookings.filter((booking) => {
    if (bookingFilter === "all") return true;
    if (bookingFilter === "confirmed") return booking.status === "CONFIRMED";
    if (bookingFilter === "cancelled") return booking.status === "CANCELLED";
    return true;
  });

  // 예약 상태 뱃지 (영문 라벨)
  const getBookingStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; color: string }> = {
      CONFIRMED: { label: "Confirmed", color: "bg-[#6d8675] text-white" },
      CANCELLED: { label: "Cancelled", color: "bg-[#8b4a52] text-white" },
      RESERVED: { label: "Reserved", color: "bg-[#c4982a] text-white" },
      PENDING: { label: "Pending", color: "bg-gray-500 text-white" },
    };
    const config = statusConfig[status] || { label: status, color: "bg-gray-400 text-white" };
    return <Badge className={`${config.color} px-3 py-1`}>{config.label}</Badge>;
  };

  // 견적서 상태 뱃지
  const getQuoteStatusBadge = (status: QuoteRequest["status"]) => {
    const statusConfig = {
      "quote-pending": { label: "1차 견적 검토중", color: "bg-[#6d8675] text-white animate-pulse" },
      "quote-received": { label: "2차 견적서 도착", color: "bg-[#c4982a] text-white" },
      "quote-approved": { label: "견적 승인됨", color: "bg-[#5a7263] text-white" },
      "quote-rejected": { label: "견적 거절됨", color: "bg-[#8b4a52] text-white" },
    };
    const config = statusConfig[status];
    return <Badge className={`${config.color} px-3 py-1`}>{config.label}</Badge>;
  };

  // 날짜 포맷
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // 가격 포맷
  const formatPrice = (price: number) => {
    return `₩${price.toLocaleString()}`;
  };

  // ==================== 비로그인 상태: 검색 폼 표시 ====================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-[#faf9f7] to-gray-50 pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* 헤더 */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Order History</h1>
            <p className="text-gray-600">
              Look up your booking with email or confirmation code
            </p>
          </div>

          {/* 검색 카드 */}
          <Card className="p-8 shadow-lg border border-gray-200 bg-white rounded-xl mb-8">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Search className="w-6 h-6 text-[#651d2a]" />
              <h2 className="text-xl font-semibold text-gray-900">Find Your Booking</h2>
            </div>

            {/* 검색 타입 선택 */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                onClick={() => {
                  setSearchType("email");
                  setBookingsError(null);
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  searchType === "email"
                    ? "bg-[#651d2a] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Mail className="w-4 h-4" />
                Search by Email
              </button>
              <button
                onClick={() => {
                  setSearchType("confirmation");
                  setBookingsError(null);
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  searchType === "confirmation"
                    ? "bg-[#651d2a] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Hash className="w-4 h-4" />
                Search by Confirmation Code
              </button>
            </div>

            {/* 검색 입력 */}
            <div className="max-w-md mx-auto">
              {searchType === "email" ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="Enter the email used for booking"
                      value={searchEmail}
                      onChange={(e) => setSearchEmail(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleBookingSearch()}
                      className="w-full"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirmation Code
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., ABC123"
                      value={searchConfirmationCode}
                      onChange={(e) => setSearchConfirmationCode(e.target.value.toUpperCase())}
                      onKeyDown={(e) => e.key === "Enter" && handleBookingSearch()}
                      className="w-full font-mono"
                    />
                  </div>
                </div>
              )}

              {bookingsError && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{bookingsError}</p>
                </div>
              )}

              <Button
                onClick={handleBookingSearch}
                disabled={isLoadingBookings}
                className="w-full mt-6 bg-[#651d2a] hover:bg-[#4a1520] text-white"
              >
                {isLoadingBookings ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Search Booking
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* 검색 결과 */}
          {hasSearched && bookings.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Found {bookings.length} booking{bookings.length > 1 ? "s" : ""}
              </h3>
              {bookings.map((booking) => (
                <Card
                  key={booking.id}
                  className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white rounded-xl"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          {getBookingStatusBadge(booking.status)}
                        </div>
                        <p className="text-sm text-gray-500">
                          Confirmation: {booking.confirmationCode}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">
                          {booking.totalPriceFormatted || (booking.totalPrice ? `${booking.currency || ''} ${booking.totalPrice.toLocaleString()}` : '')}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-4">
                      {(booking.productBookings || []).map((product) => (
                        <div
                          key={product.id}
                          className="bg-gray-50 rounded-lg p-4 border-l-4 border-[#651d2a]"
                        >
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {product.productTitle}
                          </h3>
                          <div className="grid md:grid-cols-3 gap-3 text-sm">
                            <div className="flex items-center space-x-2 text-gray-600">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(product.startDate)}</span>
                              {product.startTime && (
                                <span className="text-gray-500">{product.startTime}</span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                              <Users className="w-4 h-4" />
                              <span>{product.participants || 0} people</span>
                            </div>
                            <div className="text-right">
                              <span className="font-medium text-gray-900">
                                {product.totalPriceFormatted || ''}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-4">
                        <span>Booked: {formatDate(booking.creationDate)}</span>
                        {booking.customer && (
                          <span>Guest: {booking.customer.firstName || ''} {booking.customer.lastName || ''}</span>
                        )}
                      </div>
                      <Link href={`/orders/${booking.confirmationCode}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#651d2a] text-[#651d2a] hover:bg-[#651d2a] hover:text-white"
                        >
                          View Details
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* 로그인 유도 */}
          <Card className="mt-8 bg-gradient-to-r from-[#651d2a]/5 to-[#6d8675]/5 border border-gray-200 shadow-lg rounded-xl">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Have an account?
              </h3>
              <p className="text-gray-600 mb-4">
                Log in to automatically view all bookings linked to your account
              </p>
              <div className="flex justify-center space-x-4">
                <Link href="/login">
                  <Button className="bg-[#651d2a] hover:bg-[#4a1520] text-white">
                    Log In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="outline" className="border-[#651d2a] text-[#651d2a] hover:bg-[#651d2a] hover:text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-[#faf9f7] to-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Order History</h1>
          <p className="text-gray-600">
            View your tour bookings and quote requests
          </p>
        </div>

        {/* 탭 버튼 */}
        <div className="flex items-center space-x-2 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-all border-b-2 -mb-px ${
              activeTab === "bookings"
                ? "text-[#651d2a] border-[#651d2a]"
                : "text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            Bookings
            {bookings.length > 0 && (
              <span className="bg-[#651d2a] text-white text-xs px-2 py-0.5 rounded-full">
                {bookings.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("quotes")}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-all border-b-2 -mb-px ${
              activeTab === "quotes"
                ? "text-[#651d2a] border-[#651d2a]"
                : "text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            <FileText className="w-5 h-5" />
            Quote Requests
            {quotes.length > 0 && (
              <span className="bg-[#c4982a] text-white text-xs px-2 py-0.5 rounded-full">
                {quotes.length}
              </span>
            )}
          </button>
        </div>

        {/* ==================== 구매 내역 탭 ==================== */}
        {activeTab === "bookings" && (
          <>
            {/* 수동 검색 토글 & 검색 폼 (로그인 사용자용) */}
            <div className="mb-6">
              {/* 검색 모드 토글 버튼 */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-500">
                  {!showManualSearch && user?.email && (
                    <span>Showing bookings for: <strong>{user.email}</strong></span>
                  )}
                  {showManualSearch && (
                    <span>Manual search mode</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {showManualSearch && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRefreshMyBookings}
                      className="border-[#651d2a] text-[#651d2a] hover:bg-[#651d2a] hover:text-white"
                    >
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Back to My Bookings
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowManualSearch(!showManualSearch)}
                    className="border-gray-300 text-gray-600 hover:bg-gray-100"
                  >
                    <Search className="w-4 h-4 mr-1" />
                    {showManualSearch ? "Hide Search" : "Search Other Bookings"}
                  </Button>
                </div>
              </div>

              {/* 수동 검색 폼 */}
              {showManualSearch && (
                <Card className="p-6 bg-gray-50 border border-gray-200 rounded-xl mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Search className="w-5 h-5 text-[#651d2a]" />
                    <h3 className="font-semibold text-gray-900">Search Bookings</h3>
                  </div>

                  {/* 검색 타입 선택 */}
                  <div className="flex items-center gap-3 mb-4">
                    <button
                      onClick={() => {
                        setSearchType("email");
                        setBookingsError(null);
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        searchType === "email"
                          ? "bg-[#651d2a] text-white"
                          : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      <Mail className="w-4 h-4" />
                      Email
                    </button>
                    <button
                      onClick={() => {
                        setSearchType("confirmation");
                        setBookingsError(null);
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        searchType === "confirmation"
                          ? "bg-[#651d2a] text-white"
                          : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      <Hash className="w-4 h-4" />
                      Confirmation Code
                    </button>
                  </div>

                  {/* 검색 입력 */}
                  <div className="flex gap-3">
                    {searchType === "email" ? (
                      <Input
                        type="email"
                        placeholder="Enter email address"
                        value={searchEmail}
                        onChange={(e) => setSearchEmail(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleBookingSearch()}
                        className="flex-1 bg-white"
                      />
                    ) : (
                      <Input
                        type="text"
                        placeholder="Enter confirmation code (e.g., ABC123)"
                        value={searchConfirmationCode}
                        onChange={(e) => setSearchConfirmationCode(e.target.value.toUpperCase())}
                        onKeyDown={(e) => e.key === "Enter" && handleBookingSearch()}
                        className="flex-1 bg-white font-mono"
                      />
                    )}
                    <Button
                      onClick={handleBookingSearch}
                      disabled={isLoadingBookings}
                      className="bg-[#651d2a] hover:bg-[#4a1520] text-white"
                    >
                      {isLoadingBookings ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Search className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </Card>
              )}
            </div>

            {/* 필터 버튼 */}
            <div className="flex items-center space-x-3 mb-6">
              <Button
                onClick={() => setBookingFilter("all")}
                size="sm"
                className={
                  bookingFilter === "all"
                    ? "border border-[#651d2a] bg-[#651d2a] hover:bg-[#4a1520] text-white"
                    : "border border-[#651d2a] text-[#651d2a] bg-white hover:!bg-[#651d2a] hover:!text-white"
                }
              >
                All
              </Button>
              <Button
                onClick={() => setBookingFilter("confirmed")}
                size="sm"
                className={
                  bookingFilter === "confirmed"
                    ? "border border-[#651d2a] bg-[#651d2a] hover:bg-[#4a1520] text-white"
                    : "border border-[#651d2a] text-[#651d2a] bg-white hover:!bg-[#651d2a] hover:!text-white"
                }
              >
                Confirmed
              </Button>
              <Button
                onClick={() => setBookingFilter("cancelled")}
                size="sm"
                className={
                  bookingFilter === "cancelled"
                    ? "border border-[#651d2a] bg-[#651d2a] hover:bg-[#4a1520] text-white"
                    : "border border-[#651d2a] text-[#651d2a] bg-white hover:!bg-[#651d2a] hover:!text-white"
                }
              >
                Cancelled
              </Button>
            </div>

            {/* 로딩 / 에러 / 빈 상태 */}
            {isLoadingBookings ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-[#651d2a] animate-spin mb-4" />
                <p className="text-gray-600">Loading bookings...</p>
              </div>
            ) : bookingsError ? (
              <Card className="p-6 mb-8 bg-red-50 border border-red-200">
                <p className="text-red-700">{bookingsError}</p>
              </Card>
            ) : filteredBookings.length === 0 ? (
              <Card className="p-12 text-center shadow-lg border border-gray-200 bg-white rounded-xl">
                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {bookingFilter === "all" ? "No bookings found" : `No ${bookingFilter} bookings`}
                </h3>
                <p className="text-gray-600 mb-6">Book your first tour to see it here</p>
                <Link href="/tours">
                  <Button className="bg-[#651d2a] hover:bg-[#4a1520] text-white">
                    Browse Tours
                  </Button>
                </Link>
              </Card>
            ) : (
              <div className="space-y-6">
                {filteredBookings.map((booking) => (
                  <Card
                    key={booking.id}
                    className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white rounded-xl"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            {getBookingStatusBadge(booking.status)}
                          </div>
                          <p className="text-sm text-gray-500">
                            Confirmation: {booking.confirmationCode}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">
                            {booking.totalPriceFormatted || (booking.totalPrice ? `${booking.currency || ''} ${booking.totalPrice.toLocaleString()}` : '')}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4 mb-4">
                        {(booking.productBookings || []).map((product) => (
                          <div
                            key={product.id}
                            className="bg-gray-50 rounded-lg p-4 border-l-4 border-[#651d2a]"
                          >
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {product.productTitle}
                            </h3>
                            <div className="grid md:grid-cols-3 gap-3 text-sm">
                              <div className="flex items-center space-x-2 text-gray-600">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(product.startDate)}</span>
                                {product.startTime && (
                                  <span className="text-gray-500">{product.startTime}</span>
                                )}
                              </div>
                              <div className="flex items-center space-x-2 text-gray-600">
                                <Users className="w-4 h-4" />
                                <span>{product.participants || 0} people</span>
                              </div>
                              <div className="text-right">
                                <span className="font-medium text-gray-900">
                                  {product.totalPriceFormatted || ''}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-4">
                          <span>Booked: {formatDate(booking.creationDate)}</span>
                          {booking.customer && (
                            <span>Guest: {booking.customer.firstName || ''} {booking.customer.lastName || ''}</span>
                          )}
                        </div>
                        <Link href={`/orders/${booking.confirmationCode}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-[#651d2a] text-[#651d2a] hover:bg-[#651d2a] hover:text-white"
                          >
                            View Details
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {/* ==================== 견적서 현황 탭 ==================== */}
        {activeTab === "quotes" && (
          <>
            {isLoadingQuotes ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-[#651d2a] animate-spin mb-4" />
                <p className="text-gray-600">견적서를 불러오는 중...</p>
              </div>
            ) : quotes.length === 0 ? (
              <Card className="p-12 text-center shadow-lg border border-gray-200 bg-white rounded-xl">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  견적 요청 내역이 없습니다
                </h3>
                <p className="text-gray-600 mb-6">
                  맞춤형 프라이빗 투어를 원하시면 견적을 요청해보세요
                </p>
                <Link href="/tours/private">
                  <Button className="bg-[#651d2a] hover:bg-[#4a1520] text-white">
                    프라이빗 투어 보기
                  </Button>
                </Link>
              </Card>
            ) : (
              <div className="space-y-6">
                {quotes.map((quote) => (
                  <Card
                    key={quote.id}
                    className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white rounded-xl"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            {getQuoteStatusBadge(quote.status)}
                            <Badge className="bg-[#651d2a] text-white">
                              {quote.details.quoteStage}차 견적
                            </Badge>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {quote.title}
                          </h3>
                          <p className="text-sm text-gray-500">견적번호: {quote.id}</p>
                        </div>
                        <div className="text-right">
                          {quote.status === "quote-pending" ? (
                            <div className="inline-flex items-center space-x-2 bg-[#6d8675]/10 rounded-lg px-4 py-2">
                              <div className="w-2 h-2 bg-[#6d8675] rounded-full animate-pulse"></div>
                              <p className="text-sm font-semibold text-[#6d8675]">
                                검토 중...
                              </p>
                            </div>
                          ) : quote.price ? (
                            <p className="text-2xl font-bold text-gray-900">
                              {formatPrice(quote.price)}
                            </p>
                          ) : (
                            <p className="text-lg font-semibold text-gray-500">
                              견적 대기중
                            </p>
                          )}
                        </div>
                      </div>

                      {/* 견적 상세 정보 */}
                      <div className="bg-gray-50 rounded-lg p-4 mb-4 border-l-4 border-[#c4982a]">
                        <p className="text-sm font-semibold text-gray-900 mb-1">요청 내용:</p>
                        <p className="text-sm text-gray-700">{quote.details.quoteDetails}</p>
                      </div>

                      {/* 기본 정보 */}
                      <div className="grid md:grid-cols-3 gap-4 mb-4 text-sm">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>요청일: {quote.createdAt}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <span>📍 {quote.details.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>{quote.details.participants}명</span>
                        </div>
                      </div>

                      {/* 견적 진행 상태 타임라인 */}
                      <div className="bg-gradient-to-r from-[#6d8675]/10 to-[#c4982a]/10 rounded-lg p-4 mb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col items-center flex-1">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                              quote.details.quoteStage >= 1 ? "bg-[#6d8675] text-white" : "bg-gray-300 text-gray-600"
                            }`}>
                              ✓
                            </div>
                            <p className="text-xs font-semibold text-gray-700">1차 견적 제출</p>
                          </div>
                          <div className="flex-1 h-1 bg-gray-300 relative">
                            <div className={`absolute left-0 top-0 h-full transition-all duration-500 ${
                              quote.status === "quote-received" || quote.status === "quote-approved"
                                ? "bg-[#5a7263] w-full"
                                : "bg-[#6d8675] w-1/2 animate-pulse"
                            }`}></div>
                          </div>
                          <div className="flex flex-col items-center flex-1">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                              quote.status === "quote-received" || quote.status === "quote-approved"
                                ? "bg-[#5a7263] text-white"
                                : quote.status === "quote-pending"
                                ? "bg-[#c4982a] text-white animate-pulse"
                                : "bg-gray-300 text-gray-600"
                            }`}>
                              {quote.status === "quote-received" || quote.status === "quote-approved" ? "✓" : "2"}
                            </div>
                            <p className="text-xs font-semibold text-gray-700">2차 견적 도착</p>
                          </div>
                        </div>
                        {quote.status === "quote-pending" && (
                          <p className="text-center text-xs text-gray-600 mt-3">
                            담당자가 견적서를 검토하고 있습니다. 영업일 기준 2-3일 소요됩니다.
                          </p>
                        )}
                      </div>

                      {/* 투어 예정일 */}
                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">투어 예정일:</span> {quote.details.tourDate}
                        </p>
                      </div>

                      {/* 액션 버튼 */}
                      <div className="flex items-center space-x-3">
                        {quote.status === "quote-received" && (
                          <>
                            <Button className="flex-1 bg-[#651d2a] hover:bg-[#4a1520] text-white">
                              견적서 승인
                            </Button>
                            <Button className="flex-1 border border-gray-400 text-gray-700 bg-white hover:!bg-gray-500 hover:!text-white">
                              견적서 거절
                            </Button>
                          </>
                        )}
                        {quote.status === "quote-approved" && (
                          <Button className="flex-1 bg-[#651d2a] hover:bg-[#4a1520] text-white">
                            예약 확정하기
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        )}
                        {quote.status === "quote-pending" && (
                          <Link href={`/quotes/${quote.id}`} className="flex-1">
                            <Button className="w-full border border-[#651d2a] text-[#651d2a] bg-white hover:!bg-[#651d2a] hover:!text-white">
                              요청 상세보기
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {/* 도움말 섹션 */}
        <Card className="mt-12 bg-gradient-to-r from-[#651d2a]/5 to-[#6d8675]/5 border border-gray-200 shadow-lg rounded-xl">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Need help with your order?
            </h3>
            <p className="text-gray-600 mb-4">
              Our customer service team is happy to assist you
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/contact">
                <Button className="border border-[#651d2a] text-[#651d2a] bg-white hover:!bg-[#651d2a] hover:!text-white">
                  Contact Us
                </Button>
              </Link>
              <Link href="/tours">
                <Button className="bg-[#651d2a] hover:bg-[#4a1520] text-white">
                  Book New Tour
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
