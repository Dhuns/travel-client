import { NextRequest, NextResponse } from "next/server";
import { getBookingsByEmail, getBookingByConfirmationCode } from "@/lib/bokun";

/**
 * GET /api/orders
 * 사용자의 예약 목록 조회
 *
 * Query params:
 * - email: 사용자 이메일 (필수)
 * - confirmationCode: 특정 예약 조회 시 (선택)
 * - page: 페이지 번호 (기본값: 1)
 * - pageSize: 페이지 크기 (기본값: 20)
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");
  const confirmationCode = searchParams.get("confirmationCode");
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "20");

  // 특정 예약 조회
  if (confirmationCode) {
    try {
      const booking = await getBookingByConfirmationCode(confirmationCode);

      if (!booking) {
        return NextResponse.json(
          { error: "Booking not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(booking);
    } catch (error) {
      console.error("Error fetching booking:", error);
      return NextResponse.json(
        { error: "Failed to fetch booking" },
        { status: 500 }
      );
    }
  }

  // 이메일로 예약 목록 조회
  if (!email) {
    return NextResponse.json(
      { error: "Email is required" },
      { status: 400 }
    );
  }

  try {
    const result = await getBookingsByEmail(email, { page, pageSize });

    if (!result) {
      return NextResponse.json({
        items: [],
        totalCount: 0,
        pageSize,
        page,
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
