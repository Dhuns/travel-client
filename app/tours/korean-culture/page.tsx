"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star, MapPin, Phone, Mail, CheckCircle } from "lucide-react"
import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { TimeSelector } from "@/components/ui/time-selector"

export default function KoreanCultureExperiencePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState("")
  const [participants, setParticipants] = useState(2)

  const tourDetails = {
    name: "Korean Culture Experience",
    duration: "6 hours",
    price: "$75",
    originalPrice: "$95",
    rating: 4.8,
    reviews: 287,
    participants: "2-12 people",
    image: "/beautiful-korean-traditional-hanbok-dress.jpg",
    description:
      "Immerse yourself in authentic Korean culture through hands-on experiences. Wear traditional hanbok, participate in tea ceremonies, learn Korean cooking, and practice calligraphy with local cultural experts.",
    highlights: [
      "Traditional Hanbok dress experience with photo session",
      "Korean tea ceremony with master tea artist",
      "Hands-on Korean cooking class (Bulgogi & Kimchi)",
      "Korean calligraphy (Seoye) workshop",
      "Visit to traditional Korean house (Hanok)",
      "Cultural performance viewing",
      "Traditional Korean lunch included",
      "Take home cultural souvenirs",
    ],
    itinerary: [
      { time: "10:00", activity: "Meet at cultural center", location: "Insadong Cultural Center" },
      { time: "10:30", activity: "Hanbok fitting & photo session", location: "Traditional dress room" },
      { time: "11:30", activity: "Korean tea ceremony experience", location: "Tea ceremony room" },
      { time: "12:30", activity: "Traditional Korean lunch", location: "Hanok restaurant" },
      { time: "14:00", activity: "Korean cooking class", location: "Cooking studio" },
      { time: "15:30", activity: "Calligraphy workshop", location: "Art studio" },
      { time: "16:00", activity: "Cultural performance & closing", location: "Performance hall" },
    ],
    included: [
      "Professional cultural guide",
      "Hanbok rental for the day",
      "All workshop materials",
      "Traditional Korean lunch",
      "Cultural souvenirs",
      "Professional photos",
      "Small group experience",
      "Transportation between venues",
    ],
    notIncluded: ["Hotel pickup/drop-off", "Personal expenses", "Additional photos", "Tips (optional)"],
  }

  const timeOptions = [
    { value: "10:00", label: "10:00 AM", description: "Morning Experience" },
    { value: "14:00", label: "02:00 PM", description: "Afternoon Experience" },
  ]

  return (
    <div className="min-h-screen bg-sky-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={tourDetails.image || "/placeholder.svg"}
          alt={tourDetails.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="flex items-center space-x-2 mb-3">
              <Badge className="bg-purple-500 text-white px-3 py-1">Cultural Experience</Badge>
              <div className="flex items-center space-x-1 text-white">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{tourDetails.rating}</span>
                <span className="text-sky-100">({tourDetails.reviews} reviews)</span>
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
                <span>Insadong, Seoul</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">Cultural Experience Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-6">{tourDetails.description}</p>

                <h3 className="text-xl font-semibold mb-4 text-gray-800">Experience Highlights</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {tourDetails.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Itinerary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">Experience Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tourDetails.itinerary.map((item, index) => (
                    <div key={index} className="flex space-x-4 p-4 bg-purple-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
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
                    <div className="text-3xl font-bold text-purple-600">{tourDetails.price}</div>
                    <div className="text-sm text-gray-500 line-through">{tourDetails.originalPrice}</div>
                    <div className="text-sm text-gray-600">per person</div>
                  </div>
                  <Badge className="bg-red-500 text-white">21% OFF</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                  {/* Calendar component */}
                  <Calendar selected={selectedDate} onSelect={setSelectedDate} className="w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
                  {/* TimeSelector component */}
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
                    <span className="text-xl font-bold text-purple-600">
                      ${Number.parseInt(tourDetails.price.replace("$", "")) * participants}
                    </span>
                  </div>
                </div>

                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 text-lg">
                  Book Experience
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
