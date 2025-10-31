import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Clock, Star, Calendar, Phone, Crown } from "lucide-react"

export default function GyeongjuDestinationPage() {
  const tours = [
    {
      name: "Gyeongju Historical Sites Tour",
      duration: "8 hours",
      price: "$85",
      rating: 4.7,
      description: "Bulguksa Temple, Seokguram Grotto, and Tumuli Park",
    },
    {
      name: "Ancient Capital Walking Tour",
      duration: "5 hours",
      price: "$65",
      rating: 4.6,
      description: "Anapji Pond, Cheomseongdae Observatory, and downtown",
    },
    {
      name: "Gyeongju Cultural Experience",
      duration: "6 hours",
      price: "$75",
      rating: 4.8,
      description: "Traditional crafts, temple stay experience, and local cuisine",
    },
  ]

  const attractions = [
    "Bulguksa Temple - UNESCO World Heritage Buddhist temple",
    "Seokguram Grotto - Ancient stone Buddha grotto",
    "Tumuli Park - Ancient royal burial mounds",
    "Anapji Pond - Beautiful palace pond with pavilions",
    "Cheomseongdae Observatory - World's oldest astronomical observatory",
    "Gyeongju National Museum - Artifacts from Silla Dynasty",
    "Yangdong Folk Village - Traditional Korean village",
    "Bomun Lake Resort - Modern resort area with cultural facilities",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
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
            <Badge className="mb-4 bg-amber-600/90 text-white backdrop-blur-sm">
              <Crown className="w-4 h-4 mr-2" />
              Ancient Capital
            </Badge>
            <h1 className="text-5xl font-bold mb-6 text-white drop-shadow-2xl">Gyeongju</h1>
            <p className="text-xl text-white mb-8 leading-relaxed max-w-3xl drop-shadow-lg">
              Step into Korea's ancient past in Gyeongju, the former capital of the Silla Dynasty. This "museum without
              walls" preserves over 1,000 years of Korean history through magnificent temples, royal tombs, and UNESCO
              World Heritage sites.
            </p>

            <div className="flex flex-wrap gap-8 text-white mb-8">
              <div className="text-center bg-black/20 backdrop-blur-sm rounded-lg p-3">
                <div className="text-3xl font-bold text-amber-200">260K+</div>
                <div className="text-sm text-amber-100">Population</div>
              </div>
              <div className="text-center bg-black/20 backdrop-blur-sm rounded-lg p-3">
                <div className="text-3xl font-bold text-amber-200">1000+</div>
                <div className="text-sm text-amber-100">Years of History</div>
              </div>
              <div className="text-center bg-black/20 backdrop-blur-sm rounded-lg p-3">
                <div className="text-3xl font-bold text-amber-200">4.7★</div>
                <div className="text-sm text-amber-100">Tourist Rating</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-amber-600/90 hover:bg-amber-700 backdrop-blur-sm">
                <Calendar className="w-5 h-5 mr-2" />
                Book Gyeongju Tour
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
              <h2 className="text-3xl font-bold mb-6 text-gray-900">About Gyeongju</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>
                  Gyeongju, once the glorious capital of the ancient Silla Kingdom, is a living testament to Korea's
                  rich cultural heritage. For nearly 1,000 years, this city was the center of Korean civilization, and
                  today it stands as one of the world's most important historical sites.
                </p>
                <p>
                  Often called "the museum without walls," Gyeongju contains more tombs, temples, rock carvings,
                  pagodas, and palace ruins than any other place in Korea. The city's remarkable preservation of ancient
                  architecture and artifacts offers visitors an unparalleled journey through Korean history.
                </p>
              </div>
            </section>

            {/* Top Attractions */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center">
                <Camera className="w-8 h-8 mr-3 text-amber-600" />
                Top Attractions
              </h2>
              <div className="grid gap-4">
                {attractions.map((attraction, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-amber-50 rounded-lg">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
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
                          <CardTitle className="text-xl text-amber-900">{tour.name}</CardTitle>
                          <CardDescription className="mt-2">{tour.description}</CardDescription>
                        </div>
                        <Badge className="bg-amber-600 flex items-center space-x-1">
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
                          <div className="text-2xl font-bold text-amber-600">{tour.price}</div>
                        </div>
                        <Button className="bg-amber-600 hover:bg-amber-700">Book Now</Button>
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
                <CardTitle className="text-xl text-amber-900">Quick Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">Best Time to Visit</h4>
                  <p className="text-gray-600">Spring (April-May) & Autumn (September-November)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Recommended Duration</h4>
                  <p className="text-gray-600">2 days</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Famous For</h4>
                  <p className="text-gray-600">UNESCO Sites, Ancient History, Silla Dynasty</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Transportation</h4>
                  <p className="text-gray-600">Bus, Bicycle rental, Walking tours</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="bg-amber-50">
              <CardHeader>
                <CardTitle className="text-xl text-amber-900">Discover Ancient Korea</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">Let our history experts guide you through Korea's ancient capital.</p>
                <Button className="w-full bg-amber-600 hover:bg-amber-700">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Our History Expert
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
