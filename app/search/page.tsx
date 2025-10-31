"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Star, ShoppingBag } from "lucide-react"

const searchData = {
  tours: [
    {
      id: 1,
      title: "Seoul City Highlights Tour",
      description: "Explore the best of Seoul including Gyeongbokgung Palace, Bukchon Hanok Village, and Myeongdong",
      price: "$89",
      duration: "8 hours",
      rating: 4.8,
      image: "/beautiful-korean-traditional-palace-with-tourists-.jpg",
      keywords: ["seoul", "city", "palace", "hanok", "myeongdong", "highlights"],
    },
    {
      id: 2,
      title: "Seoul Food & Culture Experience",
      description: "Taste authentic Korean cuisine and learn about traditional culture in Seoul",
      price: "$75",
      duration: "6 hours",
      rating: 4.9,
      image: "/korean-traditional-food-bibimbap.jpg",
      keywords: ["seoul", "food", "culture", "korean", "cuisine", "traditional"],
    },
    {
      id: 3,
      title: "Jeju Island Nature Tour",
      description: "Discover the natural beauty of Jeju Island with waterfalls and volcanic landscapes",
      price: "$120",
      duration: "Full day",
      rating: 4.7,
      image: "/jeju-island-nature.jpg",
      keywords: ["jeju", "island", "nature", "waterfall", "volcanic", "landscape"],
    },
    {
      id: 4,
      title: "Busan Coastal Adventure",
      description: "Experience the coastal beauty of Busan with beaches and temples",
      price: "$95",
      duration: "10 hours",
      rating: 4.6,
      image: "/busan-coastal-temple.jpg",
      keywords: ["busan", "coastal", "beach", "temple", "adventure", "sea"],
    },
  ],
  destinations: [
    {
      id: 1,
      title: "Gyeongbokgung Palace",
      description: "The largest of the Five Grand Palaces built during the Joseon Dynasty in Seoul",
      location: "Seoul",
      image: "/beautiful-korean-traditional-palace-with-tourists-.jpg",
      keywords: ["seoul", "palace", "gyeongbokgung", "joseon", "traditional", "history"],
    },
    {
      id: 2,
      title: "Bukchon Hanok Village",
      description: "Traditional Korean village with hundreds of hanoks (traditional houses) in Seoul",
      location: "Seoul",
      image: "/bukchon-hanok-village.jpg",
      keywords: ["seoul", "bukchon", "hanok", "village", "traditional", "houses"],
    },
    {
      id: 3,
      title: "Hallasan National Park",
      description: "South Korea's highest mountain located in Jeju Island",
      location: "Jeju",
      image: "/hallasan-mountain-jeju.jpg",
      keywords: ["jeju", "hallasan", "mountain", "national", "park", "hiking"],
    },
  ],
  products: [
    {
      id: 1,
      title: "Traditional Hanbok Dress",
      description: "Authentic Korean traditional dress perfect for cultural experiences",
      price: "$89",
      image: "/beautiful-korean-traditional-hanbok-dress.jpg",
      keywords: ["hanbok", "traditional", "dress", "korean", "culture", "clothing"],
    },
    {
      id: 2,
      title: "Korean Tea Set",
      description: "Elegant traditional Korean tea set for authentic tea ceremony",
      price: "$45",
      image: "/elegant-korean-traditional-tea-set.jpg",
      keywords: ["tea", "set", "traditional", "korean", "ceremony", "elegant"],
    },
    {
      id: 3,
      title: "K-Beauty Skincare Set",
      description: "Premium Korean skincare products for healthy, glowing skin",
      price: "$65",
      image: "/korean-skincare-beauty-products-set.jpg",
      keywords: ["beauty", "skincare", "korean", "cosmetics", "k-beauty", "seoul"],
    },
    {
      id: 4,
      title: "Korean Snacks Box",
      description: "Assorted traditional Korean snacks and treats",
      price: "$25",
      image: "/korean-traditional-snacks-and-treats-box.jpg",
      keywords: ["snacks", "treats", "korean", "traditional", "food", "box"],
    },
  ],
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchResults, setSearchResults] = useState<any>({ tours: [], destinations: [], products: [] })

  useEffect(() => {
    if (query) {
      const searchTerm = query.toLowerCase()

      const filteredTours = searchData.tours.filter(
        (tour) =>
          tour.keywords.some((keyword) => keyword.includes(searchTerm)) ||
          tour.title.toLowerCase().includes(searchTerm) ||
          tour.description.toLowerCase().includes(searchTerm),
      )

      const filteredDestinations = searchData.destinations.filter(
        (destination) =>
          destination.keywords.some((keyword) => keyword.includes(searchTerm)) ||
          destination.title.toLowerCase().includes(searchTerm) ||
          destination.description.toLowerCase().includes(searchTerm),
      )

      const filteredProducts = searchData.products.filter(
        (product) =>
          product.keywords.some((keyword) => keyword.includes(searchTerm)) ||
          product.title.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm),
      )

      setSearchResults({
        tours: filteredTours,
        destinations: filteredDestinations,
        products: filteredProducts,
      })
    }
  }, [query])

  const totalResults = searchResults.tours.length + searchResults.destinations.length + searchResults.products.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pt-32">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Results for "{query}"</h1>
          <p className="text-gray-600">Found {totalResults} results</p>
        </div>

        {totalResults === 0 && query && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No results found for "{query}"</p>
            <p className="text-gray-400 mt-2">Try searching for tours, destinations, or products</p>
          </div>
        )}

        {searchResults.tours.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-blue-600" />
              Tours ({searchResults.tours.length})
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.tours.map((tour: any) => (
                <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={tour.image || "/placeholder.svg"}
                      alt={tour.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2">{tour.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{tour.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {tour.duration}
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-400" />
                          {tour.rating}
                        </div>
                      </div>
                      <span className="text-xl font-bold text-blue-600">{tour.price}</span>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Book Now</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {searchResults.destinations.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-green-600" />
              Destinations ({searchResults.destinations.length})
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.destinations.map((destination: any) => (
                <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2">{destination.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{destination.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {destination.location}
                      </Badge>
                      <Button
                        variant="outline"
                        className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                      >
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {searchResults.products.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <ShoppingBag className="w-6 h-6 mr-2 text-purple-600" />
              Products ({searchResults.products.length})
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {searchResults.products.map((product: any) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-sm mb-2">{product.title}</h3>
                    <p className="text-gray-600 text-xs mb-3">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-purple-600">{product.price}</span>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
