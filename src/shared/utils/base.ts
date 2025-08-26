import { isEmpty, maxBy } from "lodash-es";
import { getYmd } from "./dayUtils";

const mobileFullWidth = 390;

// const defaultFontPixel = parseInt(getComputedStyle(document.documentElement).fontSize, 10);
const defaultFontPixel = 16;

export const IMG_URI = "/assets/images";
export const MEDIA_URI = "/assets/media";
export const FONT_URI = "/assets/fonts";

export const unit = (size: number, float = 2): string => {
  const pxToRem = size / defaultFontPixel;
  return `${pxToRem}rem`;
  // const ratio = ((size / fullWidth) * 100).toFixed(float);
  // return `${ratio}vw`;
};

export const munit = (size: number, float = 2): string => {
  const ratio = ((size / mobileFullWidth) * 100).toFixed(float);
  return `${ratio}vw`;
};

export const getItemImg = (imgName?: string) => {
  if (!imgName) return "";
  return `${process.env.NEXT_PUBLIC_ASSET_URL}/items/${imgName}`;
};

export const REGEX = {};

export const forceEnterNumber = (str: string): string => {
  return str.replace(/[^0-9]/g, "");
};

export const yieldFor = (ms: number): Promise<string> => {
  return new Promise((resolve) => setTimeout(() => resolve("ok"), ms));
};

// condition 이 true이면 작업을 멈춤 (sync함수 여야함)
export const waitFor = (
  tryCount: number,
  condition: () => boolean,
  sleepMs = 100
): Promise<number | "timeout"> => {
  return new Promise((resolve) => {
    function doRetry(innerRetry: number) {
      // console.log('innerRetry', innerRetry, condition());
      if (condition()) resolve(innerRetry);
      else if (innerRetry > 0)
        setTimeout(() => doRetry(innerRetry - 1), sleepMs);
      else resolve("timeout");
    }
    doRetry(tryCount);
  });
};

export const comma = (num?: number | string): string => {
  if (!num) return "0";

  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const autoHypenPhone = (text: string): string => {
  const str = text.replace(/[^0-9]/g, "");
  return str
    ? `${str.substring(0, 3)}-${str.substring(3, 7)}-${str.substring(7)}`
    : "";
};

export const autoHypenTel = (text: string): string => {
  const str = text.replace(/[^0-9]/g, "");
  if (!str || str.length < 9) return "-";
  if (str.substring(0, 2) === "02") {
    return str.length === 9
      ? `${str.substring(0, 2)}-${str.substring(2, 5)}-${str.substring(5)}`
      : `${str.substring(0, 2)}-${str.substring(2, 6)}-${str.substring(6)}`;
  }
  return str.length === 10
    ? `${str.substring(0, 3)}-${str.substring(3, 6)}-${str.substring(6)}`
    : `${str.substring(0, 3)}-${str.substring(3, 7)}-${str.substring(7)}`;
};

export const goExternalLinkByPopup = (url: string, type = "blank"): boolean => {
  const isPopup = type !== "blank";

  if (isPopup) window.open(url, "_blank", "width=1000, height=700");
  else window.open(url, "_blank");

  return false;
};

export const safeJsonParse = (
  str: string,
  defaultValue = {},
  context = "json"
): any => {
  try {
    if (isEmpty(str)) return defaultValue;
    return JSON.parse(str);
  } catch (e) {
    console.warn(`Json Parsing Error: ${context}`, e);
    return defaultValue;
  }
};

export const TIMELINE_JOIN_KEY = "#@#";
