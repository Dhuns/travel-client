import { Calendar, Check, Clock, Compass, MapPin, Star, Users } from "lucide-react";

import { FavoriteButton } from "@/components/favorite-button";
import { Button } from "@/components/ui/button";
import { getToursFromBackend } from "@/lib/bokun";
import Link from "next/link";

export const revalidate = 3600; // 1시간마다 재생성

export default async function PrivateTourPage() {
  // 백엔드 API에서 투어 데이터 가져오기 (안정적)
  const tours = await getToursFromBackend("private", "Private Tour");

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - 1.png */}
      <section className="relative px-6 min-h-screen flex items-center">
        {/* 배경 이미지 */}
        <div className="absolute inset-0 z-0">
          <img
            src="/korea-palace-3.jpg"
            alt="Korean Palace Background"
            className="w-full h-full object-cover"
          />
          {/* 어두운 오버레이로 텍스트 가독성 확보 */}
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/70"></div>
        </div>

        {/* 콘텐츠 */}
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          {/* 로고와 부제목 */}
          <h1 className="font-bold text-white mb-2 drop-shadow-lg text-3xl">
            Tumakr Korea Private Tour
          </h1>

          {/* 배지 */}
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full mb-8 bg-tumakr-maroon/90 backdrop-blur-sm shadow-lg">
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
          <p className="text-white/90 md:text-lg mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Have you felt disappointed by tours that follow rigid schedules with large
            groups?
            <br />
            Do you dream of a journey where every question receives full attention, and
            you can
            <br />
            linger wherever your curiosity leads?
          </p>

          {/* CTA 버튼들 */}

          {/* 
            TODO: 예약 폼 추가 후 주석 해제
            <a href="#inquiry-section">
              <Button
                size="lg"
                className="bg-tumakr-maroon hover:bg-tumakr-maroon/90 text-white font-semibold shadow-lg cursor-pointer transition-colors"
              >
                Book Your Journey Now
              </Button>
            </a> */}
          <a href="#tour-list">
            <Button
              size="lg"
              variant="outline"
              className="font-semibold border-2 border-white text-white hover:bg-white/20 bg-white/5 backdrop-blur-sm shadow-lg transition-colors"
            >
              Explore Tours
            </Button>
          </a>
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
                <span className="text-tumakr-maroon">Truly Special</span>
              </h2>

              <p className="text-gray-700 mb-6 leading-relaxed">
                <strong>Tumakr Private Tours</strong> offer a perfectly customized journey
                through time, designed exclusively for you and your loved ones.
              </p>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Your dedicated guide accompanies you throughout, redesigning every aspect
                of the itinerary to match your interests.
              </p>

              <p className="text-gray-900 font-semibold mb-8">
                Your smallest curiosity becomes the beginning of a new exploration.
              </p>

              {/* 체크리스트 */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 bg-tumakr-maroon">
                    <Check className="text-white" size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Perfectly Customized Itinerary:
                    </p>
                    <p className="text-gray-600">
                      Delve deeper into eras that fascinate you, or spend extra time at
                      places that unexpectedly win your heart.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 bg-tumakr-maroon">
                    <Check className="text-white" size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Your Personal Expert Storyteller:
                    </p>
                    <p className="text-gray-600">
                      Your guide exists solely to satisfy your intellectual curiosity.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 bg-tumakr-maroon">
                    <Check className="text-white" size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Incomparable Freedom:</p>
                    <p className="text-gray-600">
                      Walk, rest, and explore at your own pace while experiencing the most
                      comfortable atmosphere.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 오른쪽: 이미지 */}
            <div className="relative">
              <img
                src="/walk-palace.jpg"
                alt="Tour Guide"
                className="w-full h-[600px] object-cover rounded-2xl shadow-xl"
              />
              {/* 평점 배지 */}
              <div className="absolute bottom-6 left-6 bg-tumakr-maroon rounded-xl p-4 shadow-lg">
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
        className="py-16 px-6 min-h-screen flex items-center bg-linear-to-br from-tumakr-dusty-pink/10 to-tumakr-sage-green/10"
      >
        <div className="container mx-auto max-w-6xl w-full">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Private Tours
            </h2>
            <p className="text-gray-600 text-lg">
              Discover extraordinary historical journeys with your dedicated expert guide
            </p>
          </div>

          {tours.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600">No tours available at the moment.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* 첫 줄: 2개의 큰 카드 */}
              <div className="grid md:grid-cols-2 gap-8">
                {tours.slice(0, 2).map((tour, index) => {
                  const colorThemes = [
                    {
                      badge: "bg-tumakr-maroon",
                      text: "text-tumakr-maroon",
                      button: "bg-tumakr-maroon hover:bg-tumakr-maroon/90",
                    },
                    {
                      badge: "bg-tumakr-mustard",
                      text: "text-tumakr-mustard",
                      button: "bg-tumakr-mustard hover:bg-tumakr-mustard/90",
                    },
                  ];
                  const theme = colorThemes[index % 2];

                  return (
                    <Link
                      key={tour.bokunExperienceId}
                      href={`/tours/private/${tour.bokunExperienceId}`}
                    >
                      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer h-full">
                        <div className="relative h-72">
                          <img
                            src={tour.image}
                            alt={tour.title}
                            className="w-full h-full object-cover"
                          />
                          <div
                            className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${theme.badge}`}
                          >
                            {tour.badge}
                          </div>
                          <div className="absolute bottom-3 right-3">
                            <FavoriteButton
                              tourId={tour.bokunExperienceId}
                              tourData={{
                                id: tour.bokunExperienceId,
                                title: tour.title,
                                image: tour.image || "/placeholder.svg",
                                description: tour.description,
                                price: tour.price,
                                duration: tour.duration,
                                location: tour.location,
                                bokunExperienceId: tour.bokunExperienceId,
                              }}
                            />
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
                          <h3 className="text-xl font-bold text-gray-900 mb-3">
                            {tour.title}
                          </h3>
                          {tour.description && (
                            <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
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
                          <Button className={`${theme.button} text-white w-full`}>
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* 둘째 줄: 3개의 작은 카드 */}
              <div className="grid md:grid-cols-3 gap-6">
                {tours.slice(2, 5).map((tour, index) => {
                  const colorThemes = [
                    {
                      badge: "bg-tumakr-sage-green",
                      text: "text-tumakr-sage-green",
                      button: "bg-tumakr-sage-green hover:bg-tumakr-sage-green/90",
                    },
                    {
                      badge: "bg-tumakr-maroon",
                      text: "text-tumakr-maroon",
                      button: "bg-tumakr-maroon hover:bg-tumakr-maroon/90",
                    },
                    {
                      badge: "bg-tumakr-mustard",
                      text: "text-tumakr-mustard",
                      button: "bg-tumakr-mustard hover:bg-tumakr-mustard/90",
                    },
                  ];
                  const theme = colorThemes[index % 3];

                  return (
                    <Link
                      key={tour.bokunExperienceId}
                      href={`/tours/private/${tour.bokunExperienceId}`}
                    >
                      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer h-full">
                        <div className="relative h-48">
                          <img
                            src={tour.image}
                            alt={tour.title}
                            className="w-full h-full object-cover"
                          />
                          <div
                            className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${theme.badge}`}
                          >
                            {tour.badge}
                          </div>
                          <div className="absolute bottom-3 right-3">
                            <FavoriteButton
                              tourId={tour.bokunExperienceId}
                              tourData={{
                                id: tour.bokunExperienceId,
                                title: tour.title,
                                image: tour.image || "/placeholder.svg",
                                description: tour.description,
                                price: tour.price,
                                duration: tour.duration,
                                location: tour.location,
                                bokunExperienceId: tour.bokunExperienceId,
                              }}
                            />
                          </div>
                        </div>
                        <div className="p-5">
                          <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                            {tour.location && (
                              <div className="flex items-center gap-1">
                                <MapPin size={14} />
                                <span>{tour.location}</span>
                              </div>
                            )}
                            {tour.duration && (
                              <div className="flex items-center gap-1">
                                <Clock size={14} />
                                <span>{tour.duration}</span>
                              </div>
                            )}
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                            {tour.title}
                          </h3>
                          {tour.description && (
                            <p className="text-gray-600 mb-3 text-xs leading-relaxed line-clamp-2">
                              {tour.description}
                            </p>
                          )}
                          {tour.price && (
                            <div className="mb-3">
                              <span className={`text-xl font-bold ${theme.text}`}>
                                {tour.price}
                              </span>
                            </div>
                          )}
                          <Button className={`${theme.button} text-white w-full text-sm`}>
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Chatbot CTA */}
          <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 bg-tumakr-maroon rounded-2xl p-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                <Compass className="text-white" size={28} />
              </div>
              <div className="text-white">
                <h3 className="text-xl font-bold mb-1">Interested in Other Tours?</h3>
                <p className="text-white/80 text-sm">
                  Explore our full collection of History, Multiday, and Private Tours
                </p>
              </div>
            </div>
            <Link href="/tours">
              <Button
                size="lg"
                className="bg-white text-tumakr-maroon hover:bg-white/90 font-semibold"
              >
                View All Tours
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section - 2.png */}
      <section className="py-16 px-6 flex items-center bg-white">
        <div className="container mx-auto max-w-6xl w-full">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center bg-tumakr-sage-green">
                <Users className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Your Personal Expert Storyteller
              </h3>
              <p className="text-gray-600 leading-relaxed">
                No need to miss your chance to ask questions in a crowd. Your guide exists
                solely to satisfy your intellectual curiosity.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center bg-tumakr-mustard">
                <MapPin className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Unparalleled Freedom
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Walk, rest, and explore at your own pace while experiencing the essence of
                history in the most comfortable atmosphere.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center bg-tumakr-dusty-pink">
                <Calendar className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Perfectly Customized Itinerary
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Dive deeper into periods that interest you, or spend more time at places
                that unexpectedly capture your heart. Everything unfolds according to your
                wishes.
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
              Unforgettable moments exploring the perfect harmony of tradition and
              modernity
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
              <div className="inline-block px-4 py-1 rounded-full text-sm font-semibold text-white mb-4 bg-tumakr-sage-green">
                Storytelling 1
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Step Into History, Deepen Through Conversation
              </h3>
              <p className="text-gray-600 leading-relaxed">
                "How accurate is this palace scene I saw in that drama?" From your simple
                question, our journey enters an entirely different dimension. Your guide
                goes beyond simply saying 'right' or 'wrong'—they unveil the political
                circumstances of the era and the hidden relationships between historical
                figures, transforming the space before you into a living stage of history.
                This deep conversation, impossible in a crowded group tour, becomes not
                just a tour but a personal humanities concert crafted exclusively for you.
              </p>
            </div>
          </div>

          {/* Storytelling 2 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-block px-4 py-1 rounded-full text-sm font-semibold text-white mb-4 bg-tumakr-sage-green">
                Storytelling 2
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                The Joy of Unexpected Discovery, Time That's Truly Ours
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Walking beneath the palace eaves, you pause at a beautiful path where
                light pours through. In a group tour, you would have had to hurry along
                with regret, but your guide instead points to a quiet bench and suggests
                taking a rest. There, they quietly share secrets about the architectural
                style visible only from this spot. These unplanned pauses and unexpected
                discoveries are the greatest gift that a private tour, moving at our own
                pace, can offer.
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
                  src="/hanbok-at-korean.jpg"
                  alt="Group Tour"
                  className="w-full h-[250px] object-cover rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - 6.png */}
      {/* TODO: Products & Souvenirs - 개발 후 활성화 예정 */}
      {/* <section className="py-16 px-6 flex items-center bg-tumakr-dark-blue">
        <div className="container mx-auto max-w-6xl w-full">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Gift className="text-tumakr-mustard" size={32} />
              <h2 className="text-4xl font-bold text-white">Products & Souvenirs</h2>
            </div>
            <p className="text-gray-300 text-lg">
              Take home beautiful memories of Korea with our curated selection of
              traditional products and special souvenirs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <img
                  src="/korean-traditional-hanbok-dress-pink.jpg"
                  alt="Traditional Hanbok"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white bg-tumakr-maroon">
                  Traditional
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Traditional Hanbok Set
                </h3>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <img
                  src="/korean-beauty-skincare-products.jpg"
                  alt="K-Beauty Skincare"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white bg-tumakr-mustard">
                  Beauty
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  K-Beauty Skincare Kit
                </h3>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <img
                  src="/korean-traditional-tea-set-ceramic.jpg"
                  alt="Korean Tea Collection"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white bg-tumakr-sage-green">
                  Food
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
      </section> */}

      {/* Pricing Section - 개발 후 활성화 예정 */}
      {/* <PrivateTourInquiryForm /> */}
    </div>
  );
}
