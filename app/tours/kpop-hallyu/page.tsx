"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star, MapPin, Phone, Mail, CheckCircle } from "lucide-react"
import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { TimeSelector } from "@/components/ui/time-selector"

export default function KPopHallyuTourPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState("")
  const [participants, setParticipants] = useState(2)

  const tourDetails = {
    name: "K-Pop & Hallyu Tour",
    duration: "6 hours",
    price: "$85",
    originalPrice: "$110",
    rating: 4.8,
    reviews: 356,
    participants: "2-12 people",
    image: "/beautiful-korean-traditional-palace-with-tourists-.jpg",
    description:
      "Dive into the world of K-Pop and Korean Wave (Hallyu) with our exclusive tour. Visit entertainment companies, explore Gangnam District, shop at K-Pop stores, and experience the culture that has taken the world by storm.",
    highlights: [
      "SM Entertainment building tour",
      "Gangnam District K-Pop hotspots",
      "K-Pop merchandise shopping",
      "Professional photo studio experience",
      "Korean beauty & fashion districts",
      "Hallyu K-Star Road visit",
      "K-Pop dance studio experience",
      "Meet local K-Pop fans",
    ],
    itinerary: [
      { time: "10:00", activity: "Meet at Gangnam Station", location: "Gangnam Station Exit 10" },
      { time: "10:30", activity: "SM Entertainment building", location: "COEX area" },
      { time: "11:30", activity: "K-Star Road exploration", location: "Apgujeong" },
      { time: "12:30", activity: "Korean fusion lunch", location: "Trendy restaurant" },
      { time: "14:00", activity: "K-Pop merchandise shopping", location: "Myeongdong K-Pop stores" },
      { time: "15:30", activity: "Photo studio experience", location: "Professional studio" },
      { time: "16:30", activity: "Dance studio visit", location: "K-Pop academy" },
      { time: "16:00", activity: "Tour conclusion", location: "Hongdae area" },
    ],
    included: [
      "K-Pop expert guide",
      "Entertainment building visits",
      "Korean fusion lunch",
      "Photo studio session (digital copies)",
      "K-Pop merchandise samples",
      "Transportation between locations",
      "Dance class participation",
      "Exclusive K-Pop insights",
    ],
    notIncluded: ["Personal shopping expenses", "Additional photo prints", "Celebrity meetings", "Tips (optional)"],
  }

  const timeOptions = [
    { value: "10:00", label: "10:00 AM", description: "Morning K-Pop Tour" },
    { value: "14:00", label: "02:00 PM", description: "Afternoon K-Pop Tour" },
  ]

  return (
    <div className="min-h-screen bg-violet-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="flex items-center space-x-2 mb-3">
              <Badge className="bg-violet-500 text-white px-3 py-1">K-Pop Special</Badge>
              <div className="flex items-center space-x-1 text-white">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{tourDetails.rating}</span>
                <span className="text-violet-100">({tourDetails.reviews} reviews)</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">{tourDetails.name}</h1>
            <div className="flex flex-wrap gap-4 text-white">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{tourDetails.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{tourDetails.participants}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>Gangnam & Hongdae</span>
              </div>
            </div>
          </div>
        </div>

        {/* K-Pop themed decorative elements */}
        <div className="absolute top-10 right-10 text-white/20 text-6xl">🎵</div>
        <div className="absolute top-32 right-32 text-white/20 text-4xl">⭐</div>
        <div className="absolute top-20 left-20 text-white/20 text-5xl">🎤</div>
        <div className="absolute bottom-32 right-20 text-white/20 text-3xl">💜</div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">K-Pop & Hallyu Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-6">{tourDetails.description}</p>

                <div className="bg-violet-50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-violet-800 mb-2">🎵 Perfect for K-Pop Fans!</h4>
                  <p className="text-violet-700 text-sm">
                    Whether you're a longtime fan or new to K-Pop, this tour offers insider access to Korea's
                    entertainment culture.
                  </p>
                </div>

                <h3 className="text-xl font-semibold mb-4 text-gray-800">Tour Highlights</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {tourDetails.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-violet-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Itinerary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">K-Pop Tour Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tourDetails.itinerary.map((item, index) => (
                    <div key={index} className="flex space-x-4 p-4 bg-violet-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                          {item.time}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 mb-1">{item.activity}</h4>
                        <p className="text-gray-600 text-sm flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {item.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Included/Not Included */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-green-700">What's Included</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {tourDetails.included.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-600 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-red-700">Not Included</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {tourDetails.notIncluded.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-red-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-600 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-violet-600">{tourDetails.price}</div>
                    <div className="text-sm text-gray-500 line-through">{tourDetails.originalPrice}</div>
                    <div className="text-sm text-gray-600">per person</div>
                  </div>
                  <Badge className="bg-red-500 text-white">23% OFF</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-violet-50 p-3 rounded-lg">
                  <p className="text-violet-800 text-sm font-medium">🎤 K-Pop Fan Favorite</p>
                  <p className="text-violet-700 text-xs">Highly rated by international K-Pop fans</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                  {/* Calendar 컴포넌트로 교체 */}
                  <Calendar selected={selectedDate} onSelect={setSelectedDate} className="w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
                  {/* TimeSelector 컴포넌트로 교체 */}
                  <TimeSelector
                    options={timeOptions}
                    selected={selectedTime}
                    onSelect={setSelectedTime}
                    placeholder="Choose your preferred time"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Participants</label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setParticipants(Math.max(1, participants - 1))}
                      className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold w-8 text-center">{participants}</span>
                    <button
                      onClick={() => setParticipants(Math.min(12, participants + 1))}
                      className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Total ({participants} people)</span>
                    <span className="text-xl font-bold text-violet-600">
                      ${Number.parseInt(tourDetails.price.replace("$", "")) * participants}
                    </span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold py-3 text-lg">
                  Book K-Pop Tour
                </Button>

                <div className="text-center text-sm text-gray-500">Free cancellation up to 24 hours before</div>

                <div className="border-t pt-4 space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>+82-2-1234-5678</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>info@onedaykorea.com</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
