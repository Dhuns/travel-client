"use client";

import {
  Award,
  Calendar,
  Check,
  Clock,
  Gift,
  MapPin,
  Shield,
  Star,
  Users,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { privateTours, type Tour } from "@/data/mockTours";

export default function PrivateTourPage() {
  // 투어 데이터 상태
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    travelDate: "",
    numberOfTravelers: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  // HTML 태그 제거 함수
  const stripHtmlTags = (html: string): string => {
    return html.replace(/<[^>]*>/g, '').trim();
  };

  // HTML을 배열로 파싱하는 함수
  const parseHtmlToArray = (html: string | string[]): string[] => {
    if (Array.isArray(html)) return html;
    if (!html || typeof html !== 'string') return [];

    // <p> 태그로 분리하여 텍스트만 추출
    const matches = html.match(/<p[^>]*>(.*?)<\/p>/g);
    if (!matches) return [];

    return matches.map(match => {
      const text = match.replace(/<[^>]*>/g, '').trim();
      return text;
    }).filter(text => text.length > 0);
  };

  // knowBeforeYouGoItems 코드를 텍스트로 변환
  const parseKnowBeforeYouGo = (items: string[] | null): string[] => {
    if (!Array.isArray(items)) return [];

    const translations: Record<string, string> = {
      'PUBLIC_TRANSPORTATION_NEARBY': 'Public transportation nearby',
      'WHEELCHAIR_ACCESSIBLE': 'Wheelchair accessible',
      'STROLLER_ACCESSIBLE': 'Stroller accessible',
      'INFANTS_ALLOWED': 'Infants allowed',
      'NOT_RECOMMENDED_FOR_PREGNANT': 'Not recommended for pregnant travelers',
      'NO_HEART_PROBLEMS': 'Not recommended for travelers with heart problems',
      'MODERATE_PHYSICAL_FITNESS': 'Moderate physical fitness required',
    };

    return items.map(item => translations[item] || item);
  };

  // Bokun API에서 투어 데이터 가져오기
  useEffect(() => {
    async function fetchTours() {
      try {
        const tourPromises = privateTours.map(async (tour) => {
          try {
            const response = await fetch(
              `/api/bokun/activity/${tour.bokunExperienceId}`
            );
            if (response.ok) {
              const bokunData = await response.json();
              // Bokun 데이터를 우리 형식으로 변환
              const rawDescription = bokunData.excerpt || bokunData.shortDescription || bokunData.description || "";
              const description = stripHtmlTags(rawDescription);

              // Duration 계산
              let durationDisplay = "";
              if (bokunData.durationHours && bokunData.durationMinutes) {
                durationDisplay = `${bokunData.durationHours}h ${bokunData.durationMinutes}m`;
              } else if (bokunData.durationHours) {
                durationDisplay = `${bokunData.durationHours} hours`;
              } else if (bokunData.duration) {
                durationDisplay = `${bokunData.duration} hours`;
              }

              return {
                ...tour,
                title: bokunData.title || "",
                description: stripHtmlTags(description),
                image: bokunData.photos?.[0]?.url || tour.image,
                location: bokunData.googlePlace?.name || bokunData.meetingPoint?.title || bokunData.address?.city || "",
                duration: durationDisplay,
                durationText: bokunData.durationText || "",
                price: bokunData.pricing?.from ? `$${bokunData.pricing.from}` : "",
                included: parseHtmlToArray(bokunData.included),
                exclusions: parseHtmlToArray(bokunData.excluded),
                highlights: Array.isArray(bokunData.highlights) ? bokunData.highlights : [],
                activityCategories: Array.isArray(bokunData.activityCategories) ? bokunData.activityCategories : [],
                knowBeforeYouGo: parseKnowBeforeYouGo(bokunData.knowBeforeYouGoItems),
                minAge: bokunData.minAge || 0,
                cancellationPolicy: bokunData.cancellationPolicy?.title || "",
              };
            }
            return null; // API 실패시 null 반환
          } catch (error) {
            console.error(
              `Failed to fetch tour ${tour.bokunExperienceId}:`,
              error
            );
            return null; // 에러시 null 반환
          }
        });

        const fetchedTours = await Promise.all(tourPromises);
        // null이 아닌 투어만 필터링
        setTours(fetchedTours.filter((tour) => tour !== null) as Tour[]);
      } catch (error) {
        console.error("Failed to fetch tours:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTours();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // TODO: 백엔드 API 연동
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        travelDate: "",
        numberOfTravelers: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - 1.png */}
      <section className="relative px-6 min-h-screen flex items-center">
        {/* 배경 이미지 */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/design-mode/castle3.png"
            alt="Korean Palace Background"
            className="w-full h-full object-cover"
          />
          {/* 어두운 오버레이로 텍스트 가독성 확보 */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
        </div>

        {/* 콘텐츠 */}
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          {/* 로고와 부제목 */}
          <h1 className="font-bold text-white mb-2 drop-shadow-lg text-3xl">
            Tumakr Korea Private Tour
          </h1>

          {/* 배지 */}
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full mb-8 bg-[#651d2a]/90 backdrop-blur-sm shadow-lg">
            <span className="text-sm font-medium text-white">
              Dedicated Guide · Your Own Pace · Perfect Customization
            </span>
          </div>

          {/* 메인 제목 */}
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight drop-shadow-lg md:text-5xl">
            A Journey Perfectly Tailored
            <br />
            <span className="text-white">To Your Own Rhythm</span>
          </h2>

          {/* 설명 */}
          <p className="text-white/90 text-black md:text-lg mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Have you felt disappointed by tours that follow rigid schedules with
            large groups?
            <br />
            Do you dream of a journey where every question receives full
            attention, and you can
            <br />
            linger wherever your curiosity leads?
          </p>

          {/* CTA 버튼들 */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-[#651d2a] hover:bg-[#4a1520] text-white font-semibold shadow-lg cursor-pointer transition-colors"
              onClick={() => {
                document
                  .getElementById("inquiry-section")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Book Your Journey Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="font-semibold border-2 border-white text-white hover:bg-white/20 bg-white/5 backdrop-blur-sm shadow-lg cursor-pointer transition-colors"
              onClick={() => {
                document
                  .getElementById("tour-list")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore Tours
            </Button>
          </div>
        </div>
      </section>

      {/* What Makes Special Section - 3.png */}
      <section className="py-16 px-6 min-h-screen flex items-center">
        <div className="container mx-auto max-w-6xl w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* 왼쪽: 텍스트 */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                What Makes Private Tours
                <br />
                <span className="text-[#651d2a]">Truly Special</span>
              </h2>

              <p className="text-gray-700 mb-6 leading-relaxed">
                <strong>Tumakr Private Tours</strong> offer a perfectly
                customized journey through time, designed exclusively for you
                and your loved ones.
              </p>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Your dedicated guide accompanies you throughout, redesigning
                every aspect of the itinerary to match your interests.
              </p>

              <p className="text-gray-900 font-semibold mb-8">
                Your smallest curiosity becomes the beginning of a new
                exploration.
              </p>

              {/* 체크리스트 */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 bg-[#651d2a]">
                    <Check className="text-white" size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Perfectly Customized Itinerary:
                    </p>
                    <p className="text-gray-600">
                      Delve deeper into eras that fascinate you, or spend extra
                      time at places that unexpectedly win your heart.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 bg-[#651d2a]">
                    <Check className="text-white" size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Your Personal Expert Storyteller:
                    </p>
                    <p className="text-gray-600">
                      Your guide exists solely to satisfy your intellectual
                      curiosity.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 bg-[#651d2a]">
                    <Check className="text-white" size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Incomparable Freedom:
                    </p>
                    <p className="text-gray-600">
                      Walk, rest, and explore at your own pace while
                      experiencing the most comfortable atmosphere.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 오른쪽: 이미지 */}
            <div className="relative">
              <img
                src="/korean-tour-guide-with-tourists-by-the-ocean.jpg"
                alt="Tour Guide"
                className="w-full h-[600px] object-cover rounded-2xl shadow-xl"
              />
              {/* 평점 배지 */}
              <div className="absolute bottom-6 left-6 bg-[#651d2a] rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="text-yellow-400 fill-yellow-400" size={24} />
                  <span className="text-2xl font-bold text-white">4.9/5</span>
                </div>
                <p className="text-white text-sm">Customer Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tours Section - 4.png */}
      <section
        id="tour-list"
        className="py-16 px-6 min-h-screen flex items-center bg-gradient-to-br from-[#eda89b]/10 to-[#6d8675]/10"
      >
        <div className="container mx-auto max-w-6xl w-full">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Private Tours
            </h2>
            <p className="text-gray-600 text-lg">
              Discover extraordinary historical journeys with your dedicated
              expert guide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-3 text-center py-20">
                <p className="text-gray-600">Loading tours...</p>
              </div>
            ) : (
              tours.map((tour, index) => {
                // 투어별 색상 테마
                const colorThemes = [
                  { badge: "bg-[#651d2a]", text: "text-[#651d2a]", button: "bg-[#651d2a] hover:bg-[#651d2a]/90" },
                  { badge: "bg-[#c4982a]", text: "text-[#c4982a]", button: "bg-[#c4982a] hover:bg-[#c4982a]/90" },
                  { badge: "bg-[#6d8675]", text: "text-[#6d8675]", button: "bg-[#6d8675] hover:bg-[#6d8675]/90" },
                ];
                const theme = colorThemes[index % 3];

                return (
                  <Link key={tour.id} href={`/tours/private/${tour.id}`}>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="relative h-64">
                        <img
                          src={tour.image}
                          alt={tour.title}
                          className="w-full h-full object-cover"
                        />
                        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${theme.badge}`}>
                          {tour.badge}
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          {tour.location && (
                            <div className="flex items-center gap-1">
                              <MapPin size={16} />
                              <span>{tour.location}</span>
                            </div>
                          )}
                          {tour.duration && (
                            <div className="flex items-center gap-1">
                              <Clock size={16} />
                              <span>{tour.duration}</span>
                            </div>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                          {tour.title}
                        </h3>
                        {tour.description && (
                          <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                            {tour.description}
                          </p>
                        )}
                        {tour.price && (
                          <div className="mb-4">
                            <span className={`text-2xl font-bold ${theme.text}`}>
                              {tour.price}
                            </span>
                          </div>
                        )}
                        <div className="grid md:grid-cols-2 gap-6 mb-4">
                          {tour.included && tour.included.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                                Included:
                              </h4>
                              <ul className="space-y-2 text-sm text-gray-600">
                                {tour.included.map((item, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-[#651d2a] mt-0.5 flex-shrink-0" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {tour.exclusions && tour.exclusions.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                                Not Included:
                              </h4>
                              <ul className="space-y-2 text-sm text-gray-600">
                                {tour.exclusions.map((item, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <X className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                        {tour.highlights && tour.highlights.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {tour.highlights.map((highlight, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <Button className={`${theme.button} text-white w-full`}>
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Features Section - 2.png */}
      <section className="py-16 px-6 flex items-center bg-white">
        <div className="container mx-auto max-w-6xl w-full">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center bg-[#6d8675]">
                <Users className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Your Personal Expert Storyteller
              </h3>
              <p className="text-gray-600 leading-relaxed">
                No need to miss your chance to ask questions in a crowd. Your
                guide exists solely to satisfy your intellectual curiosity.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center bg-[#c4982a]">
                <MapPin className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Unparalleled Freedom
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Walk, rest, and explore at your own pace while experiencing the
                essence of history in the most comfortable atmosphere.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center bg-[#eda89b]">
                <Calendar className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Perfectly Customized Itinerary
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Dive deeper into periods that interest you, or spend more time
                at places that unexpectedly capture your heart. Everything
                unfolds according to your wishes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section - 5.png */}
      <section className="py-16 px-6 min-h-screen flex items-center">
        <div className="container mx-auto max-w-6xl w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your Journey Through Seoul
            </h2>
            <p className="text-gray-600 text-lg">
              Unforgettable moments exploring the perfect harmony of tradition
              and modernity
            </p>
          </div>

          {/* Storytelling 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative">
              <img
                src="/korean-traditional-palace-with-pond-reflection.jpg"
                alt="Palace Reflection"
                className="w-full h-[400px] object-cover rounded-2xl shadow-xl"
              />
            </div>
            <div>
              <div className="inline-block px-4 py-1 rounded-full text-sm font-semibold text-white mb-4 bg-[#6d8675]">
                Storytelling 1
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Step Into History, Deepen Through Conversation
              </h3>
              <p className="text-gray-600 leading-relaxed">
                "How accurate is this palace scene I saw in that drama?" From
                your simple question, our journey enters an entirely different
                dimension. Your guide goes beyond simply saying 'right' or
                'wrong'—they unveil the political circumstances of the era and
                the hidden relationships between historical figures,
                transforming the space before you into a living stage of
                history. This deep conversation, impossible in a crowded group
                tour, becomes not just a tour but a personal humanities concert
                crafted exclusively for you.
              </p>
            </div>
          </div>

          {/* Storytelling 2 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-block px-4 py-1 rounded-full text-sm font-semibold text-white mb-4 bg-[#6d8675]">
                Storytelling 2
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                The Joy of Unexpected Discovery, Time That's Truly Ours
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Walking beneath the palace eaves, you pause at a beautiful path
                where light pours through. In a group tour, you would have had
                to hurry along with regret, but your guide instead points to a
                quiet bench and suggests taking a rest. There, they quietly
                share secrets about the architectural style visible only from
                this spot. These unplanned pauses and unexpected discoveries are
                the greatest gift that a private tour, moving at our own pace,
                can offer.
              </p>
            </div>
            <div className="relative order-1 md:order-2">
              <div className="space-y-4">
                <img
                  src="/korean-traditional-hanbok-people-at-palace.jpg"
                  alt="Hanbok Experience"
                  className="w-full h-[250px] object-cover rounded-2xl shadow-xl"
                />
                <img
                  src="/group-of-tourists-in-hanbok-at-korean-palace.jpg"
                  alt="Group Tour"
                  className="w-full h-[250px] object-cover rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - 6.png */}
      <section className="py-16 px-6 flex items-center bg-[#272b38]">
        <div className="container mx-auto max-w-6xl w-full">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Gift className="text-[#c4982a]" size={32} />
              <h2 className="text-4xl font-bold text-white">
                Products & Souvenirs
              </h2>
            </div>
            <p className="text-gray-300 text-lg">
              Take home beautiful memories of Korea with our curated selection
              of traditional products and special souvenirs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Product 1 */}
            <div className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <img
                  src="/korean-traditional-hanbok-dress-pink.jpg"
                  alt="Traditional Hanbok"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white bg-[#651d2a]">
                  Traditional
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white px-2 py-1 rounded-full">
                  <Star className="text-yellow-400 fill-yellow-400" size={14} />
                  <span className="text-xs font-semibold">4.9</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Traditional Hanbok Set
                </h3>
              </div>
            </div>

            {/* Product 2 */}
            <div className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <img
                  src="/korean-beauty-skincare-products.jpg"
                  alt="K-Beauty Skincare"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white bg-[#eda89b]">
                  Beauty
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white px-2 py-1 rounded-full">
                  <Star className="text-yellow-400 fill-yellow-400" size={14} />
                  <span className="text-xs font-semibold">4.8</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  K-Beauty Skincare Kit
                </h3>
              </div>
            </div>

            {/* Product 3 */}
            <div className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <img
                  src="/korean-traditional-tea-set-ceramic.jpg"
                  alt="Korean Tea Collection"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white bg-[#6d8675]">
                  Food
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white px-2 py-1 rounded-full">
                  <Star className="text-yellow-400 fill-yellow-400" size={14} />
                  <span className="text-xs font-semibold">4.7</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Korean Tea Collection
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - 7.png */}
      <section
        id="inquiry-section"
        className="py-28 px-6 min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-white"
      >
        <div className="container mx-auto max-w-7xl w-full">
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* 왼쪽: 이미지와 특징 */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              {/* 배경 이미지 */}
              <div className="absolute inset-0">
                <img
                  src="/korean-traditional-palace-with-pond-reflection.jpg"
                  alt="Seoul Adventure"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#651d2a]/95 via-[#651d2a]/70 to-transparent"></div>
              </div>

              {/* 콘텐츠 */}
              <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <div className="mb-6">
                  <div className="inline-block px-4 py-2 rounded-full text-sm font-semibold text-white mb-4 bg-white/20 backdrop-blur-sm">
                    Premium Experience
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-4">
                    Ready for Your Seoul Adventure?
                  </h2>
                  <p className="text-white/90 text-lg mb-8">
                    Limited spots available for an intimate, unforgettable
                    experience
                  </p>
                </div>

                {/* 특징 하이라이트 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Star
                        className="text-yellow-400 fill-yellow-400"
                        size={20}
                      />
                      <span className="text-white font-semibold">
                        4.9/5 Rating
                      </span>
                    </div>
                    <p className="text-white/80 text-sm">500+ Reviews</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="text-[#c4982a]" size={20} />
                      <span className="text-white font-semibold">
                        Award Winning
                      </span>
                    </div>
                    <p className="text-white/80 text-sm">Best Tour 2024</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="text-[#eda89b]" size={20} />
                      <span className="text-white font-semibold">
                        Small Groups
                      </span>
                    </div>
                    <p className="text-white/80 text-sm">Max 12 People</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="text-[#6d8675]" size={20} />
                      <span className="text-white font-semibold">Secure</span>
                    </div>
                    <p className="text-white/80 text-sm">Safe Booking</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 오른쪽: 문의하기 패널 */}
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              {/* 제목 */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Request Your Private Tour
                </h2>
                <p className="text-gray-600 text-sm">
                  Fill out the form below and we'll create a customized
                  itinerary for you
                </p>
              </div>

              {/* 가이드 */}
              <div className="bg-[#651d2a]/5 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 text-sm mb-2">
                  Please include:
                </h3>
                <ul className="space-y-1 text-xs text-gray-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-[#651d2a] mt-0.5 flex-shrink-0" />
                    <span>Your preferred travel dates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-[#651d2a] mt-0.5 flex-shrink-0" />
                    <span>Number of travelers in your group</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-[#651d2a] mt-0.5 flex-shrink-0" />
                    <span>Your interests and tour preferences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-[#651d2a] mt-0.5 flex-shrink-0" />
                    <span>
                      Desired tour duration (half-day, full-day, or multi-day)
                    </span>
                  </li>
                </ul>
              </div>

              {/* 폼 */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="border border-gray-300 focus-visible:border-[#651d2a] focus-visible:ring-1 focus-visible:ring-[#651d2a] bg-white text-gray-900 placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    className="border border-gray-300 focus-visible:border-[#651d2a] focus-visible:ring-1 focus-visible:ring-[#651d2a] bg-white text-gray-900 placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Preferred Travel Date{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="travelDate"
                    value={formData.travelDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#651d2a] focus:border-[#651d2a] bg-white text-gray-900 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-datetime-edit-text]:text-gray-400 [&::-webkit-datetime-edit-month-field]:text-gray-400 [&::-webkit-datetime-edit-day-field]:text-gray-400 [&::-webkit-datetime-edit-year-field]:text-gray-400"
                    style={{
                      colorScheme: "light",
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Number of Travelers <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="number"
                    name="numberOfTravelers"
                    value={formData.numberOfTravelers}
                    onChange={handleChange}
                    placeholder="e.g., 2"
                    min="1"
                    required
                    className="border border-gray-300 focus-visible:border-[#651d2a] focus-visible:ring-1 focus-visible:ring-[#651d2a] bg-white text-gray-900 placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your interests, preferences, and desired tour duration..."
                    rows={4}
                    required
                    className="border border-gray-300 focus-visible:border-[#651d2a] focus-visible:ring-1 focus-visible:ring-[#651d2a] bg-white text-gray-900 placeholder:text-gray-400"
                  />
                </div>

                {submitStatus === "success" && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 text-sm">
                      Thank you! Your request has been sent. We'll get back to
                      you within 24 hours.
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 text-sm">
                      Something went wrong. Please try again or contact us
                      directly.
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 font-semibold bg-[#651d2a] hover:bg-[#4a1520] text-white shadow-lg"
                >
                  {isSubmitting ? "Sending..." : "Send Request"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
