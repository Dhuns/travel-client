import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HeroSection } from "@/components/hero-section"
import { Camera, Clock, Star, Phone } from "lucide-react"

export default function JejuDestinationPage() {
  const tours = [
    {
      name: "Jeju Natural Wonders Tour",
      duration: "8 hours",
      price: "$95",
      rating: 4.8,
      description: "Hallasan Mountain, Seongsan Sunrise Peak, and Manjanggul Cave",
    },
    {
      name: "Jeju Cultural Heritage Tour",
      duration: "6 hours",
      price: "$75",
      rating: 4.7,
      description: "Jeju Folk Village, traditional stone statues, and local culture",
    },
    {
      name: "Jeju Coastal Beauty Tour",
      duration: "7 hours",
      price: "$85",
      rating: 4.9,
      description: "Beautiful beaches, coastal walks, and scenic viewpoints",
    },
  ]

  const attractions = [
    "Hallasan Mountain - Korea's highest peak and UNESCO site",
    "Seongsan Sunrise Peak - Volcanic crater with stunning sunrise views",
    "Manjanggul Cave - UNESCO World Heritage lava tube cave",
    "Jeju Folk Village - Traditional island culture and architecture",
    "Cheonjiyeon Waterfall - Beautiful waterfall with walking trails",
    "Teddy Bear Museum - Unique museum showcasing teddy bear art",
    "Jeju Loveland - Adult-themed sculpture park",
    "Udo Island - Small island perfect for cycling and beaches",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Hero Section */}
      <HeroSection
        type="background"
        backgroundImage="/beautiful-jeju-island-hallasan-mountain-and-nature.jpg"
        title="Jeju Island"
        subtitle="Escape to Korea's tropical paradise on Jeju Island, a UNESCO World Heritage site known for its volcanic landscapes, pristine beaches, and unique culture. Experience breathtaking natural wonders, from Korea's highest mountain to stunning lava tube caves."
        badge={{
          text: "Island Paradise",
          icon: "mountain",
          className: "mb-4 bg-emerald-600/90 text-white backdrop-blur-sm",
        }}
        stats={[
          { value: "670K+", label: "Population" },
          { value: "1,950m", label: "Hallasan Height" },
          { value: "4.8★", label: "Tourist Rating" },
        ]}
        actions={[
          {
            text: "Book Jeju Tour",
            className: "bg-emerald-600/90 hover:bg-emerald-700 backdrop-blur-sm",
          },
          {
            text: "Contact Guide",
            variant: "outline",
            className: "bg-white/20 border-white text-white hover:bg-white/30 backdrop-blur-sm",
          },
        ]}
        className="pt-28 pb-16"
      />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* About Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">About Jeju Island</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>
                  Jeju Island, South Korea's largest island and a UNESCO World Heritage site, is renowned for its
                  volcanic landscapes, subtropical climate, and unique cultural heritage. Located off the southern coast
                  of Korea, Jeju offers visitors a perfect escape with its pristine beaches, dramatic volcanic
                  formations, and lush natural beauty.
                </p>
                <p>
                  The island is home to Hallasan, Korea's highest mountain, and features numerous UNESCO-recognized
                  natural sites including lava tube caves and volcanic cones. Jeju's distinct culture, including the
                  famous female divers called "haenyeo," adds to its appeal as a must-visit destination.
                </p>
              </div>
            </section>

            {/* Top Attractions */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center">
                <Camera className="w-8 h-8 mr-3 text-emerald-600" />
                Top Attractions
              </h2>
              <div className="grid gap-4">
                {attractions.map((attraction, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-emerald-50 rounded-lg">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{attraction}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Available Tours */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Available Tours</h2>
              <div className="grid gap-6">
                {tours.map((tour, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl text-emerald-900">{tour.name}</CardTitle>
                          <CardDescription className="mt-2">{tour.description}</CardDescription>
                        </div>
                        <Badge className="bg-emerald-600 flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-white" />
                          <span>{tour.rating}</span>
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{tour.duration}</span>
                          </div>
                          <div className="text-2xl font-bold text-emerald-600">{tour.price}</div>
                        </div>
                        <Button className="bg-emerald-600 hover:bg-emerald-700">Book Now</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-emerald-900">Quick Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">Best Time to Visit</h4>
                  <p className="text-gray-600">Year-round (Spring & Autumn ideal)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Recommended Duration</h4>
                  <p className="text-gray-600">3-4 days</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Famous For</h4>
                  <p className="text-gray-600">Hallasan, UNESCO Sites, Beaches, Nature</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Transportation</h4>
                  <p className="text-gray-600">Rental car, Bus, Taxi, Bicycle</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="bg-emerald-50">
              <CardHeader>
                <CardTitle className="text-xl text-emerald-900">Explore Island Paradise</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Discover Jeju's natural wonders with our island nature specialists.
                </p>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Our Jeju Expert
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
