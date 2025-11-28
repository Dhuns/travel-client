// Bokun API 유틸리티 함수
import crypto from "crypto";

const BOKUN_API_BASE_URL = "https://api.bokun.io";

interface BokunCredentials {
  accessKey: string;
  secretKey: string;
}

function getBokunCredentials(): BokunCredentials {
  const accessKey = process.env.BOKUN_ACCESS_KEY;
  const secretKey = process.env.BOKUN_SECRET_KEY;

  if (!accessKey || !secretKey) {
    throw new Error("Bokun API credentials are not configured");
  }

  return { accessKey, secretKey };
}

function getAuthHeaders(method: string, path: string): Record<string, string> {
  const { accessKey, secretKey } = getBokunCredentials();

  // UTC 시간 생성 (yyyy-MM-dd HH:mm:ss 포맷)
  const now = new Date();
  const date = now.toISOString().slice(0, 19).replace("T", " ");

  // 서명 생성을 위한 문자열
  const signatureString = `${date}${accessKey}${method}${path}`;

  // HMAC-SHA1 서명 생성
  const signature = crypto
    .createHmac("sha1", secretKey)
    .update(signatureString)
    .digest("base64");

  return {
    "X-Bokun-Date": date,
    "X-Bokun-AccessKey": accessKey,
    "X-Bokun-Signature": signature,
  };
}

/**
 * Bokun API에서 특정 activity 정보 가져오기
 */
