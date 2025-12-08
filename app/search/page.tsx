"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  searchAll,
  SearchCategory,
  SearchResponse,
  SearchResult,
} from "@shared/apis/search";
import { Clock, Loader2, MapPin, Search as SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

// 카테고리별 설정 (투어 전용)
const categoryConfig = {
  tours: {
    icon: MapPin,
    color: "text-tumakr-maroon",
    bgColor: "bg-tumakr-maroon",
    label: "Tour",
  },
};

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const categoryParam = (searchParams.get("category") as SearchCategory) || "all";

  const [searchResults, setSearchResults] = useState<SearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<SearchCategory>(categoryParam);

  const performSearch = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await searchAll(query, selectedCategory);
      setSearchResults(result);
    } catch (err) {
      setError("Failed to search. Please try again.");
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [query, selectedCategory]);

  useEffect(() => {
    performSearch();
  }, [performSearch]);

  // Update URL when category filter changes
  const handleCategoryFilter = (category: SearchCategory) => {
    setSelectedCategory(category);
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (category !== "all") params.set("category", category);
    router.push(`/search?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 sm:px-6 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {query ? (
              <>
                Search Results for "<span className="text-tumakr-maroon">{query}</span>"
              </>
            ) : (
              "Browse All"
            )}
          </h1>
          {searchResults && (
            <p className="text-gray-600">
              Found {searchResults.total} result{searchResults.total !== 1 ? "s" : ""}
              {searchResults.tours.length > 0 && ` (${searchResults.tours.length} tours)`}
            </p>
          )}
        </div>

        {/* Category Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategoryFilter("all")}
            className={
              selectedCategory === "all"
                ? "bg-tumakr-maroon hover:bg-tumakr-maroon/90 text-white"
                : ""
            }
          >
            All
          </Button>
          <Button
            variant={selectedCategory === "tours" ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategoryFilter("tours")}
            className={
              selectedCategory === "tours"
                ? "bg-tumakr-maroon hover:bg-tumakr-maroon/90 text-white"
                : ""
            }
          >
            <MapPin className="w-4 h-4 mr-1" />
            Tours
          </Button>
        </div>

        {/* Loading State - Skeleton */}
        {isLoading && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg overflow-hidden shadow animate-pulse"
                >
                  <div className="aspect-4/3 bg-gray-200" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-2/3" />
                    <div className="flex justify-between pt-2">
                      <div className="h-3 bg-gray-200 rounded w-16" />
                      <div className="h-4 bg-gray-200 rounded w-20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">{error}</p>
            <Button
              onClick={performSearch}
              className="mt-4 bg-tumakr-maroon hover:bg-tumakr-maroon/90 text-white"
            >
              Try Again
            </Button>
          </div>
        )}

        {/* No Results */}
        {!isLoading && !error && searchResults?.total === 0 && (
          <div className="text-center py-12">
            <SearchIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">
              {query ? `No results found for "${query}"` : "No items available"}
            </p>
            <p className="text-gray-400 mt-2">
              Try different keywords or browse all categories
            </p>
          </div>
        )}

        {/* Results */}
        {!isLoading && !error && searchResults && searchResults.total > 0 && (
          <>
            {/* Tours Section */}
            {searchResults.tours.length > 0 && (
              <section className="mb-10">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-tumakr-maroon" />
                  Tours ({searchResults.tours.length})
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {searchResults.tours.map((item) => (
                    <ResultCard key={item.id} item={item} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Result Card Component
function ResultCard({ item }: { item: SearchResult }) {
  const config = categoryConfig.tours;
  const Icon = config.icon;

  return (
    <Link href={item.link}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group h-full">
        <div className="aspect-4/3 relative overflow-hidden bg-gray-100">
          {item.thumbnailUrl ? (
            <Image
              src={item.thumbnailUrl}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Icon className="w-12 h-12 text-gray-300" />
            </div>
          )}
          <Badge className={`absolute top-3 left-3 ${config.bgColor} text-white`}>
            {config.label}
          </Badge>
          {item.category && (
            <Badge
              variant="secondary"
              className="absolute top-3 right-3 bg-white/90 text-gray-700"
            >
              {item.category}
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-tumakr-maroon transition-colors">
            {item.title}
          </h3>
          {item.description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {item.duration && (
                <span className="flex items-center text-xs text-gray-500">
                  <Clock className="w-3 h-3 mr-1" />
                  {item.duration}
                </span>
              )}
            </div>
            {item.price && (
              <span
                className={`text-sm font-semibold ${
                  item.type === "tour" ? "text-tumakr-maroon" : "text-tumakr-sage-green"
                }`}
              >
                {item.price}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// Main export with Suspense
export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-tumakr-maroon" />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
