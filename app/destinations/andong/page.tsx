import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Clock, Star, Calendar, Phone, Landmark } from "lucide-react"

export default function AndongDestinationPage() {
  const tours = [
    {
      name: "Andong Heritage Village Tour",
      duration: "7 hours",
      price: "$80",
      rating: 4.5,
      description: "Hahoe Folk Village, traditional mask dance, and cultural sites",
    },
    {
      name: "Confucian Culture Experience",
      duration: "5 hours",
      price: "$60",
      rating: 4.6,
      description: "Dosan Seowon academy and Confucian philosophy exploration",
    },
    {
      name: "Traditional Architecture Tour",
      duration: "6 hours",
      price: "$70",
      rating: 4.4,
      description: "Historic buildings, traditional construction methods, and craftsmanship",
    },
  ]

  const attractions = [
    "Hahoe Folk Village - UNESCO World Heritage traditional village",
    "Andong Mask Dance - Traditional Hahoe mask performance",
    "Dosan Seowon - Confucian academy and shrine",
    "Andong Folk Museum - Regional culture and history",
    "Woryeong교 Bridge - Longest wooden footbridge in Korea",
    "Bongjeongsa Temple - Oldest wooden building in Korea",
    "Andong Soju Museum - Traditional Korean liquor heritage",
    "Nakdong River - Scenic river views and walking paths",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Hero Section */}
      <div
        className="pt-28 pb-16 relative overflow-hidden"
        style={{
          backgroundImage: `url('/korean-traditional-bow-etiquette.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-indigo-600/90 text-white backdrop-blur-sm">
              <Landmark className="w-4 h-4 mr-2" />
              Cultural Heritage
            </Badge>
            <h1 className="text-5xl font-bold mb-6 text-white drop-shadow-2xl">Andong</h1>
            <p className="text-xl text-white mb-8 leading-relaxed max-w-3xl drop-shadow-lg">
              Discover Korea's most authentic traditional culture in Andong, home to UNESCO World Heritage sites and the
              birthplace of Confucian philosophy in Korea. Experience centuries-old traditions, folk performances, and
              architectural masterpieces in this cultural treasure trove.
            </p>

            <div className="flex flex-wrap gap-8 text-white mb-8">
              <div className="text-center bg-black/20 backdrop-blur-sm rounded-lg p-3">
                <div className="text-3xl font-bold text-indigo-200">170K+</div>
                <div className="text-sm text-indigo-100">Population</div>
              </div>
              <div className="text-center bg-black/20 backdrop-blur-sm rounded-lg p-3">
                <div className="text-3xl font-bold text-indigo-200">600+</div>
                <div className="text-sm text-indigo-100">Years of Tradition</div>
              </div>
              <div className="text-center bg-black/20 backdrop-blur-sm rounded-lg p-3">
                <div className="text-3xl font-bold text-indigo-200">4.5★</div>
                <div className="text-sm text-indigo-100">Tourist Rating</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-indigo-600/90 hover:bg-indigo-700 backdrop-blur-sm">
                <Calendar className="w-5 h-5 mr-2" />
                Book Andong Tour
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
              <h2 className="text-3xl font-bold mb-6 text-gray-900">About Andong</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>
                  Andong, located in North Gyeongsang Province, is Korea's most important center for traditional culture
                  and Confucian heritage. The city has preserved its cultural identity for over 600 years, maintaining
                  ancient traditions, architecture, and philosophical teachings that define Korean culture.
                </p>
                <p>
                  Home to the UNESCO World Heritage Hahoe Folk Village and numerous Confucian academies, Andong offers
                  visitors an unparalleled glimpse into traditional Korean life. The city's commitment to cultural
                  preservation makes it an essential destination for understanding Korea's roots.
                </p>
              </div>
            </section>

            {/* Top Attractions */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center">
                <Camera className="w-8 h-8 mr-3 text-indigo-600" />
                Top Attractions
              </h2>
              <div className="grid gap-4">
                {attractions.map((attraction, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-indigo-50 rounded-lg">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
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
                          <CardTitle className="text-xl text-indigo-900">{tour.name}</CardTitle>
                          <CardDescription className="mt-2">{tour.description}</CardDescription>
                        </div>
                        <Badge className="bg-indigo-600 flex items-center space-x-1">
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
                          <div className="text-2xl font-bold text-indigo-600">{tour.price}</div>
                        </div>
                        <Button className="bg-indigo-600 hover:bg-indigo-700">Book Now</Button>
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
                <CardTitle className="text-xl text-indigo-900">Quick Information</CardTitle>
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
                  <p className="text-gray-600">UNESCO Sites, Confucian Culture, Mask Dance</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Transportation</h4>
                  <p className="text-gray-600">Bus, Taxi, Walking tours</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="bg-indigo-50">
              <CardHeader>
                <CardTitle className="text-xl text-indigo-900">Explore Traditional Korea</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Experience authentic Korean heritage with our traditional culture specialists.
                </p>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Our Heritage Expert
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
