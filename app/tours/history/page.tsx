import {
  BookOpen,
  Calendar,
  Check,
  Gift,
  MapPin,
  Sparkles,
  Users,
  X,
} from "lucide-react";

import { FavoriteButton } from "@/components/favorite-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getToursFromBackend } from "@/lib/bokun";
import Link from "next/link";

export const revalidate = 3600; // 1시간마다 재생성

export default async function HistoryTourPage() {
  // 백엔드 API에서 투어 데이터 가져오기 (안정적)
  const tours = await getToursFromBackend("history", "History Tour");

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* 왼쪽: 텍스트 콘텐츠 */}
            <div>
              <Badge className="bg-tumakr-maroon text-white mb-4 px-4 py-1">
                History Tour
              </Badge>
              <h1 className="font-bold text-gray-900 mb-6 text-5xl">
                Tumakr
                <br />
                Korea History Tour
              </h1>
              <p className="text-gray-700 leading-relaxed mb-6">
                An Unparalleled Korean History Tour Awaits!
              </p>
              <p className="text-gray-700 leading-relaxed mb-8">
                It is a profound voyage into the very soul of Korea—the definitive
                experience designed to satisfy your curiosity and create lifelong
                memories.
              </p>
              <div className="flex gap-4 mb-8">
                <a href="#tour-list">
                  <Button className="bg-tumakr-maroon hover:bg-tumakr-maroon/90 text-white px-6 flex items-center gap-2 transition-colors font-semibold">
                    Explore Tours
                  </Button>
                </a>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Cultural Heritage</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Historical Sites</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Authentic Experience</span>
                </div>
              </div>
            </div>

            {/* 오른쪽: 이미지 */}
            <div className="relative h-[550px] rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/beautiful-korean-traditional-hanbok-dress.jpg"
                alt="Korean History Tour"
                className="w-full h-full object-cover"
              />

              {/* 왼쪽 하단 모달 */}
              <div className="absolute bottom-6 left-6 bg-white rounded-lg shadow-lg p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-tumakr-maroon rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Signature Tour</h4>
                  <p className="text-xs text-gray-600">special journey</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why is Korean History Special Section */}
      <section className="min-h-screen flex items-center px-6 bg-linear-to-br from-tumakr-dusty-pink/10 to-tumakr-sage-green/10">
        <div className="container mx-auto max-w-6xl py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            Why is Korean History Special?
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* 이미지 */}
            <div className="relative h-[350px] rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/beautiful-korean-traditional-palace-with-tourists-.jpg"
                alt="Korean Palace"
                className="w-full h-full object-cover"
              />
            </div>

            {/* 텍스트 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Discover the World Through an Eastern Lens
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Surrounded by powerful nations, the Korean Peninsula has a unique
                geopolitical story. Despite centuries of foreign influence, its people
                have preserved their distinct culture, language, and traditions, all
                rooted in a rich, ancient history.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Observed by its neighbors but never entirely lost, Korea's past gives
                insight about world history. Tumaku invites you to explore this
                fascinating journey through time, where East meets history, and the
                stories of the nation they built.
              </p>
            </div>
          </div>

          {/* 두 번째 섹션 - 역순 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* 텍스트 */}
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Uncover the Excellence and Majesty of Korean Cultural Heritage
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Korea's architectural and cultural heritage stands among the world's
                finest. From the elegant curves of palace roofs to the intricate details
                of temple art, every structure tells a story of artistic excellence and
                spiritual depth.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Walk through centuries-old palaces where kings once ruled, explore temples
                that have weathered wars and time, and discover the values of the nation
                they built.
              </p>
            </div>

            {/* 이미지 */}
            <div className="relative h-[350px] rounded-2xl overflow-hidden shadow-lg order-1 md:order-2">
              <img
                src="/beautiful-korean-traditional-palace-with-tourists-.jpg"
                alt="Korean Cultural Heritage"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-linear-to-r from-tumakr-maroon via-tumakr-mustard to-tumakr-sage-green">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Now, it's your turn to begin your story.
          </h2>
          <p className="text-lg mb-8 text-white/90">
            Embark on a journey through time and discover the soul of Korea
          </p>
          <Link href="/chat">
            <Button
              size="lg"
              className="bg-white text-tumakr-maroon hover:bg-gray-100 font-semibold px-8"
            >
              Plan with AI Assistant
            </Button>
          </Link>
        </div>
      </section>

      {/* Historical Destinations Section */}
      <section id="tour-list" className="min-h-screen flex items-center px-6 bg-white">
        <div className="container mx-auto max-w-6xl py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Historical Destinations Come Alive
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Discover Korea's rich history and culture through our carefully curated tours
          </p>

          <div className="space-y-8">
            {/* 히스토리 투어 목록 */}
            {tours.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-600">No tours available at the moment.</p>
              </div>
            ) : (
              tours.map((tour) => (
                <div key={tour.bokunExperienceId} className="max-w-5xl mx-auto">
                  <Link href={`/tours/history/${tour.bokunExperienceId}`}>
                    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white p-0">
                      <div className="grid md:grid-cols-5 gap-0">
                        {/* Left: Large Image */}
                        <div className="relative md:col-span-2 h-64 md:h-auto">
                          <img
                            src={tour.image || "/placeholder.svg"}
                            alt={tour.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-linear-to-r from-transparent to-black/20"></div>
                          <Badge className="absolute top-4 left-4 bg-tumakr-maroon text-white font-medium px-3 py-1.5">
                            {tour.badge}
                          </Badge>
                          <div className="absolute bottom-4 right-4">
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

                        {/* Right: Content */}
                        <div className="md:col-span-3 p-8 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-tumakr-maroon transition-colors">
                                  {tour.title}
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                  {tour.duration && (
                                    <div className="flex items-center space-x-2 bg-tumakr-maroon/10 px-3 py-1.5 rounded-full">
                                      <Calendar className="w-4 h-4 text-tumakr-maroon" />
                                      <span className="text-tumakr-maroon font-medium text-sm">
                                        {tour.duration}
                                      </span>
                                    </div>
                                  )}
                                  {tour.location && (
                                    <div className="flex items-center space-x-2 bg-tumakr-sage-green/10 px-3 py-1.5 rounded-full">
                                      <MapPin className="w-4 h-4 text-tumakr-sage-green" />
                                      <span className="text-tumakr-sage-green font-medium text-sm">
                                        {tour.location}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              {tour.price && (
                                <Badge className="bg-tumakr-maroon text-white font-bold px-4 py-2 text-lg">
                                  {tour.price}
                                </Badge>
                              )}
                            </div>

                            {tour.description && (
                              <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2">
                                {tour.description}
                              </p>
                            )}

                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                              {/* Included */}
                              {tour.included && tour.included.length > 0 && (
                                <div>
                                  <h4 className="font-semibold mb-3 text-gray-800 flex items-center">
                                    <Check className="w-4 h-4 mr-2 text-tumakr-maroon" />
                                    What's Included:
                                  </h4>
                                  <div className="space-y-2">
                                    {tour.included.slice(0, 4).map((item, index) => (
                                      <div
                                        key={index}
                                        className="flex items-start space-x-2"
                                      >
                                        <Check className="w-4 h-4 text-tumakr-maroon mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-600 text-sm">
                                          {item}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Excluded */}
                              {tour.exclusions && tour.exclusions.length > 0 && (
                                <div>
                                  <h4 className="font-semibold mb-3 text-gray-800 flex items-center">
                                    <X className="w-4 h-4 mr-2 text-gray-500" />
                                    Not Included:
                                  </h4>
                                  <div className="space-y-2">
                                    {tour.exclusions.slice(0, 4).map((item, index) => (
                                      <div
                                        key={index}
                                        className="flex items-start space-x-2"
                                      >
                                        <X className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-600 text-sm">
                                          {item}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>

                            {tour.highlights && tour.highlights.length > 0 && (
                              <div className="mb-6">
                                <h4 className="font-semibold mb-3 text-gray-800">
                                  Tour Highlights:
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                  {tour.highlights
                                    .slice(0, 4)
                                    .map((highlight: string, index: number) => (
                                      <div
                                        key={index}
                                        className="flex items-center space-x-2"
                                      >
                                        <div className="w-2 h-2 bg-tumakr-maroon rounded-full flex-shrink-0"></div>
                                        <span className="text-gray-600 text-sm">
                                          {highlight}
                                        </span>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            )}
                          </div>

                          <Button className="w-full md:w-auto bg-tumakr-maroon hover:bg-tumakr-maroon/90 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300">
                            View Details & Book Now
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Products & Souvenirs Section */}
      <section className="py-16 px-6 flex items-center bg-linear-to-br from-tumakr-dusty-pink/10 to-tumakr-sage-green/10">
        <div className="container mx-auto max-w-6xl w-full">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Gift className="text-tumakr-maroon" size={32} />
              <h2 className="text-4xl font-bold text-gray-900">Products & Souvenirs</h2>
            </div>
            <p className="text-gray-600 text-lg">
              Take home beautiful memories of Korea with our curated selection of
              traditional products and special souvenirs
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

            {/* Product 2 */}
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

            {/* Product 3 */}
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
      </section>

      {/* Feel the Breath of History Section */}
      <section className="flex items-center px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl py-32">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Feel the Breath of History
          </h2>
          <p className="text-center text-gray-600 mb-16">
            What makes our history tours unique
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: BookOpen, title: "Cinematic & In-Depth Storytelling" },
              { icon: Calendar, title: "Interactive Dialogue, Not a Lecture" },
              { icon: Users, title: "Unforgettable & Spontaneous Moments" },
              { icon: Sparkles, title: "An Exclusive, Custom-Made Memento" },
            ].map((feature, i) => (
              <Card
                key={i}
                className="text-center p-8 shadow-lg hover:shadow-xl transition-shadow bg-white border border-gray-200"
              >
                <div className="w-16 h-16 bg-tumakr-maroon rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">
                  {i === 0 &&
                    "More than just visiting sites, we provide rich historical context and engaging narratives that bring the past to life."}
                  {i === 1 &&
                    "Your curiosity is Tumakr's guide. You can explore in-depth through the app and content at any time, completing your journey at your own pace."}
                  {i === 2 &&
                    "We leave room for spontaneity, allowing unexpected discoveries and memorable moments to unfold naturally."}
                  {i === 3 &&
                    "To help you cherish your memories forever, we present you with a one-of-a-kind souvenir, custom-made by us to embody the beauty of Korea and the spirit of your journey."}
                </p>
              </Card>
            ))}
          </div>

          <div className="mt-12 p-6 bg-white rounded-lg text-center shadow-lg border border-gray-200">
            <p className="text-gray-700 italic">
              <span>"This is not a common, mass-produced souvenir.</span>
              <br />
              <span>
                "It is a special, custom-made memento that fully embodies the emotions of
                our journey and the beauty of Korea."
              </span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