export async function getBokunActivity(experienceId: string) {
  const path = `/activity.json/${experienceId}`;
  const url = `${BOKUN_API_BASE_URL}${path}`;

  try {
    const response = await fetch(url, {
      headers: {
        ...getAuthHeaders("GET", path),
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 }, // 1시간마다 캐시 갱신
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Failed to fetch Bokun activity ${experienceId}:`,
        response.status,
        response.statusText,
        errorText
      );
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching Bokun activity ${experienceId}:`, error);
    return null;
  }
}

/**
 * Bokun API에서 여러 activities 정보 가져오기
 */
export async function getBokunActivities(experienceIds: string[]) {
  const activities = await Promise.all(
    experienceIds.map((id) => getBokunActivity(id))
  );

  return activities.filter((activity) => activity !== null);
}

// HTML 태그 제거 함수
const stripHtmlTags = (html: string): string => {
  return html.replace(/<[^>]*>/g, "").trim();
};

// HTML을 배열로 파싱하는 함수
const parseHtmlToArray = (html: string | string[]): string[] => {
  if (Array.isArray(html)) return html;
  if (!html || typeof html !== "string") return [];

  // <p> 태그로 분리하여 텍스트만 추출
  const matches = html.match(/<p[^>]*>(.*?)<\/p>/g);
  if (!matches) return [];

  return matches
    .map((match) => {
      const text = match.replace(/<[^>]*>/g, "").trim();
      return text;
    })
    .filter((text) => text.length > 0);
};

// knowBeforeYouGoItems 코드를 텍스트로 변환
const parseKnowBeforeYouGo = (items: string[] | null): string[] => {
  if (!Array.isArray(items)) return [];

  const translations: Record<string, string> = {
    PUBLIC_TRANSPORTATION_NEARBY: "Public transportation nearby",
    WHEELCHAIR_ACCESSIBLE: "Wheelchair accessible",
    STROLLER_ACCESSIBLE: "Stroller accessible",
    INFANTS_ALLOWED: "Infants allowed",
    NOT_RECOMMENDED_FOR_PREGNANT: "Not recommended for pregnant travelers",
    NO_HEART_PROBLEMS: "Not recommended for travelers with heart problems",
    MODERATE_PHYSICAL_FITNESS: "Moderate physical fitness required",
  };

  return items.map((item) => translations[item] || item);
};

/**
 * Bokun activity 데이터를 우리 Tour 형식으로 변환
 */
export function transformBokunActivityToTour(
  activity: any,
  category: string,
  badge: string
) {
  const rawDescription =
    activity.excerpt || activity.shortDescription || activity.description || "";
  const description = stripHtmlTags(rawDescription);

  // Duration 계산
  let durationDisplay = "";
  if (activity.durationHours && activity.durationMinutes) {
    durationDisplay = `${activity.durationHours}h ${activity.durationMinutes}m`;
  } else if (activity.durationHours) {
    durationDisplay = `${activity.durationHours} hours`;
  } else if (activity.duration) {
    durationDisplay = `${activity.duration} hours`;
  }

  const bokunExperienceId = activity.id?.toString() || "";

  return {
    id: bokunExperienceId, // bokunExperienceId를 id로 사용
    title: activity.title || "",
    subtitle: activity.shortDescription || "",
    category: category,
    badge: badge,
    description: description,
    highlights: Array.isArray(activity.highlights) ? activity.highlights : [],
    image: activity.photos?.[0]?.originalUrl || "/images/placeholder-tour.jpg",
    bokunExperienceId: bokunExperienceId,
    categories: activity.categories || [],
    location:
      activity.googlePlace?.name ||
      activity.meetingPoint?.title ||
      activity.address?.city ||
      "",
    included: parseHtmlToArray(activity.included),
    exclusions: parseHtmlToArray(activity.excluded),
    duration: durationDisplay,
    durationText: activity.durationText || "",
    price: activity.nextDefaultPriceAsText ||
           (activity.pricing?.from ? `$${activity.pricing.from}` : ""),
    activityCategories: Array.isArray(activity.activityCategories)
      ? activity.activityCategories
      : [],
    knowBeforeYouGo: parseKnowBeforeYouGo(activity.knowBeforeYouGoItems),
    minAge: activity.minAge || 0,
    cancellationPolicy: activity.cancellationPolicy?.title || "",
  };
}

/**
 * TourConfig 배열로부터 투어 데이터를 가져옵니다 (서버 사이드용)
 */
export async function getToursFromConfig(
  configs: Array<{
    bokunExperienceId: string;
    category: string;
    badge: string;
  }>
) {
  const tourPromises = configs.map(async (config) => {
    const activity = await getBokunActivity(config.bokunExperienceId);
    if (!activity) return null;

    return transformBokunActivityToTour(
      activity,
      config.category,
      config.badge
    );
  });

  const tours = await Promise.all(tourPromises);
  return tours.filter((tour) => tour !== null);
}

// ==================== Backend API (Dev Server) ====================

/**
 * 백엔드 API에서 반환하는 투어 타입
 */
export interface BackendTour {
  id: number;
  bokunExperienceId: string;
  category: string | null;
  categoryOverride: string | null;
  isActive: boolean;
  displayOrder: number | null;
  title: string | null;
  description: string | null;
  thumbnailUrl: string | null;
  price: number | null;
  currency: string | null;
  duration: string | null;
  lastSyncedAt: string | null;
}

/**
 * 백엔드 API에서 카테고리별 투어 가져오기
 */
export async function getToursByCategory(category: string): Promise<BackendTour[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9191/api";

  try {
    const response = await fetch(`${apiUrl}/tour/category?category=${category}`, {
      next: { revalidate: 3600 }, // 1시간마다 캐시 갱신
    });

    if (!response.ok) {
      console.error(`Failed to fetch ${category} tours:`, response.status);
      return [];
    }

    const data: BackendTour[] = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${category} tours:`, error);
    return [];
  }
}

/**
 * 백엔드 API에서 카테고리별 Bokun Experience ID 목록만 가져오기
 */
export async function getBokunIdsByCategory(category: string): Promise<string[]> {
  const backendTours = await getToursByCategory(category);
  return backendTours.map(tour => tour.bokunExperienceId);
}

/**
 * 백엔드 API에서 인기 투어 가져오기
 */
export async function getPopularTours(): Promise<BackendTour[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9191/api";

  try {
    const response = await fetch(`${apiUrl}/tour/popular`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error("Failed to fetch popular tours:", response.status);
      return [];
    }

    const data: BackendTour[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching popular tours:", error);
    return [];
  }
}

/**
 * 백엔드 투어를 프론트엔드 Tour 형식으로 변환
 */
export function transformBackendTourToFrontend(tour: BackendTour, badge?: string) {
  // HTML 태그 제거
  const cleanDescription = tour.description
    ? tour.description.replace(/<[^>]*>/g, "").trim()
    : "";

  return {
    id: tour.bokunExperienceId,
    title: tour.title || "Untitled Tour",
    subtitle: "",
    category: tour.categoryOverride || tour.category || "",
    badge: badge || tour.categoryOverride || tour.category || "Tour",
    description: cleanDescription,
    highlights: [],
    image: tour.thumbnailUrl || "/images/placeholder-tour.jpg",
    bokunExperienceId: tour.bokunExperienceId,
    categories: [],
    location: "",
    included: [],
    exclusions: [],
    duration: tour.duration || "",
    durationText: tour.duration || "",
    price: tour.price ? `${tour.currency === "USD" ? "$" : tour.currency}${tour.price}` : "",
    activityCategories: [],
    knowBeforeYouGo: [],
    minAge: 0,
    cancellationPolicy: "",
  };
}

/**
 * 백엔드 API로 카테고리별 투어를 가져와 프론트엔드 형식으로 변환
 * (백엔드 데이터만 사용 - 위젯 없이 간단한 정보만 필요할 때)
 */
export async function getToursFromBackend(category: string, badge?: string) {
  const backendTours = await getToursByCategory(category);
  return backendTours.map(tour => transformBackendTourToFrontend(tour, badge));
}

/**
 * 백엔드에서 카테고리별 Bokun ID 가져온 후 직접 Bokun API 호출
 * (위젯용 전체 데이터 필요할 때)
 */
export async function getToursWithBokunData(category: string, badge?: string) {
  // 1. 백엔드에서 해당 카테고리의 bokunExperienceId 목록 가져오기
  const bokunIds = await getBokunIdsByCategory(category);

  if (bokunIds.length === 0) {
    return [];
  }

  // 2. 각 ID로 직접 Bokun API 호출해서 전체 데이터 가져오기
  const tourPromises = bokunIds.map(async (id) => {
    const activity = await getBokunActivity(id);
    if (!activity) return null;
    return transformBokunActivityToTour(activity, category, badge || category);
  });

  const tours = await Promise.all(tourPromises);
  return tours.filter((tour) => tour !== null);
}

// ==================== Booking API ====================

/**
 * Bokun 예약 검색 쿼리 타입
 */
export interface BookingSearchQuery {
  customerEmail?: string;
  customerName?: string;
  confirmationCode?: string;
  startDate?: string; // yyyy-MM-dd
  endDate?: string; // yyyy-MM-dd
  statuses?: string[]; // CONFIRMED, CANCELLED, etc.
  pageSize?: number;
  page?: number;
}

/**
 * Bokun 예약 정보 타입
 */
export interface BokunBooking {
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
  productBookings: Array<{
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
  }>;
}

/**
 * Bokun 예약 검색 결과 타입
 */
export interface BookingSearchResult {
  items: BokunBooking[];
  totalCount: number;
  pageSize: number;
  page: number;
}

/**
 * 예약 검색 (이메일, 이름, 날짜 등으로 검색)
 */
export async function searchBookings(
  query: BookingSearchQuery
): Promise<BookingSearchResult | null> {
  const path = "/booking.json/booking-search";
  const url = `${BOKUN_API_BASE_URL}${path}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        ...getAuthHeaders("POST", path),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerEmail: query.customerEmail,
        customerName: query.customerName,
        confirmationCode: query.confirmationCode,
        startDateFrom: query.startDate,
        startDateTo: query.endDate,
        statuses: query.statuses,
        pageSize: query.pageSize || 20,
        page: query.page || 1,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to search bookings:", response.status, errorText);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching bookings:", error);
    return null;
  }
}

