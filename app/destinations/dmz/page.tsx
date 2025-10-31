import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HeroSection } from "@/components/hero-section"
import { Camera, Clock, Star, Phone } from "lucide-react"

export default function DMZDestinationPage() {
  const tours = [
    {
      name: "DMZ & JSA Full Day Tour",
      duration: "8 hours",
      price: "$79",
      rating: 4.9,
      description: "Joint Security Area, 3rd Tunnel, and Dora Observatory",
    },
    {
      name: "DMZ Half Day Experience",
      duration: "4 hours",
      price: "$55",
      rating: 4.7,
      description: "DMZ Museum, Imjingak Park, and Freedom Bridge",
    },
    {
      name: "DMZ History & Culture Tour",
      duration: "6 hours",
      price: "$69",
      rating: 4.8,
      description: "Korean War history, divided Korea story, and peace education",
    },
  ]

  const attractions = [
    "Joint Security Area (JSA) - The only place where North and South meet",
    "3rd Infiltration Tunnel - Underground tunnel discovered in 1978",
    "Dora Observatory - Closest viewpoint to North Korea",
    "Imjingak Park - Memorial park for divided families",
    "Freedom Bridge - Historic bridge used for prisoner exchanges",
    "DMZ Museum - Comprehensive history of the Korean War",
    "Dorasan Station - Northernmost train station in South Korea",
    "Peace Bell - Symbol of hope for Korean reunification",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <HeroSection
        type="background"
        backgroundImage="/korean-dmz-border-historical-site-and-observation-.jpg"
        title="DMZ (Demilitarized Zone)"
        subtitle="Journey through Korea's divided history at the DMZ, the most heavily fortified border in the world. Experience the tension and hope of a divided nation while learning about the Korean War and the ongoing quest for peace and reunification."
        badge={{
          text: "Historical Site",
          icon: "shield",
          className: "mb-4 bg-slate-600/90 text-white backdrop-blur-sm",
        }}
        stats={[
          { value: "4km", label: "Width" },
          { value: "248km", label: "Length" },
          { value: "4.9★", label: "Tourist Rating" },
        ]}
        actions={[
          {
            text: "Book DMZ Tour",
            className: "bg-slate-600/90 hover:bg-slate-700 backdrop-blur-sm",
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
              <h2 className="text-3xl font-bold mb-6 text-gray-900">About the DMZ</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>
                  The Korean Demilitarized Zone (DMZ) is a strip of land running across the Korean Peninsula that serves
                  as a buffer zone between North and South Korea. Established in 1953 after the Korean War armistice,
                  the DMZ is 250 kilometers long and approximately 4 kilometers wide, making it one of the most heavily
                  militarized borders in the world.
                </p>
                <p>
                  Despite its military significance, the DMZ has become an important symbol of division and hope for
                  reunification. Tours to the DMZ offer visitors a unique opportunity to learn about Korean history,
                  witness the ongoing division, and understand the complex relationship between the two Koreas.
                </p>
              </div>
            </section>

            {/* Top Attractions */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center">
                <Camera className="w-8 h-8 mr-3 text-slate-600" />
                Top Attractions
              </h2>
              <div className="grid gap-4">
                {attractions.map((attraction, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-slate-50 rounded-lg">
                    <div className="w-2 h-2 bg-slate-600 rounded-full mt-2 flex-shrink-0"></div>
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
                          <CardTitle className="text-xl text-slate-900">{tour.name}</CardTitle>
                          <CardDescription className="mt-2">{tour.description}</CardDescription>
                        </div>
                        <Badge className="bg-slate-600 flex items-center space-x-1">
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
                          <div className="text-2xl font-bold text-slate-600">{tour.price}</div>
                        </div>
                        <Button className="bg-slate-600 hover:bg-slate-700">Book Now</Button>
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
                <CardTitle className="text-xl text-slate-900">Quick Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">Best Time to Visit</h4>
                  <p className="text-gray-600">Year-round (Spring & Autumn ideal)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Recommended Duration</h4>
                  <p className="text-gray-600">6-8 hours</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Famous For</h4>
                  <p className="text-gray-600">Korean War History, Division, JSA</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Transportation</h4>
                  <p className="text-gray-600">Tour bus only (restricted area)</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="bg-slate-50">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900">Experience Korean History</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Learn about Korea's divided history with our expert historical guides.
                </p>
                <Button className="w-full bg-slate-600 hover:bg-slate-700">
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
