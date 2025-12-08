"use client";

import { TourCard } from "@/components/tours/tour-card";
import { Button } from "@/components/ui/button";
import { searchAll, SearchCategory, SearchResponse } from "@shared/apis/search";
import { Loader2, MapPin, Search as SearchIcon } from "lucide-react";
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
                    <TourCard
                      key={item.id}
                      tour={{
                        bokunExperienceId: String(item.id),
                        title: item.title,
                        image: item.thumbnailUrl || "/placeholder.svg",
                        description: item.description,
                        price: item.price || undefined,
                        duration: item.duration,
                      }}
                      href={item.link}
                      categoryBadge={item.category}
                      themeColor="tumakr-maroon"
                    />
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
