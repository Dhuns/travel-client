"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import QuotationModal from "@/src/components/Chat/QuotationModal";
import MessageSection from "@/src/components/Message/MessageSection";
import { getAllChatSessions } from "@/src/shared/apis/chat";
import {
  getQuotationByBatchId,
  submitCustomerQuoteResponse,
  type CustomerResponseType,
} from "@/src/shared/apis/estimate";
import { useAuthStore } from "@/src/shared/store/authStore";
import { ChatSession } from "@/src/shared/types/chat";
import dayjs from "dayjs";
import {
  Calendar,
  Check,
  ChevronRight,
  FileText,
  Hash,
  Loader2,
  Mail,
  MapPin,
  MessageSquarePlus,
  Package,
  RefreshCw,
  Search,
  Send,
  ShoppingBag,
  Users,
  Wallet,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

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
/**
 * Quote Workflow Status (새로운 상태 체계)
 * - draft: AI 임시 견적 (고객에게 보이지 않음)
 * - pending_review: Admin 검토 대기 중
 * - sent: Admin이 승인하여 고객에게 발송됨
 * - viewed: 고객이 견적서를 열람함
 * - approved: 고객이 최종 승인함
 * - rejected: 고객이 거절함
 * - revision_requested: 고객이 수정을 요청함
 * - expired: 유효기간(validDate) 만료
 */
type QuoteWorkflowStatus =
  | "draft"
  | "pending_review"
  | "sent"
  | "viewed"
  | "approved"
  | "rejected"
  | "revision_requested"
  | "expired";

interface QuoteRequest {
  id: string;
  sessionId: string;
  batchId?: number;
  title: string;
  quoteStatus: QuoteWorkflowStatus;
  createdAt: string;
  price: number | null;
  viewedAt?: string | null;
  sentAt?: string | null;
  respondedAt?: string | null;
  validDate?: string | null;
  details: {
    destination: string;
    participants: number;
    startDate: string;
    endDate: string;
    duration: string;
    budget?: number;
    preferences?: string[];
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
  const [bookingFilter, setBookingFilter] = useState<"all" | "confirmed" | "cancelled">(
    "all"
  );

  // 예약 검색 상태 (비로그인 or 수동 검색용)
  const [searchType, setSearchType] = useState<"email" | "confirmation">("email"); // 검색 유형
  const [searchEmail, setSearchEmail] = useState("");
  const [searchConfirmationCode, setSearchConfirmationCode] = useState("");
  const [showManualSearch, setShowManualSearch] = useState(false); // 로그인 사용자의 수동 검색 표시 여부
  const [hasSearched, setHasSearched] = useState(false); // 검색 실행 여부

  // 견적서 상태
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [isLoadingQuotes, setIsLoadingQuotes] = useState(false);
  const [quotesRefreshKey, setQuotesRefreshKey] = useState(0);

  // 견적서 모달 상태
  const [selectedQuoteBatchId, setSelectedQuoteBatchId] = useState<number | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // 견적 응답 상태 (카드 내 인라인 응답)
  const [respondingQuoteId, setRespondingQuoteId] = useState<string | null>(null);
  const [responseType, setResponseType] = useState<CustomerResponseType | null>(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [isSubmittingResponse, setIsSubmittingResponse] = useState(false);
  const [responseError, setResponseError] = useState<string | null>(null);

  // 견적서 모달 열기
  const handleOpenQuoteModal = (batchId: number) => {
    setSelectedQuoteBatchId(batchId);
    setIsQuoteModalOpen(true);
  };

  // 견적서 모달 닫기
  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setSelectedQuoteBatchId(null);
  };

  // 인라인 응답 시작
  const handleStartResponse = (quoteId: string, type: CustomerResponseType) => {
    setRespondingQuoteId(quoteId);
    setResponseType(type);
    setResponseMessage("");
    setResponseError(null);
  };

  // 인라인 응답 취소
  const handleCancelResponse = () => {
    setRespondingQuoteId(null);
    setResponseType(null);
    setResponseMessage("");
    setResponseError(null);
  };

  // 인라인 응답 제출
  const handleSubmitInlineResponse = async (batchId: number) => {
    if (!responseType) return;

    // request_changes는 메시지 필수
    if (responseType === "request_changes" && !responseMessage.trim()) {
      setResponseError("Please describe the changes you need.");
      return;
    }

    setIsSubmittingResponse(true);
    setResponseError(null);

    try {
      await submitCustomerQuoteResponse({
        batchId,
        responseType,
        message: responseMessage.trim() || undefined,
      });

      // 성공 시 상태 초기화 및 목록 새로고침
      handleCancelResponse();
      setQuotesRefreshKey((prev) => prev + 1);
    } catch (err) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      setResponseError(
        axiosError?.response?.data?.message || "Failed to submit. Please try again."
      );
    } finally {
      setIsSubmittingResponse(false);
    }
  };

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

        const response = await fetch(
          `/api/orders?email=${encodeURIComponent(user.email)}`
        );

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
        const response = await fetch(
          `/api/orders?email=${encodeURIComponent(searchEmail)}`
        );

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
        const response = await fetch(
          `/api/orders?confirmationCode=${encodeURIComponent(
            searchConfirmationCode.trim()
          )}`
        );

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

  // 견적서 데이터 가져오기 - ChatSession에서 batchId가 있는 세션 조회
  useEffect(() => {
    async function fetchQuotes() {
      if (!isAuthenticated || !user?.id) {
        return;
      }

      setIsLoadingQuotes(true);

      try {
        // Get access token from auth store
        const accessToken = useAuthStore.getState().accessToken;
        if (!accessToken) {
          console.error("No access token available");
          setIsLoadingQuotes(false);
          return;
        }

        // ChatSession 목록 조회 (batchId가 있는 것만 = 견적 생성됨, userId는 JWT에서 추출)
        const { sessions } = await getAllChatSessions(accessToken);

        // batchId가 있는 세션만 필터링
        const sessionsWithBatch = sessions.filter(
          (session: ChatSession) => session.batchId
        );

        // 각 세션에 대해 견적 금액 및 상태 조회
        const quotesData: QuoteRequest[] = await Promise.all(
          sessionsWithBatch.map(async (session: ChatSession) => {
            const ctx = session.context || {};
            const totalParticipants =
              (ctx.adults || 0) + (ctx.children || 0) + (ctx.infants || 0);

            // 날짜 계산
            const start = ctx.startDate ? dayjs(ctx.startDate) : null;
            const end = ctx.endDate ? dayjs(ctx.endDate) : null;
            const days = start && end ? end.diff(start, "day") + 1 : 0;
            const nights = days > 0 ? days - 1 : 0;

            // 견적 금액 및 상태 조회
            let price: number | null = null;
            let quoteStatus: QuoteWorkflowStatus = "draft";
            let viewedAt: string | null = null;
            let sentAt: string | null = null;
            let respondedAt: string | null = null;
            let validDate: string | null = null;

            try {
              const quotation = await getQuotationByBatchId(session.batchId!);
              // batchInfo에서 quoteStatus 및 타임스탬프 확인
              if (quotation.batchInfo) {
                // 새로운 quoteStatus 필드 사용
                quoteStatus =
                  (quotation.batchInfo.quoteStatus as QuoteWorkflowStatus) || "draft";
                viewedAt = quotation.batchInfo.viewedAt || null;
                sentAt = quotation.batchInfo.sentAt || null;
                respondedAt = quotation.batchInfo.respondedAt || null;
                validDate = quotation.batchInfo.validDate || null;

                // quoteStatus가 없는 기존 데이터 호환성 처리
                if (!quotation.batchInfo.quoteStatus) {
                  // Legacy 상태 기반으로 quoteStatus 결정
                  if (quotation.batchInfo.status === "최종완료") {
                    quoteStatus = "approved";
                  } else if (quotation.batchInfo.status === "취소") {
                    quoteStatus = "rejected";
                  } else if (quotation.batchInfo.status === "요청") {
                    quoteStatus = "revision_requested";
                  } else if (quotation.batchInfo.source === "manual") {
                    quoteStatus = "sent";
                  } else {
                    quoteStatus = "draft";
                  }
                }
              }
              // estimateDetails에서 총 금액 계산
              if (quotation.estimateDetails && quotation.estimateDetails.length > 0) {
                price = quotation.estimateDetails.reduce((sum, detail) => {
                  return sum + (Number(detail.price) || 0) * (detail.quantity || 1);
                }, 0);
              }
            } catch (err) {
              console.warn(
                `Failed to fetch quotation for batchId ${session.batchId}:`,
                err
              );
            }

            return {
              id: `QUOTE-${session.batchId}`,
              sessionId: session.sessionId,
              batchId: session.batchId,
              title: session.title || `${ctx.destination || "Korea"} Trip`,
              quoteStatus,
              createdAt: dayjs(session.createdAt).format("YYYY-MM-DD"),
              price,
              viewedAt,
              sentAt,
              respondedAt,
              validDate,
              details: {
                destination: ctx.destination || "Korea",
                participants: totalParticipants || 1,
                startDate: ctx.startDate ? dayjs(ctx.startDate).format("YYYY-MM-DD") : "",
                endDate: ctx.endDate ? dayjs(ctx.endDate).format("YYYY-MM-DD") : "",
                duration: days > 0 ? `${nights}N ${days}D` : "",
                budget: ctx.budget,
                preferences: ctx.preferences,
              },
            };
          })
        );

        // draft 상태는 고객에게 보이지 않음
        const visibleQuotes = quotesData.filter((q) => q.quoteStatus !== "draft");
        setQuotes(visibleQuotes);
      } catch (error) {
        console.error("Error fetching quotes:", error);
        setQuotes([]);
      } finally {
        setIsLoadingQuotes(false);
      }
    }

    if (activeTab === "quotes") {
      fetchQuotes();
    }
  }, [isAuthenticated, user?.id, activeTab, quotesRefreshKey]);

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
      CONFIRMED: { label: "Confirmed", color: "bg-tumakr-sage-green text-white" },
      CANCELLED: { label: "Cancelled", color: "bg-[#8b4a52] text-white" },
      RESERVED: { label: "Reserved", color: "bg-tumakr-mustard text-white" },
      PENDING: { label: "Pending", color: "bg-gray-500 text-white" },
    };
    const config = statusConfig[status] || {
      label: status,
      color: "bg-gray-400 text-white",
    };
    return <Badge className={`${config.color} px-3 py-1`}>{config.label}</Badge>;
  };

  // 견적서 상태 뱃지 (새로운 상태 체계)
  const getQuoteStatusBadge = (quoteStatus: QuoteWorkflowStatus) => {
    const statusConfig: Record<QuoteWorkflowStatus, { label: string; color: string }> = {
      draft: { label: "Draft", color: "bg-gray-400 text-white" },
      pending_review: {
        label: "Under Review",
        color: "bg-tumakr-sage-green text-white animate-pulse",
      },
      sent: { label: "Quote Ready", color: "bg-tumakr-mustard text-white" },
      viewed: { label: "Quote Viewed", color: "bg-tumakr-mustard text-white" },
      approved: { label: "Approved", color: "bg-[#5a7263] text-white" },
      rejected: { label: "Declined", color: "bg-[#8b4a52] text-white" },
      revision_requested: {
        label: "Revision Requested",
        color: "bg-[#d97706] text-white",
      },
      expired: { label: "Expired", color: "bg-gray-500 text-white" },
    };
    const config = statusConfig[quoteStatus] || {
      label: quoteStatus,
      color: "bg-gray-400 text-white",
    };
    return <Badge className={`${config.color} px-3 py-1`}>{config.label}</Badge>;
  };

  // 견적서 상태 설명 (새로운 상태 체계)
  const getQuoteStatusDescription = (quoteStatus: QuoteWorkflowStatus) => {
    const descriptions: Record<QuoteWorkflowStatus, string> = {
      draft: "Your quote is being prepared.",
      pending_review:
        "Your AI-generated draft is under review. Our travel experts will finalize the itinerary and pricing within 2-3 business days.",
      sent: "Great news! Your final quote is ready. Review the detailed itinerary and pricing, then approve to proceed with booking.",
      viewed:
        "You've viewed the quote. Please review and respond - approve to proceed or request changes if needed.",
      approved:
        "Your quote has been approved. Our team will contact you shortly to confirm your booking and arrange payment.",
      rejected:
        "This quote was declined. Feel free to start a new chat to request a different itinerary.",
      revision_requested:
        "Your revision request has been submitted. Our team will update the quote and get back to you soon.",
      expired:
        "This quote has expired. Please start a new chat to request an updated quote.",
    };
    return descriptions[quoteStatus] || "";
  };

  // 고객이 응답할 수 있는 상태인지 확인
  const canCustomerRespond = (quoteStatus: QuoteWorkflowStatus): boolean => {
    return quoteStatus === "sent" || quoteStatus === "viewed";
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
      <div className="min-h-screen bg-linear-to-br from-gray-50 via-[#faf9f7] to-gray-50 pt-24 pb-16">
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
              <Search className="w-6 h-6 text-tumakr-maroon" />
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
                    ? "bg-tumakr-maroon text-white"
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
                    ? "bg-tumakr-maroon text-white"
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
                      onChange={(e) =>
                        setSearchConfirmationCode(e.target.value.toUpperCase())
                      }
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
                className="w-full mt-6 bg-tumakr-maroon hover:bg-tumakr-maroon/90 text-white"
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
                          {booking.totalPriceFormatted ||
                            (booking.totalPrice
                              ? `${
                                  booking.currency || ""
                                } ${booking.totalPrice.toLocaleString()}`
                              : "")}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-4">
                      {(booking.productBookings || []).map((product) => (
                        <div
                          key={product.id}
                          className="bg-gray-50 rounded-lg p-4 border-l-4 border-tumakr-maroon"
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
                                {product.totalPriceFormatted || ""}
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
                          <span>
                            Guest: {booking.customer.firstName || ""}{" "}
                            {booking.customer.lastName || ""}
                          </span>
                        )}
                      </div>
                      <Link href={`/orders/${booking.confirmationCode}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-tumakr-maroon text-tumakr-maroon hover:bg-tumakr-maroon hover:text-white"
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
          <Card className="mt-8 bg-linear-to-r from-tumakr-maroon/5 to-tumakr-sage-green/5 border border-gray-200 shadow-lg rounded-xl">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Have an account?</h3>
              <p className="text-gray-600 mb-4">
                Log in to automatically view all bookings linked to your account
              </p>
              <div className="flex justify-center space-x-4">
                <Link href="/login">
                  <Button className="bg-tumakr-maroon hover:bg-tumakr-maroon/90 text-white">
                    Log In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    variant="outline"
                    className="border-tumakr-maroon text-tumakr-maroon hover:bg-tumakr-maroon hover:text-white"
                  >
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
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-[#faf9f7] to-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Order History</h1>
          <p className="text-gray-600">View your tour bookings and quote requests</p>
        </div>

        {/* 탭 버튼 */}
        <div className="flex items-center space-x-2 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-all border-b-2 -mb-px ${
              activeTab === "bookings"
                ? "text-tumakr-maroon border-tumakr-maroon"
                : "text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            Bookings
            {bookings.length > 0 && (
              <span className="bg-tumakr-maroon text-white text-xs px-2 py-0.5 rounded-full">
                {bookings.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("quotes")}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-all border-b-2 -mb-px ${
              activeTab === "quotes"
                ? "text-tumakr-maroon border-tumakr-maroon"
                : "text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            <FileText className="w-5 h-5" />
            Quote Requests
            {quotes.length > 0 && (
              <span className="bg-tumakr-mustard text-white text-xs px-2 py-0.5 rounded-full">
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
                    <span>
                      Showing bookings for: <strong>{user.email}</strong>
                    </span>
                  )}
                  {showManualSearch && <span>Manual search mode</span>}
                </div>
                <div className="flex items-center gap-2">
                  {showManualSearch && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRefreshMyBookings}
                      className="border-tumakr-maroon text-tumakr-maroon hover:bg-tumakr-maroon hover:text-white"
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
                    <Search className="w-5 h-5 text-tumakr-maroon" />
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
                          ? "bg-tumakr-maroon text-white"
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
                          ? "bg-tumakr-maroon text-white"
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
                        onChange={(e) =>
                          setSearchConfirmationCode(e.target.value.toUpperCase())
                        }
                        onKeyDown={(e) => e.key === "Enter" && handleBookingSearch()}
                        className="flex-1 bg-white font-mono"
                      />
                    )}
                    <Button
                      onClick={handleBookingSearch}
                      disabled={isLoadingBookings}
                      className="bg-tumakr-maroon hover:bg-tumakr-maroon/90 text-white"
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
                    ? "border border-tumakr-maroon bg-tumakr-maroon hover:bg-tumakr-maroon/90 text-white"
                    : "border border-tumakr-maroon text-tumakr-maroon bg-white hover:bg-tumakr-maroon! hover:text-white!"
                }
              >
                All
              </Button>
              <Button
                onClick={() => setBookingFilter("confirmed")}
                size="sm"
                className={
                  bookingFilter === "confirmed"
                    ? "border border-tumakr-maroon bg-tumakr-maroon hover:bg-tumakr-maroon/90 text-white"
                    : "border border-tumakr-maroon text-tumakr-maroon bg-white hover:bg-tumakr-maroon! hover:text-white!"
                }
              >
                Confirmed
              </Button>
              <Button
                onClick={() => setBookingFilter("cancelled")}
                size="sm"
                className={
                  bookingFilter === "cancelled"
                    ? "border border-tumakr-maroon bg-tumakr-maroon hover:bg-tumakr-maroon/90 text-white"
                    : "border border-tumakr-maroon text-tumakr-maroon bg-white hover:bg-tumakr-maroon! hover:text-white!"
                }
              >
                Cancelled
              </Button>
            </div>

            {/* 로딩 / 에러 / 빈 상태 */}
            {isLoadingBookings ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-tumakr-maroon animate-spin mb-4" />
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
                  {bookingFilter === "all"
                    ? "No bookings found"
                    : `No ${bookingFilter} bookings`}
                </h3>
                <p className="text-gray-600 mb-6">Book your first tour to see it here</p>
                <Link href="/tours">
                  <Button className="bg-tumakr-maroon hover:bg-tumakr-maroon/90 text-white">
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
                            {booking.totalPriceFormatted ||
                              (booking.totalPrice
                                ? `${
                                    booking.currency || ""
                                  } ${booking.totalPrice.toLocaleString()}`
                                : "")}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4 mb-4">
                        {(booking.productBookings || []).map((product) => (
                          <div
                            key={product.id}
                            className="bg-gray-50 rounded-lg p-4 border-l-4 border-tumakr-maroon"
                          >
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {product.productTitle}
                            </h3>
                            <div className="grid md:grid-cols-3 gap-3 text-sm">
                              <div className="flex items-center space-x-2 text-gray-600">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(product.startDate)}</span>
                                {product.startTime && (
                                  <span className="text-gray-500">
                                    {product.startTime}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center space-x-2 text-gray-600">
                                <Users className="w-4 h-4" />
                                <span>{product.participants || 0} people</span>
                              </div>
                              <div className="text-right">
                                <span className="font-medium text-gray-900">
                                  {product.totalPriceFormatted || ""}
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
                            <span>
                              Guest: {booking.customer.firstName || ""}{" "}
                              {booking.customer.lastName || ""}
                            </span>
                          )}
                        </div>
                        <Link href={`/orders/${booking.confirmationCode}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-tumakr-maroon text-tumakr-maroon hover:bg-tumakr-maroon hover:text-white"
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
                <Loader2 className="w-12 h-12 text-tumakr-maroon animate-spin mb-4" />
                <p className="text-gray-600">Loading quotes...</p>
              </div>
            ) : quotes.length === 0 ? (
              <Card className="p-12 text-center shadow-lg border border-gray-200 bg-white rounded-xl">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Quote Requests
                </h3>
                <p className="text-gray-600 mb-6">
                  Start a chat with our AI travel assistant to get a personalized quote
                </p>
                <Link href="/chat">
                  <Button className="bg-tumakr-maroon hover:bg-tumakr-maroon/90 text-white">
                    Start Planning Your Trip
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
                            {getQuoteStatusBadge(quote.quoteStatus)}
                            {quote.details.duration && (
                              <Badge className="bg-tumakr-maroon text-white">
                                {quote.details.duration}
                              </Badge>
                            )}
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {quote.title}
                          </h3>
                          <p className="text-sm text-gray-500">Quote ID: {quote.id}</p>
                        </div>
                        <div className="text-right">
                          {quote.price ? (
                            <div>
                              <p className="text-2xl font-bold text-gray-900">
                                {formatPrice(quote.price)}
                              </p>
                              <p className="text-xs text-gray-500">Estimated Total</p>
                            </div>
                          ) : (
                            <div className="inline-flex items-center space-x-2 bg-tumakr-sage-green/10 rounded-lg px-4 py-2">
                              <div className="w-2 h-2 bg-tumakr-sage-green rounded-full animate-pulse"></div>
                              <p className="text-sm font-semibold text-tumakr-sage-green">
                                Calculating...
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Trip Details */}
                      <div className="bg-gray-50 rounded-lg p-4 mb-4 border-l-4 border-tumakr-mustard">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2 text-gray-700">
                            <MapPin className="w-4 h-4 text-tumakr-maroon" />
                            <span className="font-medium">Destination:</span>
                            <span>{quote.details.destination}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-700">
                            <Users className="w-4 h-4 text-tumakr-maroon" />
                            <span className="font-medium">Travelers:</span>
                            <span>{quote.details.participants} people</span>
                          </div>
                          {quote.details.budget && (
                            <div className="flex items-center space-x-2 text-gray-700">
                              <Wallet className="w-4 h-4 text-tumakr-maroon" />
                              <span className="font-medium">Budget:</span>
                              <span>{formatPrice(quote.details.budget)}</span>
                            </div>
                          )}
                          {quote.details.preferences &&
                            quote.details.preferences.length > 0 && (
                              <div className="flex items-center space-x-2 text-gray-700">
                                <Package className="w-4 h-4 text-tumakr-maroon" />
                                <span className="font-medium">Preferences:</span>
                                <span>{quote.details.preferences.join(", ")}</span>
                              </div>
                            )}
                        </div>
                      </div>

                      {/* Basic Info */}
                      <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>Requested: {quote.createdAt}</span>
                        </div>
                        {quote.details.startDate && quote.details.endDate && (
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>
                              Tour Date: {quote.details.startDate} ~{" "}
                              {quote.details.endDate}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Quote Progress Timeline */}
                      <div className="bg-linear-to-r from-tumakr-sage-green/10 to-tumakr-mustard/10 rounded-lg p-4 mb-4">
                        <div className="flex items-center justify-between">
                          {/* Step 1: Created */}
                          <div className="flex flex-col items-center flex-1">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center mb-1 bg-tumakr-sage-green text-white">
                              ✓
                            </div>
                            <p className="text-xs font-semibold text-gray-700">Created</p>
                          </div>
                          {/* Progress Bar 1 */}
                          <div className="flex-1 h-1 bg-gray-300 relative">
                            <div
                              className={`absolute left-0 top-0 h-full transition-all duration-500 ${
                                [
                                  "sent",
                                  "viewed",
                                  "approved",
                                  "rejected",
                                  "revision_requested",
                                ].includes(quote.quoteStatus)
                                  ? "bg-[#5a7263] w-full"
                                  : "bg-tumakr-sage-green w-1/2 animate-pulse"
                              }`}
                            ></div>
                          </div>
                          {/* Step 2: Quote Ready */}
                          <div className="flex flex-col items-center flex-1">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                                [
                                  "sent",
                                  "viewed",
                                  "approved",
                                  "rejected",
                                  "revision_requested",
                                ].includes(quote.quoteStatus)
                                  ? "bg-[#5a7263] text-white"
                                  : "bg-tumakr-mustard text-white animate-pulse"
                              }`}
                            >
                              {[
                                "sent",
                                "viewed",
                                "approved",
                                "rejected",
                                "revision_requested",
                              ].includes(quote.quoteStatus)
                                ? "✓"
                                : "2"}
                            </div>
                            <p className="text-xs font-semibold text-gray-700">
                              Quote Ready
                            </p>
                          </div>
                          {/* Progress Bar 2 */}
                          <div className="flex-1 h-1 bg-gray-300 relative">
                            <div
                              className={`absolute left-0 top-0 h-full transition-all duration-500 ${
                                ["approved", "rejected"].includes(quote.quoteStatus)
                                  ? "bg-[#5a7263] w-full"
                                  : quote.quoteStatus === "revision_requested"
                                  ? "bg-[#d97706] w-full"
                                  : ["sent", "viewed"].includes(quote.quoteStatus)
                                  ? "bg-tumakr-mustard w-1/2 animate-pulse"
                                  : "bg-gray-300 w-0"
                              }`}
                            ></div>
                          </div>
                          {/* Step 3: Response */}
                          <div className="flex flex-col items-center flex-1">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                                quote.quoteStatus === "approved"
                                  ? "bg-[#5a7263] text-white"
                                  : quote.quoteStatus === "rejected"
                                  ? "bg-[#8b4a52] text-white"
                                  : quote.quoteStatus === "revision_requested"
                                  ? "bg-[#d97706] text-white"
                                  : ["sent", "viewed"].includes(quote.quoteStatus)
                                  ? "bg-tumakr-mustard text-white animate-pulse"
                                  : "bg-gray-300 text-gray-600"
                              }`}
                            >
                              {quote.quoteStatus === "approved"
                                ? "✓"
                                : quote.quoteStatus === "rejected"
                                ? "✕"
                                : "3"}
                            </div>
                            <p className="text-xs font-semibold text-gray-700">
                              {quote.quoteStatus === "approved"
                                ? "Approved"
                                : quote.quoteStatus === "rejected"
                                ? "Declined"
                                : "Response"}
                            </p>
                          </div>
                        </div>
                        <p className="text-center text-xs text-gray-600 mt-3">
                          {getQuoteStatusDescription(quote.quoteStatus)}
                        </p>
                        {quote.validDate && canCustomerRespond(quote.quoteStatus) && (
                          <p className="text-center text-xs text-tumakr-mustard mt-1">
                            Valid until: {dayjs(quote.validDate).format("YYYY-MM-DD")}
                          </p>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-3 mb-3">
                        {quote.batchId &&
                          [
                            "sent",
                            "viewed",
                            "approved",
                            "rejected",
                            "revision_requested",
                          ].includes(quote.quoteStatus) && (
                            <Button
                              onClick={() => handleOpenQuoteModal(quote.batchId!)}
                              className="flex-1 bg-tumakr-maroon hover:bg-tumakr-maroon/90 text-white"
                            >
                              View Quote Details
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          )}
                        <Link
                          href={`/chat?session=${quote.sessionId}`}
                          className="flex-1"
                        >
                          <Button className="w-full border border-tumakr-maroon text-tumakr-maroon bg-white hover:bg-tumakr-maroon! hover:text-white!">
                            Continue Chat
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      </div>

                      {/* Customer Response Section - Only for sent/viewed status */}
                      {/* Message Section - For quotes with batchId */}
                      {quote.batchId &&
                        [
                          "sent",
                          "viewed",
                          "approved",
                          "rejected",
                          "revision_requested",
                        ].includes(quote.quoteStatus) && (
                          <div className="mt-4">
                            <MessageSection
                              batchId={quote.batchId}
                              quoteTitle={quote.title}
                              isCollapsible={true}
                              defaultExpanded={false}
                            />
                          </div>
                        )}

                      {canCustomerRespond(quote.quoteStatus) && quote.batchId && (
                        <>
                          {respondingQuoteId !== quote.id ? (
                            // Response Buttons
                            <div className="flex items-center gap-2 pt-3 border-t border-gray-200 mt-4">
                              <Button
                                onClick={() => handleStartResponse(quote.id, "approve")}
                                className="flex-1 bg-[#5a7263] hover:bg-[#4d6358] text-white"
                              >
                                <Check className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                onClick={() => handleStartResponse(quote.id, "reject")}
                                className="flex-1 bg-[#8b4a52] hover:bg-[#7a4148] text-white"
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Decline
                              </Button>
                              <Button
                                onClick={() =>
                                  handleStartResponse(quote.id, "request_changes")
                                }
                                className="flex-1 bg-tumakr-mustard hover:bg-tumakr-mustard/90 text-white"
                              >
                                <MessageSquarePlus className="w-4 h-4 mr-1" />
                                Request Changes
                              </Button>
                            </div>
                          ) : (
                            // Response Form
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <div className="flex items-center gap-2 mb-3">
                                  {responseType === "approve" && (
                                    <>
                                      <div className="w-7 h-7 rounded-full bg-[#5a7263] text-white flex items-center justify-center">
                                        <Check className="w-4 h-4" />
                                      </div>
                                      <span className="font-semibold text-gray-800 text-sm">
                                        Approve this quote
                                      </span>
                                    </>
                                  )}
                                  {responseType === "reject" && (
                                    <>
                                      <div className="w-7 h-7 rounded-full bg-[#8b4a52] text-white flex items-center justify-center">
                                        <XCircle className="w-4 h-4" />
                                      </div>
                                      <span className="font-semibold text-gray-800 text-sm">
                                        Decline this quote
                                      </span>
                                    </>
                                  )}
                                  {responseType === "request_changes" && (
                                    <>
                                      <div className="w-7 h-7 rounded-full bg-tumakr-mustard text-white flex items-center justify-center">
                                        <MessageSquarePlus className="w-4 h-4" />
                                      </div>
                                      <span className="font-semibold text-gray-800 text-sm">
                                        Request changes
                                      </span>
                                    </>
                                  )}
                                </div>
                                <textarea
                                  placeholder={
                                    responseType === "approve"
                                      ? "Any additional comments? (optional)"
                                      : responseType === "reject"
                                      ? "Please let us know why (optional)"
                                      : "Please describe the changes you need..."
                                  }
                                  value={responseMessage}
                                  onChange={(e) => setResponseMessage(e.target.value)}
                                  className="w-full p-3 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:border-tumakr-maroon focus:ring-1 focus:ring-tumakr-maroon bg-white"
                                  rows={3}
                                />
                                {responseError && (
                                  <p className="text-red-600 text-sm mt-2">
                                    {responseError}
                                  </p>
                                )}
                                <div className="flex justify-end gap-2 mt-3">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleCancelResponse}
                                    disabled={isSubmittingResponse}
                                    className="border-gray-300 text-gray-600"
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() =>
                                      handleSubmitInlineResponse(quote.batchId!)
                                    }
                                    disabled={isSubmittingResponse}
                                    className={`text-white ${
                                      responseType === "approve"
                                        ? "bg-[#5a7263] hover:bg-[#4d6358]"
                                        : responseType === "reject"
                                        ? "bg-[#8b4a52] hover:bg-[#7a4148]"
                                        : "bg-tumakr-mustard hover:bg-tumakr-mustard/90"
                                    }`}
                                  >
                                    {isSubmittingResponse ? (
                                      <>
                                        <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                                        Submitting...
                                      </>
                                    ) : (
                                      <>
                                        <Send className="w-4 h-4 mr-1" />
                                        Submit
                                      </>
                                    )}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {/* 도움말 섹션 */}
        <Card className="mt-12 bg-linear-to-r from-tumakr-maroon/5 to-tumakr-sage-green/5 border border-gray-200 shadow-lg rounded-xl">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Need help with your order?
            </h3>
            <p className="text-gray-600 mb-4">
              Our customer service team is happy to assist you
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/contact">
                <Button className="border border-tumakr-maroon text-tumakr-maroon bg-white hover:bg-tumakr-maroon! hover:text-white!">
                  Contact Us
                </Button>
              </Link>
              <Link href="/tours">
                <Button className="bg-tumakr-maroon hover:bg-tumakr-maroon/90 text-white">
                  Book New Tour
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quote Details Modal */}
      <QuotationModal
        batchId={selectedQuoteBatchId ?? undefined}
        isOpen={isQuoteModalOpen}
        onClose={handleCloseQuoteModal}
      />
    </div>
  );
}
