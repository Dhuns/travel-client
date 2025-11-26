import { NextRequest, NextResponse } from "next/server";
import { cancelBooking, getCancellationInfo } from "@/lib/bokun";

/**
 * GET /api/orders/[confirmationCode]/cancel
 * 취소 가능 여부 및 환불 정보 조회
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ confirmationCode: string }> }
) {
  const { confirmationCode } = await params;

  if (!confirmationCode) {
    return NextResponse.json(
      { error: "Confirmation code is required" },
      { status: 400 }
    );
  }

  try {
    const info = await getCancellationInfo(confirmationCode);

    if (!info) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(info);
  } catch (error) {
    console.error("Error getting cancellation info:", error);
    return NextResponse.json(
      { error: "Failed to get cancellation info" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/orders/[confirmationCode]/cancel
 * 예약 취소 실행
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ confirmationCode: string }> }
) {
  const { confirmationCode } = await params;

  if (!confirmationCode) {
    return NextResponse.json(
      { error: "Confirmation code is required" },
      { status: 400 }
    );
  }

  try {
    const body = await request.json().catch(() => ({}));
    const { reason } = body;

    const result = await cancelBooking(confirmationCode, {
      reason: reason || "Customer requested cancellation",
      sendNotification: true,
    });

    if (!result) {
      return NextResponse.json(
        { error: "Failed to cancel booking" },
        { status: 500 }
      );
    }

    if (!result.success) {
      return NextResponse.json(
        { error: result.message || "Failed to cancel booking" },
        { status: 400 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error cancelling booking:", error);
    return NextResponse.json(
      { error: "Failed to cancel booking" },
      { status: 500 }
    );
  }
}
