import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Clock, Star, Calendar, Phone, Home } from "lucide-react"

export default function JeonjuDestinationPage() {
  const tours = [
    {
      name: "Jeonju Hanok Village Tour",
      duration: "6 hours",
      price: "$70",
      rating: 4.6,
      description: "Traditional hanok houses, cultural experiences, and local crafts",
    },
    {
      name: "Jeonju Food Culture Tour",
      duration: "4 hours",
      price: "$55",
      rating: 4.9,
      description: "Bibimbap origin, traditional markets, and street food",
    },
    {
      name: "Traditional Craft Experience",
      duration: "5 hours",
      price: "$65",
      rating: 4.7,
      description: "Korean paper making, pottery, and traditional art workshops",
    },
  ]

  const attractions = [
    "Jeonju Hanok Village - Korea's largest traditional village",
    "Gyeonggijeon Shrine - Memorial shrine for Joseon Dynasty founder",
    "Jeondong Catholic Cathedral - Beautiful Western-style cathedral",
    "Korean Paper Museum - Traditional hanji paper making",
    "Jeonju Traditional Wine Museum - Local makgeolli and soju",
    "Omokdae and Imokdae - Historic pavilions with city views",
    "Jeonju Nambu Market - Traditional market with local foods",
    "Pungnammun Gate - Historic city gate from Joseon period",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* Hero Section */}
      <div
        className="pt-28 pb-16 relative overflow-hidden"
        style={{
          backgroundImage: `url('/beautiful-korean-traditional-hanbok-dress.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-rose-600/90 text-white backdrop-blur-sm">
              <Home className="w-4 h-4 mr-2" />
              Traditional City
            </Badge>
            <h1 className="text-5xl font-bold mb-6 text-white drop-shadow-2xl">Jeonju</h1>
            <p className="text-xl text-white mb-8 leading-relaxed max-w-3xl drop-shadow-lg">
              Experience authentic Korean culture in Jeonju, the spiritual home of Korean cuisine and traditional
              architecture. Famous for bibimbap and its beautifully preserved hanok village, Jeonju offers an immersive
              journey into Korea's cultural heart.
            </p>

            <div className="flex flex-wrap gap-8 text-white mb-8">
              <div className="text-center bg-black/20 backdrop-blur-sm rounded-lg p-3">
                <div className="text-3xl font-bold text-rose-200">650K+</div>
                <div className="text-sm text-rose-100">Population</div>
              </div>
              <div className="text-center bg-black/20 backdrop-blur-sm rounded-lg p-3">
                <div className="text-3xl font-bold text-rose-200">800+</div>
                <div className="text-sm text-rose-100">Hanok Houses</div>
              </div>
              <div className="text-center bg-black/20 backdrop-blur-sm rounded-lg p-3">
                <div className="text-3xl font-bold text-rose-200">4.6★</div>
                <div className="text-sm text-rose-100">Tourist Rating</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-rose-600/90 hover:bg-rose-700 backdrop-blur-sm">
                <Calendar className="w-5 h-5 mr-2" />
                Book Jeonju Tour
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/20 border-white text-white hover:bg-white/30 backdrop-blur-sm"
              >
                <Phone className="w-5 h-5 mr-2" />
                Contact Guide
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* About Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">About Jeonju</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>
                  Jeonju, the capital of North Jeolla Province, is renowned as the birthplace of bibimbap and the
                  spiritual home of Korean traditional culture. The city's crown jewel, Jeonju Hanok Village, contains
                  over 800 traditional Korean houses, making it the largest collection of hanok in Korea.
                </p>
                <p>
                  Beyond its architectural treasures, Jeonju is celebrated for its culinary heritage, traditional
                  crafts, and cultural festivals. The city perfectly balances preservation of ancient traditions with
                  modern conveniences, offering visitors an authentic taste of Korean culture and cuisine.
                </p>
              </div>
            </section>

            {/* Top Attractions */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center">
                <Camera className="w-8 h-8 mr-3 text-rose-600" />
                Top Attractions
              </h2>
              <div className="grid gap-4">
                {attractions.map((attraction, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-rose-50 rounded-lg">
                    <div className="w-2 h-2 bg-rose-600 rounded-full mt-2 flex-shrink-0"></div>
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
                          <CardTitle className="text-xl text-rose-900">{tour.name}</CardTitle>
                          <CardDescription className="mt-2">{tour.description}</CardDescription>
                        </div>
                        <Badge className="bg-rose-600 flex items-center space-x-1">
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
                          <div className="text-2xl font-bold text-rose-600">{tour.price}</div>
                        </div>
                        <Button className="bg-rose-600 hover:bg-rose-700">Book Now</Button>
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
                <CardTitle className="text-xl text-rose-900">Quick Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">Best Time to Visit</h4>
                  <p className="text-gray-600">Spring (April-May) & Autumn (September-November)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Recommended Duration</h4>
                  <p className="text-gray-600">1-2 days</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Famous For</h4>
                  <p className="text-gray-600">Bibimbap, Hanok Village, Traditional Culture</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Transportation</h4>
                  <p className="text-gray-600">Walking, Bus, Bicycle rental</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="bg-rose-50">
              <CardHeader>
                <CardTitle className="text-xl text-rose-900">Experience Traditional Korea</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Discover authentic Korean culture and cuisine with our local cultural experts.
                </p>
                <Button className="w-full bg-rose-600 hover:bg-rose-700">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Our Culture Expert
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
