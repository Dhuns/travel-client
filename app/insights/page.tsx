import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  User,
  Clock,
  ArrowRight,
  TrendingUp,
  BookOpen,
  PenTool,
  Lightbulb,
  Globe,
  FileText,
  Bookmark,
} from "lucide-react"

export default function InsightsPage() {
  const articles = [
    {
      title: "Best Time to Visit Korea: A Seasonal Guide",
      excerpt:
        "Discover the perfect season for your Korean adventure with our comprehensive guide to weather, festivals, and seasonal attractions.",
      author: "Sarah Kim",
      date: "March 15, 2024",
      readTime: "5 min read",
      category: "Travel Tips",
      image: "/korean-seasons-cherry-blossom-autumn.jpg",
      featured: true,
    },
    {
      title: "Korean Etiquette: Do's and Don'ts for Travelers",
      excerpt:
        "Learn essential Korean customs and etiquette to show respect and enhance your cultural experience during your visit.",
      author: "James Park",
      date: "March 10, 2024",
      readTime: "7 min read",
      category: "Culture",
      image: "/korean-traditional-bow-etiquette.jpg",
    },
    {
      title: "Must-Try Korean Foods for First-Time Visitors",
      excerpt: "A foodie's guide to Korean cuisine, from street food to traditional dishes you absolutely cannot miss.",
      author: "Lisa Chen",
      date: "March 8, 2024",
      readTime: "6 min read",
      category: "Food & Dining",
      image: "/korean-traditional-food-bibimbap.jpg",
    },
    {
      title: "Seoul Transportation Guide: Getting Around Like a Local",
      excerpt:
        "Master Seoul's efficient public transportation system with our insider tips and tricks for seamless city navigation.",
      author: "Mike Johnson",
      date: "March 5, 2024",
      readTime: "8 min read",
      category: "Transportation",
      image: "/beautiful-korean-traditional-palace-with-tourists-.jpg",
    },
    {
      title: "Korean Language Basics for Travelers",
      excerpt:
        "Essential Korean phrases and expressions that will help you communicate and connect with locals during your trip.",
      author: "Anna Lee",
      date: "March 1, 2024",
      readTime: "4 min read",
      category: "Language",
      image: "/korean-traditional-bow-etiquette.jpg",
    },
    {
      title: "Hidden Gems: Off-the-Beaten-Path Korean Destinations",
      excerpt:
        "Explore lesser-known but equally stunning destinations in Korea that offer authentic experiences away from crowds.",
      author: "David Kim",
      date: "February 28, 2024",
      readTime: "9 min read",
      category: "Destinations",
      image: "/beautiful-korean-traditional-palace-with-tourists-.jpg",
    },
  ]

  const categories = ["All", "Travel Tips", "Culture", "Food & Dining", "Transportation", "Language", "Destinations"]

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Header */}
      <div className="relative pt-32 pb-12 bg-gradient-to-r from-sky-500 to-sky-700 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <BookOpen className="absolute top-8 right-20 w-16 h-16 text-white/20 transform rotate-12" />
          <PenTool className="absolute top-20 right-40 w-12 h-12 text-white/30" />
          <Lightbulb className="absolute top-12 right-60 w-14 h-14 text-white/25 transform -rotate-12" />
          <Globe className="absolute top-32 right-32 w-10 h-10 text-white/35" />
          <FileText className="absolute top-40 right-48 w-12 h-12 text-white/20 transform rotate-6" />
          <Bookmark className="absolute top-28 right-72 w-16 h-16 text-white/15" />
          <TrendingUp className="absolute top-16 right-80 w-8 h-8 text-white/40" />
          <Calendar className="absolute top-36 right-16 w-10 h-10 text-white/30 transform -rotate-6" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">Travel Insights</h1>
              <p className="text-xl text-sky-100">
                Expert tips, cultural insights, and travel guides for your Korean adventure
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-8 text-center">
              <div>
                <div className="text-2xl font-bold">100+</div>
                <div className="text-sm text-sky-200">Articles</div>
              </div>
              <div>
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm text-sky-200">Categories</div>
              </div>
              <div>
                <div className="text-2xl font-bold">Weekly</div>
                <div className="text-sm text-sky-200">Updates</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-3">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={index === 0 ? "default" : "outline"}
                className={index === 0 ? "bg-sky-600 hover:bg-sky-700" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Article */}
      {articles
        .filter((article) => article.featured)
        .map((article, index) => (
          <div key={index} className="container mx-auto px-6 py-12">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <Badge className="bg-red-500 text-white mb-4">Featured</Badge>
                  <Badge variant="outline" className="mb-4 ml-2">
                    {article.category}
                  </Badge>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">{article.title}</h2>
                  <p className="text-gray-600 mb-6">{article.excerpt}</p>

                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <Button className="bg-sky-600 hover:bg-sky-700 flex items-center space-x-2">
                    <span>Read Full Article</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

      {/* Articles Grid */}
      <div className="container mx-auto px-6 pb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Latest Articles</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles
            .filter((article) => !article.featured)
            .map((article, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-sky-600">{article.category}</Badge>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl line-clamp-2">{article.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{article.excerpt}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{article.date}</span>
                      <Button variant="outline" size="sm" className="flex items-center space-x-1 bg-transparent">
                        <span>Read More</span>
                        <ArrowRight className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-sky-50 py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center mb-4">
            <TrendingUp className="w-12 h-12 text-sky-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Stay Informed</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get the latest travel insights, cultural tips, and destination guides delivered to your inbox.
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
