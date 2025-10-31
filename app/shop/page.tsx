import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, Heart, Filter, Package, Gift, Truck, CreditCard, ShoppingBag, Tag } from "lucide-react"

export default function ShopPage() {
  const productCategories = [
    {
      name: "K-Beauty",
      products: [
        {
          name: "Korean Skincare Set",
          price: "$45",
          originalPrice: "$60",
          rating: 4.8,
          reviews: 124,
          image: "/korean-skincare-beauty-products-set.jpg",
          description: "Complete 10-step Korean skincare routine set",
          bestseller: true,
        },
        {
          name: "Sheet Mask Collection",
          price: "$25",
          rating: 4.7,
          reviews: 89,
          image: "/korean-mask-pack-products-set.jpg",
          description: "20 premium Korean sheet masks variety pack",
        },
      ],
    },
    {
      name: "Traditional Items",
      products: [
        {
          name: "Hanbok Dress",
          price: "$120",
          rating: 4.9,
          reviews: 67,
          image: "/beautiful-korean-traditional-hanbok-dress.jpg",
          description: "Authentic Korean traditional dress - rental available",
        },
        {
          name: "Korean Tea Set",
          price: "$35",
          rating: 4.6,
          reviews: 45,
          image: "/elegant-korean-traditional-tea-set.jpg",
          description: "Traditional ceramic tea set with premium Korean tea",
        },
      ],
    },
    {
      name: "Snacks & Food",
      products: [
        {
          name: "Korean Snack Box",
          price: "$28",
          rating: 4.8,
          reviews: 156,
          image: "/korean-traditional-snacks-and-treats-box.jpg",
          description: "Assorted Korean snacks and treats box",
          popular: true,
        },
        {
          name: "Ginseng Products",
          price: "$55",
          rating: 4.7,
          reviews: 78,
          image: "/korean-red-ginseng-products.png",
          description: "Premium Korean red ginseng products",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Header */}
      <div className="relative pt-32 pb-12 bg-gradient-to-r from-sky-400 to-sky-600 text-white overflow-hidden">
        {/* 배경 아이콘들 */}
        <div className="absolute inset-0 overflow-hidden">
          <ShoppingBag className="absolute top-8 right-20 w-16 h-16 text-white/20 transform rotate-12" />
          <Package className="absolute top-20 right-40 w-12 h-12 text-white/30" />
          <Gift className="absolute top-12 right-60 w-14 h-14 text-white/25 transform -rotate-12" />
          <Tag className="absolute top-32 right-32 w-10 h-10 text-white/35" />
          <CreditCard className="absolute top-40 right-48 w-12 h-12 text-white/20 transform rotate-6" />
          <Truck className="absolute top-28 right-72 w-16 h-16 text-white/15" />
          <Star className="absolute top-16 right-80 w-8 h-8 text-white/40" />
          <Heart className="absolute top-36 right-16 w-10 h-10 text-white/30 transform -rotate-6" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">Korean Goods Shop</h1>
              <p className="text-xl text-sky-100">Authentic Korean products delivered worldwide</p>
            </div>
            <div className="hidden md:flex items-center space-x-8 text-center">
              <div>
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-sky-200">Products</div>
              </div>
              <div>
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm text-sky-200">Countries</div>
              </div>
              <div>
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm text-sky-200">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </Button>
              <div className="text-sm text-gray-600">Showing all products</div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                <option>Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="container mx-auto px-6 py-12">
        {productCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">{category.name}</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.products.map((product, productIndex) => (
                <Card
                  key={productIndex}
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300 relative"
                >
                  {product.bestseller && (
                    <Badge className="absolute top-4 left-4 bg-red-500 text-white z-10">Bestseller</Badge>
                  )}
                  {product.popular && (
                    <Badge className="absolute top-4 left-4 bg-green-500 text-white z-10">Popular</Badge>
                  )}

                  <div className="relative h-48 bg-gray-200">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription className="text-sm">{product.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{product.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-sky-600">{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                          )}
                        </div>
                      </div>

                      <Button className="w-full bg-sky-600 hover:bg-sky-700 flex items-center justify-center space-x-2">
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter Section */}
      <div className="bg-sky-50 py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Subscribe to get notified about new products and exclusive Korean goods deals.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <Button className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-r-lg">Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
