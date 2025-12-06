import { revalidateTag, revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

// CORS 헤더 설정
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// OPTIONS 요청 처리 (CORS preflight)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// POST 요청 - 투어 캐시 재검증
export async function POST() {
  try {
    // 'tours' 태그가 붙은 모든 fetch 캐시 무효화
    revalidateTag('tours');

    // 메인 페이지 (인기투어 포함) 재생성
    revalidatePath('/');

    return NextResponse.json(
      {
        success: true,
        message: 'Tour cache revalidated successfully',
        timestamp: new Date().toISOString()
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to revalidate tour cache',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500, headers: corsHeaders }
    );
  }
}
