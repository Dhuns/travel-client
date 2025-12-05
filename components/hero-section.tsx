"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building, Calendar, Mountain, Phone, Shield, Waves } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

interface HeroImage {
  src: string;
  title: string;
  subtitle: string;
}

interface HeroAction {
  text: string;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "outline";
  className?: string;
}

interface HeroStat {
  value: string;
  label: string;
}

interface HeroBadge {
  text: string;
  icon?: string;
  className?: string;
}

/**
 * HeroSection 컴포넌트 Props 인터페이스
 *
 * @param type - 히어로 섹션 타입 (carousel: 캐러셀, background: 배경이미지, overlay: 오버레이)
 * @param title - 메인 제목
 * @param titleHighlight - 강조할 제목 부분 (다른 색상으로 표시)
 * @param subtitle - 부제목
 * @param description - 설명 텍스트
 * @param backgroundImage - 배경 이미지 URL (background/overlay 타입용)
 * @param images - 캐러셀 이미지 배열 (carousel 타입용)
 * @param badge - 상단 배지 정보
 * @param actions - 액션 버튼들
 * @param stats - 통계 정보 (숫자와 라벨)
 * @param height - 섹션 높이 설정
 * @param overlay - 오버레이 강도
 * @param textColor - 텍스트 색상 (흰색/검은색)
 * @param rating - 평점 (투어 페이지용)
 * @param reviews - 리뷰 수 (투어 페이지용)
 * @param duration - 소요 시간 (투어 페이지용)
 * @param participants - 참가자 수 (투어 페이지용)
 * @param location - 위치 정보 (투어 페이지용)
 */
interface HeroSectionProps {
  // 히어로 타입 결정
  type: "carousel" | "background" | "overlay";

  // 기본 콘텐츠
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  description?: string;

  // 배경 관련
  backgroundImage?: string;
  images?: HeroImage[]; // carousel 타입용

  // UI 요소들
  badge?: HeroBadge;
  actions?: HeroAction[];
  stats?: HeroStat[];

  // 스타일링
  height?: "screen" | "large" | "medium" | "small";
  overlay?: "light" | "medium" | "dark" | "none";
  textColor?: "white" | "dark";
  className?: string;

  // 추가 정보 (투어 페이지용)
  rating?: number;
  reviews?: number;
  duration?: string;
  participants?: string;
  location?: string;
}

/**
 * HeroSection 컴포넌트
 *
 * 웹사이트의 메인 히어로 섹션을 렌더링하는 재사용 가능한 컴포넌트
 *
 * 주요 기능:
 * - 3가지 타입 지원: 캐러셀, 배경이미지, 오버레이
 * - 자동 슬라이드 캐러셀 (5초 간격)
 * - 반응형 디자인
 * - 다양한 UI 요소 지원 (배지, 버튼, 통계, 메타정보)
 *
 * 성능 최적화:
 * - useMemo로 아이콘 매핑 최적화
 * - 조건부 렌더링으로 불필요한 DOM 생성 방지
 * - 이미지 lazy loading 지원
 */
