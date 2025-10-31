import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HeroSection } from "@/components/hero-section"
import { Camera, Clock, Star, Phone } from "lucide-react"

export default function BusanDestinationPage() {
  const tours = [
    {
      name: "Busan Coastal Highlights Tour",
      duration: "8 hours",
      price: "$79",
      rating: 4.7,
      description: "Haeundae Beach, Gamcheon Village, and Jagalchi Fish Market",
    },
    {
      name: "Busan Temple & Culture Tour",
      duration: "6 hours",
      price: "$69",
      rating: 4.6,
      description: "Beomeosa Temple, Haedong Yonggungsa seaside temple, and cultural sites",
    },
    {
      name: "Busan Food & Market Experience",
      duration: "5 hours",
      price: "$59",
      rating: 4.8,
      description: "Fresh seafood, local markets, and traditional Busan cuisine",
    },
  ]

  const attractions = [
    "Haeundae Beach - Korea's most famous beach resort",
    "Gamcheon Culture Village - Colorful hillside art village",
    "Jagalchi Fish Market - Korea's largest seafood market",
    "Beomeosa Temple - Historic mountain temple complex",
    "Haedong Yonggungsa Temple - Unique seaside Buddhist temple",
    "Busan Tower - Panoramic views of the coastal city",
    "Gwangalli Beach - Night views of Diamond Bridge",
    "BIFF Square - Busan International Film Festival venue",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      {/* Hero Section */}
      <HeroSection
        type="background"
        backgroundImage="/beautiful-busan-haeundae-beach-and-coastal-city-vi.jpg"
        title="Busan"
        subtitle="Experience Korea's stunning coastal beauty in Busan, the country's second-largest city and premier beach destination. Discover pristine beaches, colorful villages, fresh seafood, and unique seaside temples in this vibrant port city."
        badge={{
          text: "Coastal City",
          icon: "waves",
          className: "mb-4 bg-cyan-600/90 text-white backdrop-blur-sm",
        }}
        stats={[
          { value: "3.4M+", label: "Population" },
          { value: "12km", label: "Coastline" },
          { value: "4.7★", label: "Tourist Rating" },
        ]}
        actions={[
          {
            text: "Book Busan Tour",
            className: "bg-cyan-600/90 hover:bg-cyan-700 backdrop-blur-sm",
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
              <h2 className="text-3xl font-bold mb-6 text-gray-900">About Busan</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>
                  Busan, South Korea's second-largest city and largest port, is renowned for its stunning beaches,
                  vibrant culture, and exceptional seafood. Located on the southeastern coast, Busan offers a perfect
                  blend of urban sophistication and coastal charm, making it a favorite destination for both domestic
                  and international travelers.
                </p>
                <p>
                  The city is famous for its beautiful beaches like Haeundae and Gwangalli, the colorful Gamcheon
                  Culture Village, and the bustling Jagalchi Fish Market. Busan also hosts the prestigious Busan
                  International Film Festival and offers unique attractions like seaside temples and mountain hiking
                  trails.
                </p>
              </div>
            </section>

            {/* Top Attractions */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center">
                <Camera className="w-8 h-8 mr-3 text-cyan-600" />
                Top Attractions
              </h2>
              <div className="grid gap-4">
                {attractions.map((attraction, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-cyan-50 rounded-lg">
                    <div className="w-2 h-2 bg-cyan-600 rounded-full mt-2 flex-shrink-0"></div>
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
                          <CardTitle className="text-xl text-cyan-900">{tour.name}</CardTitle>
                          <CardDescription className="mt-2">{tour.description}</CardDescription>
                        </div>
                        <Badge className="bg-cyan-600 flex items-center space-x-1">
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
                          <div className="text-2xl font-bold text-cyan-600">{tour.price}</div>
                        </div>
                        <Button className="bg-cyan-600 hover:bg-cyan-700">Book Now</Button>
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
                <CardTitle className="text-xl text-cyan-900">Quick Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">Best Time to Visit</h4>
                  <p className="text-gray-600">Summer (June-August) & Autumn (September-November)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Recommended Duration</h4>
                  <p className="text-gray-600">2-3 days</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Famous For</h4>
                  <p className="text-gray-600">Beaches, Seafood, Temples, Film Festival</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Transportation</h4>
                  <p className="text-gray-600">Subway, Bus, Taxi, Walking</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="bg-cyan-50">
              <CardHeader>
                <CardTitle className="text-xl text-cyan-900">Discover Coastal Korea</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Experience the best of Korea's coastal culture with our Busan specialists.
                </p>
                <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Our Busan Expert
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
