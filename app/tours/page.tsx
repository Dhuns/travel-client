"use client";

import { BookOpen, Calendar, Clock, Gift, Star, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ToursPage() {
  const tourCategories = [
    {
      title: "Private Tours",
      description: "Dedicated guide, your own pace, perfect customization",
      icon: Users,
      tours: [
        {
          id: "private",
          name: "Seoul Royal Palace Private Tour",
          duration: "6 hours",
          price: "$280",
          rating: 4.9,
          participants: "1-6 people",
          image: "/images/design-mode/castle2.png",
          highlights: [
            "Perfectly Customized Itinerary",
            "Personal Expert Storyteller",
            "Incomparable Freedom",
            "Your Own Pace",
          ],
        },
        {
          id: "private-jeju",
          name: "Jeju Hidden Gems Tour",
          duration: "8 hours",
          price: "$335",
          rating: 4.8,
          participants: "1-8 people",
          image: "/jeju-island-traditional-architecture.jpg",
          highlights: [
            "Secret Beaches",
            "Local Cuisine",
            "Oreum Hiking",
            "Tangerine Farm",
          ],
        },
        {
          id: "private-busan",
          name: "Busan Coastal Private Tour",
          duration: "7 hours",
          price: "$305",
          rating: 4.8,
          participants: "1-6 people",
          image: "/busan-coastal-scenery-haeundae.jpg",
          highlights: [
            "Haeundae Port",
            "Gamcheon Village",
            "Jagalchi Market",
            "Haeundae Beach",
          ],
        },
      ],
    },
    {
      title: "Package Tours",
      description:
        "All-inclusive premium tours with flights, accommodation, and transportation",
      icon: Gift,
      tours: [
        {
          id: "package",
          name: "Tumakr Korea Package Tour",
          duration: "5 Days / 4 Nights",
          price: "$1,500",
          rating: 4.9,
          participants: "8-12 people",
          image: "/images/design-mode/castle3.png",
          highlights: [
            "Premium Itinerary",
            "Perfectly Designed Logistics",
            "Worry-Free Comfort",
            "Tumakr Value Added",
          ],
        },
      ],
    },
    {
      title: "Multiday Tours",
      description: "In-depth historical exploration over multiple days",
      icon: Calendar,
      tours: [
        {
          id: "multiday",
          name: "Korea Multi-day History Tour",
          duration: "7 Days / 6 Nights",
          price: "$1,500",
          rating: 4.9,
          participants: "2-15 people",
          image: "/images/design-mode/castle4.png",
          highlights: [
            "Complete Historical Narrative",
            "Relaxed Itinerary",
            "Deeper Understanding",
            "Perfect Balance of Tours & Free Time",
          ],
        },
      ],
    },
    {
      title: "History Tours",
      description:
        "Cinematic storytelling and interactive historical experiences",
      icon: BookOpen,
      tours: [
        {
          id: "history",
          name: "Tumakr Korea History Tour",
          duration: "Full Day",
          price: "Custom Quote",
          rating: 4.9,
          participants: "Small Groups",
          image: "/images/design-mode/castle5.png",
          highlights: [
            "Cinematic Storytelling",
            "Interactive Dialogue",
            "Unforgettable Moments",
            "Custom-Made Memento",
          ],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f3f0]">
      {/* Hero Section */}
      <div className="relative pt-20 pb-20 bg-gradient-to-r from-[#651d2a] to-[#c4982a] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('/beautiful-korean-traditional-palace-with-tourists-.jpg')",
          }}
        ></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 text-center text-white relative z-10">
          <h1 className="text-4xl font-bold mb-4 drop-shadow-lg pt-5">
            Korea Tours & Experiences
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto mb-6 drop-shadow-md">
            Discover authentic Korean culture with our expert local guides
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-8 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-[#651d2a] mb-1">4+</div>
              <div className="text-gray-600 text-sm">Tour Categories</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#651d2a] mb-1">10K+</div>
              <div className="text-gray-600 text-sm">Happy Travelers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#651d2a] mb-1">4.9</div>
              <div className="text-gray-600 text-sm">Average Rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#651d2a] mb-1">24/7</div>
              <div className="text-gray-600 text-sm">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tours Categories */}
      <div className="container mx-auto px-6 py-12">
        {tourCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-16">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-3">
                <category.icon className="w-6 h-6 text-[#651d2a]" />

                <h2 className="text-3xl font-bold text-gray-800">
                  {category.title}
                </h2>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {category.description}
              </p>
              <div className="w-16 h-1 bg-[#651d2a] mx-auto mt-3 rounded-full"></div>
            </div>

            {/* Tour Cards */}
            {category.tours.length === 1 ? (
              // Single tour - horizontal large card layout
              <div className="max-w-5xl mx-auto">
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white p-0">
                  <div className="grid md:grid-cols-5 gap-0">
                    {/* Left: Large Image */}
                    <div className="relative md:col-span-2 h-64 md:h-auto">
                      <img
                        src={category.tours[0].image || "/placeholder.svg"}
                        alt={category.tours[0].name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
                      {category.tours[0].rating && (
                        <div className="absolute top-4 left-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-sm text-gray-800">
                            {category.tours[0].rating}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Right: Content */}
                    <div className="md:col-span-3 p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#651d2a] transition-colors">
                              {category.tours[0].name}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                              <div className="flex items-center space-x-2 bg-[#651d2a]/10 px-3 py-1.5 rounded-full">
                                <Clock className="w-4 h-4 text-[#651d2a]" />
                                <span className="text-[#651d2a] font-medium text-sm">
                                  {category.tours[0].duration}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2 bg-[#6d8675]/10 px-3 py-1.5 rounded-full">
                                <Users className="w-4 h-4 text-[#6d8675]" />
                                <span className="text-[#6d8675] font-medium text-sm">
                                  {category.tours[0].participants}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Badge className="bg-[#651d2a] text-white font-bold px-4 py-2 text-lg">
                            {category.tours[0].price}
                          </Badge>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-semibold mb-3 text-gray-800">
                            Tour Highlights:
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {category.tours[0].highlights.map(
                              (highlight, index) => (
                                <div
                                  key={index}
                                  className="flex items-center space-x-2"
                                >
                                  <div className="w-2 h-2 bg-[#651d2a] rounded-full flex-shrink-0"></div>
                                  <span className="text-gray-600 text-sm">
                                    {highlight}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>

                      <Button
                        className="w-full md:w-auto bg-[#651d2a] hover:bg-[#651d2a]/90 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
                        onClick={() =>
                          (window.location.href = `/tours/${category.tours[0].id}`)
                        }
                      >
                        View Details & Book Now
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            ) : (
              // Multiple tours - grid layout
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.tours.map((tour, tourIndex) => (
                  <Card
                    key={tourIndex}
                    className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-white hover:-translate-y-1 p-0"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={tour.image || "/placeholder.svg"}
                        alt={tour.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                      <Badge className="absolute top-3 right-3 bg-[#651d2a] text-white font-bold px-2 py-1">
                        {tour.price}
                      </Badge>
                      {tour.rating && (
                        <div className="absolute bottom-3 left-3 flex items-center space-x-1 text-white">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-sm">
                            {tour.rating}
                          </span>
                        </div>
                      )}
                    </div>

                    <CardHeader className="pb-2 px-6">
                      <CardTitle className="text-lg group-hover:text-[#651d2a] transition-colors">
                        {tour.name}
                      </CardTitle>
                      <div className="flex flex-wrap gap-2 text-sm">
                        <div className="flex items-center space-x-1 bg-[#651d2a]/10 px-2 py-1 rounded-full">
                          <Clock className="w-3 h-3 text-[#651d2a]" />
                          <span className="text-[#651d2a] font-medium text-xs">
                            {tour.duration}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 bg-[#6d8675]/10 px-2 py-1 rounded-full">
                          <Users className="w-3 h-3 text-[#6d8675]" />
                          <span className="text-[#6d8675] font-medium text-xs">
                            {tour.participants}
                          </span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="px-6 pb-6">
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2 text-gray-800 text-sm">
                          Tour Highlights:
                        </h4>
                        <div className="grid grid-cols-1 gap-1">
                          {tour.highlights.map((highlight, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2 text-xs"
                            >
                              <div className="w-1.5 h-1.5 bg-[#651d2a] rounded-full flex-shrink-0"></div>
                              <span className="text-gray-600">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button
                        className="w-full bg-[#651d2a] hover:bg-[#651d2a]/90 text-white font-semibold py-2 rounded-lg transition-all duration-300"
                        onClick={() =>
                          (window.location.href = `/tours/${tour.id}`)
                        }
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="bg-[#651d2a] py-8">
        <div className="container mx-auto px-6 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            Let us create a custom tour just for you. Our local experts will
            design the perfect Korean experience.
          </p>
          <Button
            size="lg"
            className="bg-white text-[#651d2a] hover:bg-gray-100 font-semibold px-6"
          >
            Create Custom Tour
          </Button>
        </div>
      </div>
    </div>
  );
}