/**
 * 특정 예약 조회 (확인 코드로)
 */
export async function getBookingByConfirmationCode(
  confirmationCode: string
): Promise<BokunBooking | null> {
  const path = `/booking.json/booking/${confirmationCode}`;
  const url = `${BOKUN_API_BASE_URL}${path}`;

  try {
    const response = await fetch(url, {
      headers: {
        ...getAuthHeaders("GET", path),
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Failed to fetch booking ${confirmationCode}:`,
        response.status,
        errorText
      );
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching booking ${confirmationCode}:`, error);
    return null;
  }
}

/**
 * 사용자 이메일로 예약 목록 조회
 */
export async function getBookingsByEmail(
  email: string,
  options?: {
    pageSize?: number;
    page?: number;
  }
): Promise<BookingSearchResult | null> {
  return searchBookings({
    customerEmail: email,
    pageSize: options?.pageSize || 50,
    page: options?.page || 1,
  });
}

/**
 * 예약 취소 요청 타입
 */
export interface CancelBookingRequest {
  reason?: string;
  sendNotification?: boolean;
}

/**
 * 예약 취소 결과 타입
 */
export interface CancelBookingResult {
  success: boolean;
  booking?: BokunBooking;
  refundAmount?: number;
  refundAmountFormatted?: string;
  message?: string;
}

/**
 * 예약 취소
 */
export async function cancelBooking(
  confirmationCode: string,
  options?: CancelBookingRequest
): Promise<CancelBookingResult | null> {
  const path = `/booking.json/cancel-booking/${confirmationCode}`;
  const url = `${BOKUN_API_BASE_URL}${path}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        ...getAuthHeaders("POST", path),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reason: options?.reason || "Customer requested cancellation",
        sendNotification: options?.sendNotification ?? true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Failed to cancel booking ${confirmationCode}:`,
        response.status,
        errorText
      );
      return {
        success: false,
        message: `Failed to cancel booking: ${response.statusText}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      booking: data,
      refundAmount: data.refundAmount,
      refundAmountFormatted: data.refundAmountFormatted,
    };
  } catch (error) {
    console.error(`Error cancelling booking ${confirmationCode}:`, error);
    return {
      success: false,
      message: "An error occurred while cancelling the booking",
    };
  }
}

/**
 * 취소 정책 및 환불 금액 조회
 */
export async function getCancellationInfo(
  confirmationCode: string
): Promise<{
  canCancel: boolean;
  refundAmount?: number;
  refundAmountFormatted?: string;
  cancellationPolicy?: string;
  message?: string;
} | null> {
  // 먼저 예약 정보를 가져와서 취소 가능 여부 확인
  const booking = await getBookingByConfirmationCode(confirmationCode);

  if (!booking) {
    return null;
  }

  // CONFIRMED 상태만 취소 가능
  const canCancel = booking.status === "CONFIRMED";

  return {
    canCancel,
    message: canCancel
      ? "이 예약은 취소할 수 있습니다."
      : `현재 상태(${booking.status})에서는 취소할 수 없습니다.`,
  };
}
