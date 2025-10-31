"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star, MapPin, Phone, Mail, CheckCircle } from "lucide-react"
import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { TimeSelector } from "@/components/ui/time-selector"

export default function MorningPalaceTourPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState("")
  const [participants, setParticipants] = useState(2)

  const tourDetails = {
    name: "Morning Palace Tour",
    duration: "4 hours",
    price: "$45",
    originalPrice: "$60",
    rating: 4.7,
    reviews: 198,
    participants: "2-20 people",
    image: "/beautiful-korean-traditional-palace-with-tourists-.jpg",
    description:
      "Start your day with the majesty of Korean royal history. Experience the famous Changing of the Guard ceremony and explore the beautiful architecture of Gyeongbokgung Palace with our knowledgeable guides.",
    highlights: [
      "Changing of the Guard ceremony (10:00 AM)",
      "Gyeongbokgung Palace main halls tour",
      "Royal garden and pond exploration",
      "Traditional Korean architecture insights",
      "Historical stories from Joseon Dynasty",
      "Professional photography spots",
      "Small group or private options available",
      "Perfect morning activity",
    ],
    itinerary: [
      { time: "09:00", activity: "Meet at palace entrance", location: "Gyeongbokgung Palace Gate" },
      { time: "09:15", activity: "Palace grounds introduction", location: "Main courtyard" },
      { time: "10:00", activity: "Changing of Guard ceremony", location: "Gwanghwamun Gate" },
      { time: "10:30", activity: "Throne hall & royal quarters", location: "Geunjeongjeon Hall" },
      { time: "11:30", activity: "Royal gardens exploration", location: "Gyeonghoeru Pavilion" },
      { time: "12:30", activity: "Palace museum visit", location: "National Palace Museum" },
      { time: "13:00", activity: "Tour conclusion", location: "Palace exit" },
    ],
    included: [
      "Professional English-speaking guide",
      "Palace entrance ticket",
      "Changing of Guard ceremony viewing",
      "Historical commentary",
      "Photography assistance",
      "Small group experience",
      "Palace map and brochure",
      "Emergency contact support",
    ],
    notIncluded: ["Transportation to/from palace", "Food and beverages", "Personal expenses", "Tips (optional)"],
  }

  const timeOptions = [{ value: "09:00", label: "09:00 AM", description: "Recommended (Guard Ceremony at 10:00)" }]

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
              <Badge className="bg-amber-500 text-white px-3 py-1">Morning Special</Badge>
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
                <span>Gyeongbokgung Palace</span>
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
                <CardTitle className="text-2xl text-gray-800">Palace Tour Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-6">{tourDetails.description}</p>

                <h3 className="text-xl font-semibold mb-4 text-gray-800">Tour Highlights</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {tourDetails.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Itinerary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">Tour Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tourDetails.itinerary.map((item, index) => (
                    <div key={index} className="flex space-x-4 p-4 bg-amber-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">
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
                    <div className="text-3xl font-bold text-amber-600">{tourDetails.price}</div>
                    <div className="text-sm text-gray-500 line-through">{tourDetails.originalPrice}</div>
                    <div className="text-sm text-gray-600">per person</div>
                  </div>
                  <Badge className="bg-red-500 text-white">25% OFF</Badge>
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
                      onClick={() => setParticipants(Math.min(20, participants + 1))}
                      className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Total ({participants} people)</span>
                    <span className="text-xl font-bold text-amber-600">
                      ${Number.parseInt(tourDetails.price.replace("$", "")) * participants}
                    </span>
                  </div>
                </div>

                <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 text-lg">
                  Book Palace Tour
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
