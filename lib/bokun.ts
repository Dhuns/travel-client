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

/**
 * Bokun activity 데이터를 우리 Tour 형식으로 변환
 */
export function transformBokunActivityToTour(
  activity: any,
  category: string,
  badge: string
) {
  return {
    id: activity.id?.toString() || "",
    title: activity.title || "",
    subtitle: activity.shortDescription || "",
    category: category,
    badge: badge,
    description: activity.description || activity.shortDescription || "",
    highlights: activity.highlights || [],
    image:
      activity.photos?.[0]?.url ||
      activity.photos?.[0]?.large ||
      "/images/design-mode/castle1.png",
    bokunExperienceId: activity.id?.toString() || "",
    categories: activity.categories || [],
    location: activity.meetingPoint?.title || activity.address?.city || "",
    included: activity.included || [],
    duration: activity.duration
      ? `${activity.duration.hours || 0} hours`
      : undefined,
    price: activity.pricing?.from
      ? `$${activity.pricing.from}`
      : activity.defaultPrice
      ? `$${activity.defaultPrice}`
      : undefined,
  };
}
