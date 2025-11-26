"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Calendar,
  Users,
  ArrowLeft,
  Loader2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuthStore } from "@/src/shared/store/authStore";

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

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const confirmationCode = params.confirmationCode as string;
  const { isAuthenticated } = useAuthStore();

  const [booking, setBooking] = useState<BokunBooking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 취소 관련 상태
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelResult, setCancelResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // 예약 상세 정보 가져오기
  useEffect(() => {
    async function fetchBooking() {
      if (!confirmationCode) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/orders/${confirmationCode}`);

        if (!response.ok) {
          if (response.status === 404) {
            setError("예약을 찾을 수 없습니다.");
          } else {
            throw new Error("Failed to fetch booking");
          }
          return;
        }

        const data = await response.json();
        setBooking(data);
      } catch (err) {
        console.error("Error fetching booking:", err);
        setError("예약 정보를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchBooking();
  }, [confirmationCode]);

  // 예약 취소 처리
  const handleCancelBooking = async () => {
    if (!confirmationCode) return;

    setIsCancelling(true);
    setCancelResult(null);

    try {
      const response = await fetch(`/api/orders/${confirmationCode}/cancel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reason: cancelReason || "고객 요청에 의한 취소",
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setCancelResult({
          success: true,
          message: "예약이 성공적으로 취소되었습니다.",
        });
        // 예약 정보 새로고침
        setBooking((prev) =>
          prev ? { ...prev, status: "CANCELLED" } : null
        );
      } else {
        setCancelResult({
          success: false,
          message: result.error || "예약 취소에 실패했습니다.",
        });
      }
    } catch (err) {
      console.error("Error cancelling booking:", err);
      setCancelResult({
        success: false,
        message: "예약 취소 중 오류가 발생했습니다.",
      });
    } finally {
      setIsCancelling(false);
    }
  };

  // 상태 뱃지
  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; color: string }> = {
      CONFIRMED: { label: "예약확정", color: "bg-[#6d8675] text-white" },
      CANCELLED: { label: "취소됨", color: "bg-[#8b4a52] text-white" },
      RESERVED: { label: "예약대기", color: "bg-[#c4982a] text-white" },
      PENDING: { label: "처리중", color: "bg-gray-500 text-white" },
    };
    const config = statusConfig[status] || {
      label: status,
      color: "bg-gray-400 text-white",
    };
    return (
      <Badge className={`${config.color} px-4 py-2 text-base`}>
        {config.label}
      </Badge>
    );
  };

  // 날짜 포맷
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  };

  // 비로그인 상태
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-[#faf9f7] to-gray-50 pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <Card className="p-12 text-center shadow-lg border border-gray-200 bg-white rounded-xl">
            <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              로그인이 필요합니다
            </h3>
            <p className="text-gray-600 mb-6">
              예약 상세 정보를 확인하려면 로그인해주세요
            </p>
            <Link href="/login">
              <Button className="bg-[#651d2a] hover:bg-[#4a1520] text-white">
                로그인하기
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-[#faf9f7] to-gray-50 pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-[#651d2a] animate-spin mb-4" />
            <p className="text-gray-600">예약 정보를 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-[#faf9f7] to-gray-50 pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <Card className="p-12 text-center shadow-lg border border-gray-200 bg-white rounded-xl">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {error || "예약을 찾을 수 없습니다"}
            </h3>
            <p className="text-gray-600 mb-6">
              예약 번호를 다시 확인해주세요
            </p>
            <Link href="/orders">
              <Button className="bg-[#651d2a] hover:bg-[#4a1520] text-white">
                주문 내역으로 돌아가기
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  const canCancel = booking.status === "CONFIRMED";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-[#faf9f7] to-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* 뒤로가기 */}
        <Link
          href="/orders"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#651d2a] transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>주문 내역으로 돌아가기</span>
        </Link>

        {/* 예약 상태 헤더 */}
        <Card className="mb-6 overflow-hidden shadow-lg border border-gray-200 bg-white rounded-xl">
          <div className="bg-gradient-to-r from-[#651d2a] to-[#7a2433] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm mb-1">예약번호</p>
                <h1 className="text-2xl font-bold text-white">
                  {booking.confirmationCode}
                </h1>
              </div>
              {getStatusBadge(booking.status)}
            </div>
          </div>

          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">예약일</p>
                <p className="text-gray-900 font-medium">
                  {formatDate(booking.creationDate)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">총 결제금액</p>
                <p className="text-2xl font-bold text-[#651d2a]">
                  {booking.totalPriceFormatted ||
                    (booking.totalPrice
                      ? `${booking.currency || ""} ${booking.totalPrice.toLocaleString()}`
                      : "")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 예약자 정보 */}
        {booking.customer && (
          <Card className="mb-6 overflow-hidden shadow-lg border border-gray-200 bg-white rounded-xl">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                예약자 정보
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">이름</p>
                    <p className="text-gray-900 font-medium">
                      {booking.customer.firstName || ""}{" "}
                      {booking.customer.lastName || ""}
                    </p>
                  </div>
                </div>
                {booking.customer.email && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">이메일</p>
                      <p className="text-gray-900 font-medium">
                        {booking.customer.email}
                      </p>
                    </div>
                  </div>
                )}
                {booking.customer.phoneNumber && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">연락처</p>
                      <p className="text-gray-900 font-medium">
                        {booking.customer.phoneNumber}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 예약 상품 목록 */}
        <Card className="mb-6 overflow-hidden shadow-lg border border-gray-200 bg-white rounded-xl">
          <CardContent className="p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              예약 상품
            </h2>
            <div className="space-y-4">
              {(booking.productBookings || []).map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-50 rounded-lg p-5 border-l-4 border-[#651d2a]"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {product.productTitle}
                    </h3>
                    <Badge
                      className={
                        product.status === "CONFIRMED"
                          ? "bg-[#6d8675] text-white"
                          : "bg-gray-400 text-white"
                      }
                    >
                      {product.status === "CONFIRMED" ? "확정" : product.status}
                    </Badge>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <div>
                        <p className="text-gray-500 text-xs">투어 날짜</p>
                        <p className="font-medium">
                          {formatDate(product.startDate)}
                        </p>
                        {product.startTime && (
                          <p className="text-gray-500">{product.startTime}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4" />
                      <div>
                        <p className="text-gray-500 text-xs">인원</p>
                        <p className="font-medium">
                          {product.participants || 0}명
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 text-xs">금액</p>
                      <p className="text-lg font-bold text-gray-900">
                        {product.totalPriceFormatted || ""}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 예약 취소 버튼 */}
        {canCancel && (
          <Card className="mb-6 overflow-hidden shadow-lg border border-red-200 bg-red-50 rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    예약 취소
                  </h3>
                  <p className="text-sm text-gray-600">
                    예약을 취소하시겠습니까? 취소 정책에 따라 환불이 진행됩니다.
                  </p>
                </div>
                <Button
                  onClick={() => setShowCancelModal(true)}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  예약 취소하기
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 이미 취소된 경우 */}
        {booking.status === "CANCELLED" && (
          <Card className="mb-6 overflow-hidden shadow-lg border border-gray-300 bg-gray-100 rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <XCircle className="w-8 h-8 text-gray-500" />
                <div>
                  <h3 className="text-lg font-bold text-gray-700">
                    취소된 예약입니다
                  </h3>
                  <p className="text-sm text-gray-500">
                    이 예약은 이미 취소되었습니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 도움말 */}
        <Card className="bg-gradient-to-r from-[#651d2a]/5 to-[#6d8675]/5 border border-gray-200 shadow-lg rounded-xl">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              도움이 필요하신가요?
            </h3>
            <p className="text-gray-600 mb-4">
              예약 관련 문의사항이 있으시면 고객센터로 연락해주세요
            </p>
            <Link href="/contact">
              <Button
                variant="outline"
                className="border-[#651d2a] text-[#651d2a] hover:bg-[#651d2a] hover:text-white"
              >
                문의하기
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* 취소 확인 모달 */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-white rounded-xl shadow-2xl">
            <CardContent className="p-6">
              {cancelResult ? (
                // 취소 결과
                <div className="text-center">
                  {cancelResult.success ? (
                    <>
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        취소 완료
                      </h3>
                      <p className="text-gray-600 mb-6">{cancelResult.message}</p>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        취소 실패
                      </h3>
                      <p className="text-gray-600 mb-6">{cancelResult.message}</p>
                    </>
                  )}
                  <Button
                    onClick={() => {
                      setShowCancelModal(false);
                      setCancelResult(null);
                      if (cancelResult.success) {
                        router.push("/orders");
                      }
                    }}
                    className="w-full bg-[#651d2a] hover:bg-[#4a1520] text-white"
                  >
                    확인
                  </Button>
                </div>
              ) : (
                // 취소 확인
                <>
                  <div className="text-center mb-6">
                    <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      예약을 취소하시겠습니까?
                    </h3>
                    <p className="text-gray-600">
                      예약번호: {booking.confirmationCode}
                    </p>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      취소 사유 (선택)
                    </label>
                    <textarea
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#651d2a] resize-none"
                      rows={3}
                      placeholder="취소 사유를 입력해주세요"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => setShowCancelModal(false)}
                      variant="outline"
                      className="flex-1 border-gray-300"
                      disabled={isCancelling}
                    >
                      돌아가기
                    </Button>
                    <Button
                      onClick={handleCancelBooking}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                      disabled={isCancelling}
                    >
                      {isCancelling ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          취소 중...
                        </>
                      ) : (
                        "예약 취소"
                      )}
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