export function HeroSection({
  type,
  title,
  titleHighlight,
  subtitle,
  description,
  backgroundImage,
  images = [],
  badge,
  actions = [],
  stats = [],
  height = "large",
  overlay = "medium",
  textColor = "white",
  className = "",
  rating,
  reviews,
  duration,
  participants,
  location,
}: HeroSectionProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const iconMap = useMemo(
    () => ({
      building: Building,
      waves: Waves,
      mountain: Mountain,
      shield: Shield,
      calendar: Calendar,
      phone: Phone,
    }),
    []
  );

  const heightClasses = useMemo(
    () => ({
      screen: "min-h-screen",
      large: "h-96",
      medium: "h-80",
      small: "h-64",
    }),
    []
  );

  const overlayClasses = useMemo(
    () => ({
      light: "bg-black/20",
      medium: "bg-black/40",
      dark: "bg-black/60",
      none: "",
    }),
    []
  );

  useEffect(() => {
    if (type === "carousel" && images.length > 1) {
      const slideInterval = setInterval(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % images.length);
      }, 5000);
      return () => clearInterval(slideInterval);
    }
  }, [type, images.length]);

  const getIconComponent = useMemo(
    () => (iconName?: string) => {
      if (!iconName || !(iconName in iconMap)) return null;

      const IconComponent = iconMap[iconName as keyof typeof iconMap];
      return <IconComponent className="w-4 h-4 mr-1" />;
    },
    [iconMap]
  );

  // 텍스트 색상 클래스
  const textColorClass = textColor === "white" ? "text-white" : "text-gray-900";

  if (type === "carousel") {
    return (
      <section className="relative flex items-center bg-white overflow-hidden min-h-screen">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center h-screen">
            {/* 좌측 콘텐츠 영역 */}
            <div className="space-y-8">
              {/* 배지 표시 */}
              {badge && (
                <Badge
                  className={
                    badge.className ||
                    "bg-sky-100 text-sky-700 hover:bg-sky-200 px-4 py-2 text-sm font-medium"
                  }
                >
                  {getIconComponent(badge.icon)} {badge.text}
                </Badge>
              )}

              {/* 제목 및 설명 */}
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight text-balance">
                  {title}
                  {titleHighlight && (
                    <span className="ml-2 text-tumakr-maroon">{titleHighlight}</span>
                  )}
                </h1>
                {description && (
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed text-pretty">
                    {description}
                  </p>
                )}
              </div>

              {/* 액션 버튼들 */}
              {actions.length > 0 && (
                <div className="flex flex-col sm:flex-row gap-4">
                  {actions.map((action, index) =>
                    action.href ? (
                      <Link key={index} href={action.href}>
                        <Button
                          variant={action.variant || "default"}
                          className={action.className || "px-8 py-4 text-lg rounded-full"}
                        >
                          {action.text}
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        key={index}
                        onClick={action.onClick}
                        variant={action.variant || "default"}
                        className={action.className || "px-8 py-4 text-lg rounded-full"}
                      >
                        {action.text}
                      </Button>
                    )
                  )}
                </div>
              )}
            </div>

            {/* 우측 캐러셀 영역 */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === currentSlideIndex ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.title}
                      width={600}
                      height={450}
                      className="w-full h-full object-cover"
                      loading={index === 0 ? "eager" : "lazy"} // 첫 번째 이미지만 즉시 로딩
                    />
                    {/* 이미지 오버레이 */}
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

                    {/* 이미지 캡션 */}
                    <div className="absolute bottom-6 left-6 text-white z-10">
                      <h3
                        className="text-xl font-bold mb-2 text-white"
                        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
                      >
                        {image.title}
                      </h3>
                      <p
                        className="text-sm opacity-90 text-white"
                        style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.8)" }}
                      >
                        {image.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 캐러셀 인디케이터 */}
              {images.length > 1 && (
                <div className="flex justify-center mt-6 space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlideIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSlideIndex
                          ? "bg-tumakr-mustard scale-110"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`슬라이드 ${index + 1}로 이동`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div
      className={`relative ${heightClasses[height]} overflow-hidden ${
        type === "background" ? "pt-28 pb-16" : ""
      } ${className}`}
      style={
        backgroundImage
          ? {
              backgroundImage: `url('${backgroundImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }
          : {}
      }
    >
      {/* 오버레이 레이어 */}
      {overlay !== "none" && (
        <div className={`absolute inset-0 ${overlayClasses[overlay]}`}></div>
      )}

      {/* 그라데이션 오버레이 (텍스트 가독성 향상) */}
      {textColor === "white" && (
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"></div>
      )}

      <div className="container mx-auto px-6 relative z-10 h-full flex items-center">
        <div className="max-w-4xl">
          {/* 배지 */}
          {badge && (
            <Badge
              className={
                badge.className ||
                `mb-4 ${
                  textColor === "white"
                    ? "bg-sky-600/90 text-white backdrop-blur-sm"
                    : "bg-sky-100 text-sky-700"
                }`
              }
            >
              {getIconComponent(badge.icon)} {badge.text}
            </Badge>
          )}

          {/* 투어 페이지용 메타 정보 */}
          {(rating || duration || participants || location) && (
            <div className="flex items-center space-x-2 mb-3">
              {rating && (
                <div className={`flex items-center space-x-1 ${textColorClass}`}>
                  <span className="text-yellow-400">★</span>
                  <span className="font-semibold">{rating}</span>
                  {reviews && <span className="opacity-80">({reviews} 리뷰)</span>}
                </div>
              )}
            </div>
          )}

          {/* 메인 제목 */}
          <h1 className={`text-5xl font-bold mb-6 ${textColorClass} drop-shadow-2xl`}>
            {title}
            {titleHighlight && (
              <span className="ml-2 text-tumakr-maroon">{titleHighlight}</span>
            )}
          </h1>

          {/* 부제목 */}
          {subtitle && (
            <h2
              className={`text-2xl font-semibold mb-4 ${textColorClass} drop-shadow-lg`}
            >
              {subtitle}
            </h2>
          )}

          {/* 설명 텍스트 */}
          {description && (
            <p
              className={`text-xl mb-8 leading-relaxed max-w-3xl drop-shadow-lg ${textColorClass}`}
            >
              {description}
            </p>
          )}

          {/* 투어 메타 정보 */}
          {(duration || participants || location) && (
            <div className={`flex flex-wrap gap-4 ${textColorClass} mb-8`}>
              {duration && (
                <div className="flex items-center space-x-1">
                  <span>⏰</span>
                  <span>{duration}</span>
                </div>
              )}
              {participants && (
                <div className="flex items-center space-x-1">
                  <span>👥</span>
                  <span>{participants}</span>
                </div>
              )}
              {location && (
                <div className="flex items-center space-x-1">
                  <span>📍</span>
                  <span>{location}</span>
                </div>
              )}
            </div>
          )}

          {/* 통계 정보 */}
          {stats.length > 0 && (
            <div className={`flex flex-wrap gap-8 ${textColorClass} mb-8`}>
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center bg-black/20 backdrop-blur-sm rounded-lg p-3"
                >
                  <div className="text-3xl font-bold text-sky-200">{stat.value}</div>
                  <div className="text-sm text-sky-100">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* 액션 버튼들 */}
          {actions.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {actions.map((action, index) =>
                action.href ? (
                  <Link key={index} href={action.href}>
                    <Button
                      size="lg"
                      variant={action.variant || "default"}
                      className={
                        action.className ||
                        `${
                          textColor === "white"
                            ? "bg-sky-600/90 hover:bg-sky-700 backdrop-blur-sm"
                            : "bg-sky-600 hover:bg-sky-700"
                        }`
                      }
                    >
                      {action.text}
                    </Button>
                  </Link>
                ) : (
                  <Button
                    key={index}
                    size="lg"
                    onClick={action.onClick}
                    variant={action.variant || "default"}
                    className={
                      action.className ||
                      `${
                        textColor === "white"
                          ? "bg-sky-600/90 hover:bg-sky-700 backdrop-blur-sm"
                          : "bg-sky-600 hover:bg-sky-700"
                      }`
                    }
                  >
                    {action.text}
                  </Button>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
