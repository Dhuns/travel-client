"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HeroSection } from "@/components/hero-section"
import { Clock, Users, Star, MapPin, Phone, Mail, CheckCircle } from "lucide-react"
import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { TimeSelector } from "@/components/ui/time-selector"

export default function SeoulHighlightsTourPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState("")
  const [participants, setParticipants] = useState(2)

  const tourDetails = {
    name: "Seoul Highlights Full Day Tour",
    duration: "8 hours",
    price: "$89",
    originalPrice: "$120",
    rating: 4.9,
    reviews: 324,
    participants: "2-15 people",
    image: "/beautiful-korean-traditional-palace-with-tourists-.jpg",
    description:
      "Experience the best of Seoul in one comprehensive day tour. Visit iconic palaces, traditional villages, modern landmarks, and enjoy authentic Korean culture with our expert local guides.",
    highlights: [
      "Gyeongbokgung Palace with Changing of Guard Ceremony",
      "Bukchon Hanok Village traditional architecture",
      "N Seoul Tower panoramic city views",
      "Myeongdong Shopping District",
      "Traditional Korean lunch included",
      "Professional English-speaking guide",
      "Air-conditioned transportation",
      "Small group experience (max 15 people)",
    ],
    itinerary: [
      { time: "09:00", activity: "Hotel pickup & departure", location: "Your hotel" },
      { time: "09:30", activity: "Gyeongbokgung Palace tour", location: "Jongno-gu" },
      { time: "11:00", activity: "Bukchon Hanok Village walk", location: "Bukchon" },
      { time: "12:30", activity: "Traditional Korean lunch", location: "Local restaurant" },
      { time: "14:00", activity: "N Seoul Tower visit", location: "Namsan" },
      { time: "15:30", activity: "Myeongdong shopping time", location: "Myeongdong" },
      { time: "17:00", activity: "Return to hotel", location: "Your hotel" },
    ],
    included: [
      "Professional English-speaking guide",
      "Air-conditioned transportation",
      "Traditional Korean lunch",
      "All entrance fees",
      "Hotel pickup and drop-off",
      "Small group experience",
    ],
    notIncluded: ["Personal expenses", "Tips (optional)", "Travel insurance", "Additional meals and drinks"],
  }

  const timeOptions = [
    { value: "09:00", label: "09:00 AM", description: "Early Morning Tour - Best for photography" },
    { value: "10:00", label: "10:00 AM", description: "Standard Tour - Most popular" },
    { value: "11:00", label: "11:00 AM", description: "Late Morning - Avoid crowds" },
  ]

  return (
    <div className="min-h-screen bg-sky-50">
      {/* Hero Section */}
      <HeroSection
        type="overlay"
        backgroundImage={tourDetails.image}
        title={tourDetails.name}
        badge={{
          text: "Best Seller",
          className: "bg-sky-500 text-white px-3 py-1",
        }}
        meta={[
          { icon: Star, text: `${tourDetails.rating} (${tourDetails.reviews} reviews)`, className: "text-yellow-400" },
          { icon: Clock, text: tourDetails.duration },
          { icon: Users, text: tourDetails.participants },
          { icon: MapPin, text: "Seoul, South Korea" },
        ]}
        className="h-96"
      />

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">Tour Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-6">{tourDetails.description}</p>

                <h3 className="text-xl font-semibold mb-4 text-gray-800">Tour Highlights</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {tourDetails.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-sky-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Itinerary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">Daily Itinerary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tourDetails.itinerary.map((item, index) => (
                    <div key={index} className="flex space-x-4 p-4 bg-sky-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center text-white font-bold">
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
                    <div className="text-3xl font-bold text-sky-600">{tourDetails.price}</div>
                    <div className="text-sm text-gray-500 line-through">{tourDetails.originalPrice}</div>
                    <div className="text-sm text-gray-600">per person</div>
                  </div>
                  <Badge className="bg-red-500 text-white">25% OFF</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                  <div className="border rounded-lg p-3 bg-white">
                    <Calendar
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="w-full"
                      classNames={{
                        day_selected: "bg-sky-500 text-white hover:bg-sky-600 focus:bg-sky-600",
                        day_today: "bg-gray-100 text-gray-900 font-medium",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
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
                      className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold w-8 text-center">{participants}</span>
                    <button
                      onClick={() => setParticipants(Math.min(15, participants + 1))}
                      className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Total ({participants} people)</span>
                    <span className="text-xl font-bold text-sky-600">
                      ${Number.parseInt(tourDetails.price.replace("$", "")) * participants}
                    </span>
                  </div>
                </div>

                <Button className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 text-lg">
                  Book Now
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
