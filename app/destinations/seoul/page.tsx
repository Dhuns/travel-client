import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HeroSection } from "@/components/hero-section"
import { Camera, Clock, Star, Phone } from "lucide-react"

export default function SeoulDestinationPage() {
  const tours = [
    {
      name: "Seoul Palace & Culture Tour",
      duration: "8 hours",
      price: "$89",
      rating: 4.9,
      description: "Gyeongbokgung Palace, Bukchon Hanok Village, and Insadong cultural district",
    },
    {
      name: "Modern Seoul Experience",
      duration: "6 hours",
      price: "$75",
      rating: 4.8,
      description: "Gangnam district, Hongdae nightlife, and K-pop culture spots",
    },
    {
      name: "Seoul Food & Market Tour",
      duration: "5 hours",
      price: "$65",
      rating: 4.7,
      description: "Myeongdong street food, Dongdaemun market, and traditional cuisine",
    },
  ]

  const attractions = [
    "Gyeongbokgung Palace - Grand royal palace with changing of the guard",
    "Bukchon Hanok Village - Traditional Korean houses in the city center",
    "N Seoul Tower - Iconic tower with panoramic city views",
    "Myeongdong Shopping District - Premier shopping and street food area",
    "Hongdae Area - Vibrant nightlife and university district",
    "Insadong Cultural Street - Traditional crafts and tea houses",
    "Han River Parks - Scenic riverside parks and activities",
    "Dongdaemun Design Plaza - Modern architecture and fashion hub",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Hero Section */}
      <HeroSection
        type="background"
        backgroundImage="/beautiful-korean-traditional-palace-with-tourists-.jpg"
        title="Seoul"
        subtitle="Discover the dynamic heart of Korea in Seoul, where ancient palaces meet cutting-edge technology. Experience the perfect blend of traditional culture and modern innovation in this vibrant metropolis of over 9 million people."
        badge={{
          text: "Capital City",
          icon: "building",
          className: "mb-4 bg-sky-600/90 text-white backdrop-blur-sm",
        }}
        stats={[
          { value: "9.7M+", label: "Population" },
          { value: "600+", label: "Years of History" },
          { value: "4.9★", label: "Tourist Rating" },
        ]}
        actions={[
          {
            text: "Book Seoul Tour",
            className: "bg-sky-600/90 hover:bg-sky-700 backdrop-blur-sm",
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
              <h2 className="text-3xl font-bold mb-6 text-gray-900">About Seoul</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>
                  Seoul, the capital and largest metropolis of South Korea, is a city where ancient traditions
                  seamlessly blend with ultra-modern technology. Home to nearly 10 million people, Seoul is the
                  political, economic, and cultural center of Korea, offering visitors an unparalleled urban experience.
                </p>
                <p>
                  From the majestic palaces of the Joseon Dynasty to the towering skyscrapers of Gangnam, Seoul presents
                  a fascinating contrast of old and new. The city is renowned for its vibrant K-pop culture, innovative
                  technology, world-class shopping, and incredible street food scene.
                </p>
              </div>
            </section>

            {/* Top Attractions */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center">
                <Camera className="w-8 h-8 mr-3 text-sky-600" />
                Top Attractions
              </h2>
              <div className="grid gap-4">
                {attractions.map((attraction, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-sky-50 rounded-lg">
                    <div className="w-2 h-2 bg-sky-600 rounded-full mt-2 flex-shrink-0"></div>
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
                          <CardTitle className="text-xl text-sky-900">{tour.name}</CardTitle>
                          <CardDescription className="mt-2">{tour.description}</CardDescription>
                        </div>
                        <Badge className="bg-sky-600 flex items-center space-x-1">
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
                          <div className="text-2xl font-bold text-sky-600">{tour.price}</div>
                        </div>
                        <Button className="bg-sky-600 hover:bg-sky-700">Book Now</Button>
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
                <CardTitle className="text-xl text-sky-900">Quick Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">Best Time to Visit</h4>
                  <p className="text-gray-600">Spring (April-May) & Autumn (September-November)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Recommended Duration</h4>
                  <p className="text-gray-600">3-5 days</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Famous For</h4>
                  <p className="text-gray-600">K-pop, Palaces, Shopping, Street Food</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Transportation</h4>
                  <p className="text-gray-600">Subway, Bus, Taxi, Walking</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="bg-sky-50">
              <CardHeader>
                <CardTitle className="text-xl text-sky-900">Explore Dynamic Seoul</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">Experience the best of modern Korea with our Seoul city experts.</p>
                <Button className="w-full bg-sky-600 hover:bg-sky-700">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Our Seoul Expert
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
