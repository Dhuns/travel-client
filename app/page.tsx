"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/hero-section"
import {
  MapPin,
  Users,
  Star,
  Clock,
  Shield,
  Award,
  Globe,
  MessageCircle,
  ChevronRight,
  TrendingUp,
  Gift,
} from "lucide-react"
import { useState, useEffect, useMemo, useCallback } from "react"
import Link from "next/link"

/**
 * OneDay Korea 메인 페이지 컴포넌트
 *
 * 주요 기능:
 * - 히어로 섹션 (캐러셀 형태)
 * - 인기 여행지 소개
 * - 추천 투어 패키지
 * - 기념품 상품 진열
 * - 부가 서비스 안내
 * - How It Works 섹션
 * - CTA 섹션
 * - 공지사항 & 고객센터 섹션
 *
 * 성능 최적화:
 * - useMemo로 정적 데이터 메모이제이션
 * - useCallback으로 이벤트 핸들러 최적화
 * - 이미지 lazy loading 적용
 */
export default function HomePage() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  const heroImages = useMemo(
    () => [
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
    ],
    [],
  )

  const popularDestinations = useMemo(
    () => [
      {
        name: "Seoul City Tour",
        image: "/beautiful-korean-traditional-palace-with-tourists-.jpg",
        description: "Explore the heart of Korea with palaces, markets, and modern districts",
        rating: 4.9,
        reviews: 2847,
        price: "From $65",
        duration: "8 hours",
        highlights: ["Gyeongbokgung Palace", "Bukchon Hanok Village", "Myeongdong"],
      },
      {
        name: "Jeju Island Paradise",
        image: "/beautiful-jeju-island-hallasan-mountain-and-nature.jpg",
        description: "Discover Korea's tropical paradise with stunning nature and unique culture",
        rating: 4.8,
        reviews: 1923,
        price: "From $220",
        duration: "2 days",
        highlights: ["Hallasan Mountain", "Seongsan Ilchulbong", "Manjanggul Cave"],
      },
      {
        name: "Busan Coastal Experience",
        image: "/beautiful-busan-haeundae-beach-and-coastal-city-vi.jpg",
        description: "Experience Korea's coastal beauty with beaches, temples, and seafood",
        rating: 4.7,
        reviews: 1456,
        price: "From $115",
        duration: "Full day",
        highlights: ["Haeundae Beach", "Gamcheon Culture Village", "Jagalchi Market"],
      },
      {
        name: "DMZ Historical Tour",
        image: "/korean-dmz-border-historical-site-and-observation-.jpg",
        description: "Journey through Korea's divided history at the DMZ border",
        rating: 4.9,
        reviews: 3241,
        price: "From $58",
        duration: "6 hours",
        highlights: ["JSA Tour", "3rd Tunnel", "Dora Observatory"],
      },
    ],
    [],
  )

  const recommendedTours = useMemo(
    () => [
      {
        title: "Complete K-Culture Experience",
        duration: "3 days",
        price: "$220",
        originalPrice: "$295",
        image: "/beautiful-korean-traditional-hanbok-dress.jpg",
        rating: 4.9,
        reviews: 1847,
        category: "Bestseller",
        features: ["Hanbok Experience", "K-Pop Studio Visit", "Traditional Cooking", "Palace Tours"],
      },
      {
        title: "Seoul Highlights Premium",
        duration: "2 days",
        price: "$145",
        originalPrice: "$190",
        image: "/beautiful-korean-traditional-palace-with-tourists-.jpg",
        rating: 4.8,
        reviews: 2156,
        category: "Popular",
        features: ["Private Guide", "5-Star Hotel", "Fine Dining", "VIP Access"],
      },
      {
        title: "Nature & Wellness Retreat",
        duration: "4 days",
        price: "$330",
        originalPrice: "$440",
        image: "/korean-temple-stay-mountain-nature-wellness-retrea.jpg",
        rating: 4.7,
        reviews: 892,
        category: "New",
        features: ["Temple Stay", "Hiking Tours", "Spa Experience", "Meditation"],
      },
    ],
    [],
  )

  const souvenirs = useMemo(
    () => [
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
      {
        name: "K-Pop Merchandise",
        image: "/korean-kpop-merchandise-albums-and-accessories.jpg",
        rating: 4.9,
        reviews: 678,
        category: "Entertainment",
      },
    ],
    [],
  )

  const additionalServices = useMemo(
    () => [
      {
        title: "Private Car & Driver",
        description: "Comfortable private transportation with professional Korean-speaking driver",
        icon: Award,
        price: "From $58/day",
        features: ["Professional Driver", "Flexible Schedule", "Airport Pickup", "Multiple Destinations"],
      },
      {
        title: "Incheon Airport Transfer",
        description: "Convenient airport transportation to Seoul city center and major hotels",
        icon: MapPin,
        price: "From $18 one-way",
        features: ["24/7 Available", "Meet & Greet", "Luggage Assistance", "Multilingual Support"],
      },
      {
        title: "Tickets / WiFi / SIM Cards",
        description: "Essential travel items for your Korean adventure",
        icon: Globe,
        price: "From $11 each",
        features: ["Attraction Tickets", "Unlimited WiFi", "Local SIM Cards", "T-money Cards"],
      },
      {
        title: "Layover Tours",
        description: "Make the most of your layover time with Seoul highlights tour",
        icon: Clock,
        price: "From $33 per person",
        features: ["4-6 Hour Tours", "Airport Pickup", "Major Attractions", "Luggage Storage"],
      },
      {
        title: "Group Tour Packages",
        description: "Special rates and customized itineraries for groups of 6 or more",
        icon: Users,
        price: "Custom pricing",
        features: ["Group Discounts", "Custom Itinerary", "Dedicated Guide", "Group Transportation"],
      },
      {
        title: "Shuttle Bus Packages",
        description: "Convenient shuttle service to popular destinations outside Seoul",
        icon: Shield,
        price: "From $26 per person",
        features: ["Multiple Routes", "Comfortable Buses", "English Guide", "On-time Departure"],
      },
    ],
    [],
  )

  const scrollToTours = useCallback(() => {
    const section = document.getElementById("tours")
    section?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)

    return () => clearInterval(slideInterval)
  }, [heroImages.length])

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
            onClick: scrollToTours,
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
      <section id="tours" className="py-20 bg-gradient-to-br from-[#eda89b]/10 to-[#6d8675]/10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="w-8 h-8 text-[#651d2a] mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Most Popular Destinations</h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover Korea's most beloved destinations with our expert local guides
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularDestinations.map((destination, index) => {
              const destinationLinks = [
                "/destinations/seoul",
                "/destinations/jeju",
                "/destinations/busan",
                "/destinations/dmz",
              ]

              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy" // 이미지 lazy loading 추가
                    />
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{destination.rating}</span>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-[#651d2a] text-white px-3 py-1 rounded-full text-xs font-medium">
                        {destination.duration}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{destination.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{destination.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {destination.highlights.map((highlight, i) => (
                        <span key={i} className="bg-[#eda89b]/20 text-[#651d2a] px-2 py-1 rounded text-xs">
                          {highlight}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-[#651d2a]">{destination.price}</span>
                      <span className="text-sm text-gray-500">({destination.reviews} reviews)</span>
                    </div>
                    <Link href={destinationLinks[index]}>
                      <Button className="w-full bg-[#651d2a] hover:bg-[#651d2a]/90 text-white rounded-full">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 추천 투어 패키지 섹션 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Award className="w-8 h-8 text-[#651d2a] mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Recommended Tour Packages</h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create unforgettable memories with our expertly curated Korean travel packages
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {recommendedTours.map((tour, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={tour.image || "/placeholder.svg"}
                    alt={tour.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy" // 이미지 lazy loading 추가
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#651d2a] text-white px-3 py-1 rounded-full text-xs font-medium">
                      {tour.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{tour.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-[#c4982a] font-medium flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {tour.duration}
                    </span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-[#651d2a]">{tour.price}</span>
                      <span className="text-sm text-gray-400 line-through ml-2">{tour.originalPrice}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{tour.title}</h3>
                  <ul className="space-y-2 mb-6">
                    {tour.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm text-gray-600">
                        <div className="w-2 h-2 bg-[#651d2a] rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex space-x-3">
                    <Button className="flex-1 bg-[#651d2a] hover:bg-[#651d2a]/90 text-white py-3 rounded-full">
                      Book Now
                    </Button>
                    <Button
                      variant="outline"
                      className="px-4 py-3 rounded-full border-[#eda89b] text-[#651d2a] hover:bg-[#eda89b]/10 bg-transparent"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 기념품 & 상품 섹션 */}
      <section className="py-20 bg-gradient-to-br from-[#6d8675]/10 to-[#eda89b]/10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Gift className="w-8 h-8 text-[#651d2a] mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Complimentary Gifts & Souvenirs</h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Receive special Korean souvenirs as complimentary gifts with your tour booking
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
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
                      <span className="text-xs font-medium">{product.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
                  <div className="mb-4">
                    <p className="text-[#6d8675] font-semibold text-sm">Complimentary with tour booking</p>
                    <span className="text-xs text-gray-500">({product.reviews} reviews)</span>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Book your perfect Korean adventure in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[1, 2, 3].map((step) => (
              <div key={step} className="relative">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#651d2a] to-[#c4982a] rounded-full flex items-center justify-center mb-6 shadow-lg">
                    <span className="text-2xl font-bold text-white">{step}</span>
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
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Start Your Journey Today!</h2>
            <p className="text-xl text-white/90 mb-10">
              Sign up now and get your first travel quote for free. Experience the magic of Korea with expert guidance.
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
                <h3 className="text-2xl font-bold text-gray-900">Latest News</h3>
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
                      {item === 1 && "Winter Special: Cherry Blossom Preview Tours"}
                      {item === 2 && "New DMZ Tour Routes Available"}
                      {item === 3 && "Holiday Season Operating Hours"}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {item === 1 &&
                        "Book early for our exclusive 2025 cherry blossom season tours with special discounts"}
                      {item === 2 && "Experience expanded DMZ tours with newly opened observation points"}
                      {item === 3 && "Check our special operating schedule for the holiday season"}
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
                <h3 className="text-2xl font-bold text-gray-900">Customer Support</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                  <div className="space-y-3">
                    {[
                      { icon: MapPin, title: "Office Address", text: "123 Gangnam-daero, Seoul, South Korea" },
                      { icon: MessageCircle, title: "Email", text: "info@onedaykorea.com" },
                      { icon: Clock, title: "Business Hours", text: "Mon-Fri: 9:00 AM - 6:00 PM (KST)" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start">
                        <item.icon className="w-5 h-5 text-[#651d2a] mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.title}</p>
                          <p className="text-sm text-gray-600">{item.text}</p>
                          {item.title === "Business Hours" && (
                            <p className="text-sm text-gray-600">Sat-Sun: 10:00 AM - 4:00 PM (KST)</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Quick Links</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {["FAQ", "Booking Guide", "Cancellation", "Reviews"].map((link) => (
                      <Button
                        key={link}
                        variant="outline"
                        className="text-sm border-[#eda89b] text-[#651d2a] hover:bg-[#eda89b]/10 bg-transparent"
                      >
                        {link}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 플로팅 챗봇 버튼 */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button className="bg-[#651d2a] hover:bg-[#651d2a]/90 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center">
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}
