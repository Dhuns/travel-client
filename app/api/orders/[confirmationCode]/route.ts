import { NextRequest, NextResponse } from "next/server";
import { getBookingByConfirmationCode } from "@/lib/bokun";

/**
 * GET /api/orders/[confirmationCode]
 * 특정 예약 상세 조회
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
