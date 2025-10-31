import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Camera, Clock, Star } from "lucide-react"
import Link from "next/link"

export default function DestinationsPage() {
  const destinations = [
    {
      name: "Seoul",
      slug: "seoul",
      description: "The vibrant capital city with modern skyscrapers and ancient palaces",
      image: "/beautiful-korean-traditional-palace-with-tourists-.jpg",
      highlights: ["Gyeongbokgung Palace", "Myeongdong Shopping", "Hongdae Nightlife", "Han River"],
      bestTime: "Spring & Autumn",
      duration: "3-5 days",
      rating: 4.9,
    },
    {
      name: "Busan",
      slug: "busan",
      description: "Coastal city famous for beaches, temples, and fresh seafood",
      image: "/korean-seasons-cherry-blossom-autumn.jpg",
      highlights: ["Haeundae Beach", "Gamcheon Village", "Jagalchi Market", "Beomeosa Temple"],
      bestTime: "Summer",
      duration: "2-3 days",
      rating: 4.8,
    },
    {
      name: "Jeju Island",
      slug: "jeju",
      description: "Beautiful island with volcanic landscapes and pristine beaches",
      image: "/jeju-island-nature.jpg",
      highlights: ["Hallasan Mountain", "Seongsan Sunrise Peak", "Manjanggul Cave", "Jeju Folk Village"],
      bestTime: "Year-round",
      duration: "3-4 days",
      rating: 4.9,
    },
    {
      name: "Gyeongju",
      slug: "gyeongju",
      description: "Ancient capital with UNESCO World Heritage sites",
      image: "/korean-traditional-bow-etiquette.jpg",
      highlights: ["Bulguksa Temple", "Seokguram Grotto", "Tumuli Park", "Anapji Pond"],
      bestTime: "Spring & Autumn",
      duration: "2 days",
      rating: 4.7,
    },
    {
      name: "Jeonju",
      slug: "jeonju",
      description: "Traditional city famous for hanok villages and Korean cuisine",
      image: "/beautiful-korean-traditional-hanbok-dress.jpg",
      highlights: ["Jeonju Hanok Village", "Bibimbap Origin", "Traditional Crafts", "Korean Paper Museum"],
      bestTime: "Spring & Autumn",
      duration: "1-2 days",
      rating: 4.6,
    },
    {
      name: "Andong",
      slug: "andong",
      description: "Preserved traditional culture and UNESCO heritage sites",
      image: "/korean-temple-stay-mountain-nature-wellness-retrea.jpg",
      highlights: ["Hahoe Folk Village", "Andong Mask Dance", "Dosan Seowon", "Traditional Architecture"],
      bestTime: "Spring & Autumn",
      duration: "1-2 days",
      rating: 4.5,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Header */}
      <div
        className="pt-28 pb-12 relative overflow-hidden"
        style={{
          backgroundImage: `url('/korean-seasons-cherry-blossom-autumn.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/40 via-sky-800/30 to-sky-700/20"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">Korean Destinations</h1>
            <p className="text-lg text-sky-100 mb-6 leading-relaxed">
              Discover Korea's most enchanting destinations, from bustling metropolitan cities to serene traditional
              villages, each offering unique cultural experiences and breathtaking landscapes.
            </p>

            {/* Stats section */}
            <div className="flex flex-wrap gap-8 text-white">
              <div className="text-center">
                <div className="text-3xl font-bold text-sky-200">6+</div>
                <div className="text-sm text-sky-100">Top Destinations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-sky-200">UNESCO</div>
                <div className="text-sm text-sky-100">Heritage Sites</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-sky-200">4.8★</div>
                <div className="text-sm text-sky-100">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 bg-gray-200">
                <img
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 right-4 bg-sky-600 flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-white" />
                  <span>{destination.rating}</span>
                </Badge>
              </div>

              <CardHeader>
                <CardTitle className="text-xl flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-sky-600" />
                  <span>{destination.name}</span>
                </CardTitle>
                <CardDescription>{destination.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center space-x-2">
                      <Camera className="w-4 h-4 text-sky-600" />
                      <span>Must-See Highlights:</span>
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {destination.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <div className="w-1 h-1 bg-sky-600 rounded-full"></div>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{destination.duration}</span>
                    </div>
                    <div>
                      <span className="font-medium">Best Time:</span> {destination.bestTime}
                    </div>
                  </div>

                  <Link href={`/destinations/${destination.slug}`}>
                    <Button className="w-full mt-4 bg-sky-600 hover:bg-sky-700 font-bold">Explore {destination.name}</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
