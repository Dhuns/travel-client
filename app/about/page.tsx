import { Award, Globe, Heart, Quote, Star, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About Us | OnedayKorea Tours",
  description:
    "Discover authentic Korea with OnedayKorea Tours. Over 10 years of experience creating unforgettable travel experiences.",
};

// TripAdvisor 실제 리뷰 데이터 (하드코딩 - 나중에 API 연동 가능)
const tripAdvisorReviews = [
  {
    id: 1,
    author: "Sarah M.",
    location: "United States",
    rating: 5,
    date: "November 2024",
    title: "Best tour experience in Korea!",
    content:
      "Andrew was the perfect tour guide - very pleasant, knowledgeable, attentive, and an accommodating photographer. The DMZ tour was incredibly informative and moving. Highly recommend!",
    tourName: "DMZ and Seoul Private Tour",
  },
  {
    id: 2,
    author: "James L.",
    location: "United Kingdom",
    rating: 5,
    date: "October 2024",
    title: "Theo deserves 10 stars!",
    content:
      "If I could give Theo 10 stars, I would. He showed great knowledge, professionalism, patience and compassion. By the end of the tour, he became more than just a guide but a friend.",
    tourName: "Seoul Full-Day Private Tour",
  },
  {
    id: 3,
    author: "Michelle K.",
    location: "Australia",
    rating: 5,
    date: "September 2024",
    title: "4th time with One Day Korea",
    content:
      "This was my 4th time with One Day Korea and 2nd private tour with Brian. As always, the tour was excellent. Highly recommended for those who like something with a personal touch.",
    tourName: "Private Tour",
  },
  {
    id: 4,
    author: "David C.",
    location: "Canada",
    rating: 5,
    date: "August 2024",
    title: "Outstanding communication from start to finish",
    content:
      "Booked a private tour several months in advance. From the beginning, communication was outstanding. The team stayed in touch throughout, promptly answering questions and confirming details.",
    tourName: "Custom Private Tour",
  },
];

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "50K+", label: "Happy Travelers" },
  { value: "716", label: "TripAdvisor Reviews" },
  { value: "5.0", label: "Average Rating" },
];

const values = [
  {
    icon: Heart,
    title: "Passion for Korea",
    description:
      "We're not just tour guides - we're storytellers who love sharing the beauty and culture of Korea with the world.",
  },
  {
    icon: Users,
    title: "Personal Touch",
    description:
      "Every tour is tailored to your interests. We believe the best experiences come from genuine connections.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "Our 5-star TripAdvisor rating reflects our commitment to delivering exceptional experiences every time.",
  },
  {
    icon: Globe,
    title: "Local Expertise",
    description:
      "Our guides are locals who know the hidden gems, best restaurants, and untold stories of Korea.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/korea-palace-2.jpg"
            alt="Korean landscape"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/70" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center text-white pt-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
            About OnedayKorea Tours
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
            For over a decade, we've been creating unforgettable Korean experiences for
            travelers from around the world.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-tumakr-maroon">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  OnedayKorea Tours was founded with a simple mission: to share the
                  authentic beauty of Korea with travelers who seek more than just tourist
                  attractions.
                </p>
                <p>
                  What started as a small team of passionate local guides has grown into
                  one of Korea's most trusted tour companies, serving over 50,000 happy
                  travelers from more than 100 countries.
                </p>
                <p>
                  We believe that the best way to experience Korea is through the eyes of
                  locals who genuinely love their country. Our guides don't just show you
                  places - they share stories, traditions, and hidden gems that you won't
                  find in any guidebook.
                </p>
              </div>
              <Link href="/tours">
                <Button className="mt-8 bg-tumakr-maroon hover:bg-tumakr-maroon/90 text-white px-8">
                  Explore Our Tours
                </Button>
              </Link>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/korean-tour-guide-with-tourists-by-the-ocean.jpg"
                alt="Tour guide with tourists"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 px-6 bg-[#f5f3f0]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Stand For</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our values guide everything we do, from designing tours to training our
              guides.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-tumakr-maroon/10 rounded-full flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-tumakr-maroon" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TripAdvisor Reviews Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              {/* TripAdvisor 로고 */}
              <div className="w-12 h-12 bg-[#00AA6C] rounded-full flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">What Our Travelers Say</h2>
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-6 h-6 text-[#00AA6C] fill-[#00AA6C]" />
                ))}
              </div>
              <span className="text-2xl font-bold text-gray-900">5.0</span>
            </div>
            <p className="text-gray-600">Based on 716 reviews on TripAdvisor</p>
          </div>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {tripAdvisorReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-gray-900">{review.author}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500 text-sm">{review.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating
                                ? "text-[#00AA6C] fill-[#00AA6C]"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-400 text-xs">{review.date}</span>
                    </div>
                  </div>
                  <Quote className="w-8 h-8 text-[#00AA6C]/20" />
                </div>

                <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  "{review.content}"
                </p>
                <div className="text-xs text-tumakr-maroon font-medium">
                  {review.tourName}
                </div>
              </div>
            ))}
          </div>

          {/* TripAdvisor CTA */}
          <div className="text-center">
            <a
              href="https://www.tripadvisor.com/Attraction_Review-g294197-d7264223-Reviews-OnedayKorea_Tours-Seoul.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#00AA6C] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#008f5b] transition-colors"
            >
              Read All 716 Reviews on TripAdvisor
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-tumakr-maroon">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore Korea With Us?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of happy travelers who have discovered the authentic beauty of
            Korea with OnedayKorea Tours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/tours">
              <Button
                size="lg"
                className="bg-white text-tumakr-maroon hover:bg-gray-100 font-semibold"
              >
                Browse Tours
              </Button>
            </Link>

            {/* TODO: Chat with Us - 개발 후 활성화 예정 */}
            {/* <Link href="/chat">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 font-semibold"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat With Us
              </Button>
            </Link> */}
          </div>
        </div>
      </section>
    </div>
  );
}
