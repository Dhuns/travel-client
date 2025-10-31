"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star, MapPin, Phone, Mail, CheckCircle } from "lucide-react"
import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { TimeSelector } from "@/components/ui/time-selector"

export default function CherryBlossomFestivalTourPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState("")
  const [participants, setParticipants] = useState(2)

  const tourDetails = {
    name: "Cherry Blossom Festival Tour",
    duration: "5 hours",
    price: "$65",
    originalPrice: "$85",
    rating: 4.9,
    reviews: 412,
    participants: "2-15 people",
    image: "/korean-seasons-cherry-blossom-autumn.jpg",
    description:
      "Experience the magical beauty of Korean spring with our Cherry Blossom Festival Tour. Visit the most spectacular cherry blossom spots in Seoul, enjoy seasonal treats, and capture unforgettable memories during Korea's most beautiful season.",
    highlights: [
      "Yeouido Park - Seoul's largest cherry blossom area",
      "Hangang River cherry blossom walkway",
      "Professional photography session",
      "Traditional Korean spring treats tasting",
      "Cherry blossom picnic experience",
      "Seasonal flower market visit",
      "Best photo spots with local tips",
      "Spring festival activities participation",
    ],
    itinerary: [
      { time: "10:00", activity: "Meet at Yeouido Station", location: "Yeouido Station Exit 1" },
      { time: "10:30", activity: "Yeouido Park cherry blossoms", location: "Yeouido Hangang Park" },
      { time: "12:00", activity: "Cherry blossom picnic lunch", location: "Park picnic area" },
      { time: "13:30", activity: "Hangang River walkway", location: "Cherry blossom path" },
      { time: "14:30", activity: "Photography session", location: "Best photo spots" },
      { time: "15:30", activity: "Flower market & treats", location: "Seasonal market" },
      { time: "15:00", activity: "Tour conclusion", location: "Yeouido Station" },
    ],
    included: [
      "Professional guide with photography skills",
      "Cherry blossom picnic lunch",
      "Traditional spring treats",
      "Professional photos (digital copies)",
      "Picnic mat and setup",
      "Seasonal flower souvenirs",
      "Transportation between spots",
      "Festival activity participation",
    ],
    notIncluded: ["Transportation to meeting point", "Personal shopping", "Additional food/drinks", "Tips (optional)"],
  }

  const timeOptions = [
    { value: "10:00", label: "10:00 AM", description: "Recommended (Best Light)" },
    { value: "14:00", label: "02:00 PM", description: "Afternoon Tour" },
  ]

  return (
    <div className="min-h-screen bg-pink-50">
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
              <Badge className="bg-pink-500 text-white px-3 py-1">Seasonal Special</Badge>
              <div className="flex items-center space-x-1 text-white">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{tourDetails.rating}</span>
                <span className="text-pink-100">({tourDetails.reviews} reviews)</span>
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
                <span>Yeouido & Hangang River</span>
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
                <CardTitle className="text-2xl text-gray-800">Cherry Blossom Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-6">{tourDetails.description}</p>

                <div className="bg-pink-50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-pink-800 mb-2">🌸 Best Season: April - Early May</h4>
                  <p className="text-pink-700 text-sm">
                    Cherry blossom season is short but spectacular! Book early as this tour is extremely popular during
                    peak bloom.
                  </p>
                </div>

                <h3 className="text-xl font-semibold mb-4 text-gray-800">Festival Highlights</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {tourDetails.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Itinerary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">Festival Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tourDetails.itinerary.map((item, index) => (
                    <div key={index} className="flex space-x-4 p-4 bg-pink-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
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
                    <div className="text-3xl font-bold text-pink-600">{tourDetails.price}</div>
                    <div className="text-sm text-gray-500 line-through">{tourDetails.originalPrice}</div>
                    <div className="text-sm text-gray-600">per person</div>
                  </div>
                  <Badge className="bg-red-500 text-white">24% OFF</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-pink-50 p-3 rounded-lg">
                  <p className="text-pink-800 text-sm font-medium">🌸 Peak Season Alert</p>
                  <p className="text-pink-700 text-xs">Limited availability during cherry blossom season</p>
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
                      onClick={() => setParticipants(Math.min(15, participants + 1))}
                      className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Total ({participants} people)</span>
                    <span className="text-xl font-bold text-pink-600">
                      ${Number.parseInt(tourDetails.price.replace("$", "")) * participants}
                    </span>
                  </div>
                </div>

                <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 text-lg">
                  Book Festival Tour
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
