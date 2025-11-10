import { NextResponse } from "next/server";
import { getBokunActivity } from "@/lib/bokun";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const activity = await getBokunActivity(params.id);

    if (!activity) {
      return NextResponse.json(
        { error: "Activity not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(activity);
  } catch (error) {
    console.error("Error in Bokun API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch activity" },
      { status: 500 }
    );
  }
}
