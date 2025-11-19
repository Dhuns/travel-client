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
    price: activity.pricing?.from ? `$${activity.pricing.from}` : "",
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
