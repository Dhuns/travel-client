import {
  Award,
  ChevronRight,
  Clock,
  Gift,
  Globe,
  MapPin,
  MessageCircle,
  Shield,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  historyToursConfig,
  multidayToursConfig,
  privateToursConfig,
} from "@/config/tours";

import { Button } from "@/components/ui/button";
import { FavoriteButton } from "@/components/favorite-button";
import { HeroSection } from "@/components/hero-section";
import Image from "next/image";
import Link from "next/link";
import { getToursFromConfig } from "@/lib/bokun";

export const revalidate = 3600; // 1시간마다 재생성

const categoryDisplayNames: Record<string, string> = {
  history: "History Tours",
  private: "Private Tours",
  multiday: "Multiday Tours",
};

/**
 * OneDay Korea 메인 페이지 컴포넌트
 * 서버 컴포넌트로 Bokun API 데이터를 실시간으로 가져와 표시
 */
export default async function HomePage() {
  // Bokun API에서 모든 투어 데이터 가져오기
  const allConfigs = [
    ...historyToursConfig,
    ...privateToursConfig,
    ...multidayToursConfig,
  ];
  const allTours = await getToursFromConfig(allConfigs);

  // 인기 여행지 (상위 4개)
  const popularDestinations = allTours.slice(0, 4);

  // 추천 투어 패키지 (3개 - 카테고리별로 선택)
  const recommendedTours = [
    allTours.find((t) => t.category === "history"),
    allTours.find((t) => t.category === "private"),
    allTours.find((t) => t.category === "multiday"),
  ].filter(Boolean);

  const heroImages = [
    {
      src: "/beautiful-korean-traditional-palace-with-tourists-.jpg",
      title: "Discover Traditional Korea",
      subtitle: "Experience the grandeur of ancient palaces and royal heritage",
    },
    {
      src: "/beautiful-korean-traditional-hanbok-dress.jpg",
      title: "Embrace Korean Culture",
      subtitle: "Immerse yourself in authentic traditions and customs",
    },
    {
      src: "/beautiful-korean-traditional-palace-with-tourists-.jpg",
      title: "Modern Seoul Adventures",
      subtitle: "Explore vibrant K-pop culture and urban life",
    },
  ];

  const souvenirs = [
    {
      name: "Traditional Hanbok Set",
      image: "/beautiful-korean-traditional-hanbok-dress.jpg",
      rating: 4.9,
      reviews: 234,
      category: "Traditional",
    },
    {
      name: "K-Beauty Skincare Kit",
      image: "/korean-skincare-beauty-products-set.jpg",
      rating: 4.8,
      reviews: 456,
      category: "Beauty",
    },
    {
      name: "Korean Tea Collection",
      image: "/elegant-korean-traditional-tea-set.jpg",
      rating: 4.7,
      reviews: 189,
      category: "Food",
    },
  ];

  const additionalServices = [
    {
      title: "Private Car & Driver",
      description:
        "Comfortable private transportation with professional Korean-speaking driver",
      icon: Award,
      price: "From $58/day",
      features: [
        "Professional Driver",
        "Flexible Schedule",
        "Airport Pickup",
        "Multiple Destinations",
      ],
    },
    {
      title: "Incheon Airport Transfer",
      description:
        "Convenient airport transportation to Seoul city center and major hotels",
      icon: MapPin,
      price: "From $18 one-way",
      features: [
        "24/7 Available",
        "Meet & Greet",
        "Luggage Assistance",
        "Multilingual Support",
      ],
    },
    {
      title: "Tickets / WiFi / SIM Cards",
      description: "Essential travel items for your Korean adventure",
      icon: Globe,
      price: "From $11 each",
      features: [
        "Attraction Tickets",
        "Unlimited WiFi",
        "Local SIM Cards",
        "T-money Cards",
      ],
    },
    {
      title: "Layover Tours",
      description:
        "Make the most of your layover time with Seoul highlights tour",
      icon: Clock,
      price: "From $33 per person",
      features: [
        "4-6 Hour Tours",
        "Airport Pickup",
        "Major Attractions",
        "Luggage Storage",
      ],
    },
    {
      title: "Group Tour Packages",
      description:
        "Special rates and customized itineraries for groups of 6 or more",
      icon: Users,
      price: "Custom pricing",
      features: [
        "Group Discounts",
        "Custom Itinerary",
        "Dedicated Guide",
        "Group Transportation",
      ],
    },
    {
      title: "Shuttle Bus Packages",
      description:
        "Convenient shuttle service to popular destinations outside Seoul",
      icon: Shield,
      price: "From $26 per person",
      features: [
        "Multiple Routes",
        "Comfortable Buses",
        "English Guide",
        "On-time Departure",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* 히어로 섹션 - 캐러셀 형태로 메인 비주얼 표시 */}
      <HeroSection
        type="carousel"
        title="Korea"
        titleHighlight="History Tour"
        description="Experience authentic Korean culture with local experts. From traditional palaces to K-pop tours, we create unforgettable memories for international travelers."
        badge={{
          text: "🇰🇷 Authentic Korean Experience",
          className: "bg-[#eda89b]/20 text-[#651d2a] hover:bg-[#eda89b]/30",
        }}
        actions={[
          {
            text: "Explore Tours",
            href: "#tours",
            className:
              "bg-[#651d2a] hover:bg-[#651d2a]/90 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300",
          },
          {
            text: "Watch Video",
            href: "https://www.youtube.com",
            variant: "outline",
            className:
              "border-[#651d2a] text-[#651d2a] hover:bg-[#eda89b]/10 px-8 py-4 text-lg rounded-full bg-transparent",
          },
        ]}
        images={heroImages}
        className="min-h-screen"
      />

      {/* 인기 여행지 섹션 */}
      <section
        id="tours"
        className="py-20 bg-gradient-to-br from-[#eda89b]/10 to-[#6d8675]/10"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="w-8 h-8 text-[#651d2a] mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Most Popular Destinations
              </h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover Korea's most beloved destinations with our expert local
              guides
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularDestinations.map((tour, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col h-full"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={tour.image || "/placeholder.svg"}
                    alt={tour.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#651d2a]/90 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {categoryDisplayNames[tour.category]}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white text-[#651d2a] px-3 py-1 rounded-full text-xs font-bold">
                      {tour.price}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <FavoriteButton tourId={tour.bokunExperienceId} />
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {tour.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 h-16">
                    {tour.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="text-sm text-[#c4982a] font-medium flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {tour.duration}
                    </div>
                    {tour.location && (
                      <div className="text-sm text-gray-500 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {tour.location}
                      </div>
                    )}
                  </div>
                  <Link
                    href={`/tours/${tour.category}/${tour.bokunExperienceId}`}
                    className="mt-auto"
                  >
                    <Button className="w-full bg-[#651d2a] hover:bg-[#651d2a]/90 text-white rounded-full">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 추천 투어 패키지 섹션 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Award className="w-8 h-8 text-[#651d2a] mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Recommended Tour Packages
              </h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create unforgettable memories with our expertly curated Korean
              travel packages
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {recommendedTours.filter(Boolean).map(
              (tour, index) =>
                tour && (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100 flex flex-col h-full"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={tour.image || "/placeholder.svg"}
                        alt={tour.title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#651d2a] text-white px-3 py-1 rounded-full text-xs font-medium">
                          {categoryDisplayNames[tour.category]}
                        </span>
                      </div>
                      {tour.price && (
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                          <span className="text-sm font-bold text-[#651d2a]">
                            {tour.price}
                          </span>
                        </div>
                      )}
                      <div className="absolute bottom-3 right-3">
                        <FavoriteButton tourId={tour.bokunExperienceId} />
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center mb-4">
                        <span className="text-sm text-[#c4982a] font-medium flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {tour.duration}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        {tour.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-6 line-clamp-4 h-20">
                        {tour.description}
                      </p>
                      <Link
                        href={`/tours/${tour.category}/${tour.bokunExperienceId}`}
                        className="mt-auto"
                      >
                        <Button className="w-full bg-[#651d2a] hover:bg-[#651d2a]/90 text-white py-3 rounded-full">
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </section>

      {/* 기념품 & 상품 섹션 */}
      <section className="py-20 bg-gradient-to-br from-[#6d8675]/10 to-[#eda89b]/10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Gift className="w-8 h-8 text-[#651d2a] mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Complimentary Gifts & Souvenirs
              </h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Receive special Korean souvenirs as complimentary gifts with your
              tour booking
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 max-w-5xl mx-auto">
            {souvenirs.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#c4982a] text-white px-2 py-1 rounded-full text-xs font-medium">
                      {product.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-[#6d8675] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      FREE GIFT
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <div className="mb-4">
                    <p className="text-[#6d8675] font-semibold text-sm">
                      Complimentary with tour booking
                    </p>
                    <span className="text-xs text-gray-500">
                      ({product.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works 섹션 */}
      <section className="py-20 bg-gradient-to-br from-[#eda89b]/10 to-[#6d8675]/10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Book your perfect Korean adventure in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[1, 2, 3].map((step) => (
              <div key={step} className="relative">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#651d2a] to-[#c4982a] rounded-full flex items-center justify-center mb-6 shadow-lg">
                    <span className="text-2xl font-bold text-white">
                      {step}
                    </span>
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg p-8 w-full hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                      {step === 1 && "Plan Your Trip"}
                      {step === 2 && "AI Analysis & Recommendations"}
                      {step === 3 && "Instant Quote"}
                    </h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      {step === 1 &&
                        "Tell us about your travel plans: dates, group size, preferences, and desired destinations in Korea"}
                      {step === 2 &&
                        "Our AI analyzes your input to recommend the best accommodations, attractions, and transportation options"}
                      {step === 3 &&
                        "Receive a detailed itinerary with pricing breakdown and booking options instantly"}
                    </p>
                  </div>
                  {step < 3 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[#eda89b] to-transparent"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 - 지금 바로 시작 */}
      <section className="py-20 bg-gradient-to-r from-[#651d2a] via-[#c4982a] to-[#6d8675] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Start Your Journey Today!
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Sign up now and get your first travel quote for free. Experience
              the magic of Korea with expert guidance.
            </p>
            <Button className="bg-white text-[#651d2a] hover:bg-gray-50 px-14 py-6 text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 font-semibold">
              Get Started Free
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* 공지사항 & 고객센터 섹션 */}
      <section className="py-20 bg-gradient-to-br from-[#6d8675]/10 to-[#eda89b]/10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* 공지사항 */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#eda89b]/20 rounded-full flex items-center justify-center mr-4">
                  <MessageCircle className="w-6 h-6 text-[#651d2a]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Latest News
                </h3>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="border-l-4 border-[#651d2a] pl-4 py-2 hover:bg-[#eda89b]/10 transition-colors cursor-pointer"
                  >
                    <p className="text-sm text-gray-500 mb-1">
                      {item === 1 && "December 15, 2024"}
                      {item === 2 && "December 10, 2024"}
                      {item === 3 && "December 5, 2024"}
                    </p>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {item === 1 &&
                        "Winter Special: Cherry Blossom Preview Tours"}
                      {item === 2 && "New DMZ Tour Routes Available"}
                      {item === 3 && "Holiday Season Operating Hours"}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {item === 1 &&
                        "Book early for our exclusive 2025 cherry blossom season tours with special discounts"}
                      {item === 2 &&
                        "Experience expanded DMZ tours with newly opened observation points"}
                      {item === 3 &&
                        "Check our special operating schedule for the holiday season"}
                    </p>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-6 bg-[#651d2a] hover:bg-[#651d2a]/90 text-white rounded-full">
                View All News
              </Button>
            </div>

            {/* 고객센터 */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#6d8675]/20 rounded-full flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-[#6d8675]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Customer Support
                </h3>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Contact Information
                  </h4>
                  <div className="space-y-3">
                    {[
                      {
                        icon: MapPin,
                        title: "Office Address",
                        text: "123 Gangnam-daero, Seoul, South Korea",
                      },
                      {
                        icon: MessageCircle,
                        title: "Email",
                        text: "info@onedaykorea.com",
                      },
                      {
                        icon: Clock,
                        title: "Business Hours",
                        text: "Mon-Fri: 9:00 AM - 6:00 PM (KST)",
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start">
                        <item.icon className="w-5 h-5 text-[#651d2a] mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {item.title}
                          </p>
                          <p className="text-sm text-gray-600">{item.text}</p>
                          {item.title === "Business Hours" && (
                            <p className="text-sm text-gray-600">
                              Sat-Sun: 10:00 AM - 4:00 PM (KST)
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Quick Links
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {["FAQ", "Booking Guide", "Cancellation", "Reviews"].map(
                      (link) => (
                        <Button
                          key={link}
                          variant="outline"
                          className="text-sm border-[#eda89b] text-[#651d2a] hover:bg-[#eda89b]/10 bg-transparent"
                        >
                          {link}
                        </Button>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
