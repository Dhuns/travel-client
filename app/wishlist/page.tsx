"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  getMyWishlist,
  removeFromWishlist,
  WishlistItem,
} from "@/src/shared/apis/wishlist";
import { useAuthStore } from "@/src/shared/store/authStore";
import { ChevronRight, Clock, Heart, Loader2, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Wishlist Page
 *
 * Displays user's favorite tours with:
 * - Remove from wishlist functionality
 * - Direct booking links
 * - Requires authentication
 */

export default function WishlistPage() {
  const router = useRouter();
  const { isAuthenticated, accessToken } = useAuthStore();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Load wishlist from API on mount
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!isAuthenticated || !accessToken) {
        setIsLoading(false);
        return;
      }

      try {
        const items = await getMyWishlist(accessToken);
        setWishlistItems(items);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, [isAuthenticated, accessToken]);

  const handleRemoveFromWishlist = async (bokunExperienceId: string) => {
    if (!accessToken || removingIds.has(bokunExperienceId)) return;

    // Optimistic UI update
    setRemovingIds((prev) => new Set(prev).add(bokunExperienceId));
    const previousItems = [...wishlistItems];
    setWishlistItems((prev) =>
      prev.filter((item) => item.bokunExperienceId !== bokunExperienceId)
    );

    try {
      await removeFromWishlist(accessToken, bokunExperienceId);
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      // Rollback on error
      setWishlistItems(previousItems);
    } finally {
      setRemovingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(bokunExperienceId);
        return newSet;
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-[#faf9f7] to-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Wishlist</h1>
          <p className="text-gray-600">Save and compare tours you're interested in</p>
        </div>

        {/* Wishlist items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {isLoading ? (
            <div className="col-span-full">
              <Card className="p-12 text-center shadow-lg border border-gray-200 bg-white rounded-xl">
                <Loader2 className="w-12 h-12 text-tumakr-maroon mx-auto mb-4 animate-spin" />
                <p className="text-gray-600">Loading your wishlist...</p>
              </Card>
            </div>
          ) : wishlistItems.length === 0 ? (
            <div className="col-span-full">
              <Card className="p-12 text-center shadow-lg border border-gray-200 bg-white rounded-xl">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Your wishlist is empty
                </h3>
                <p className="text-gray-600 mb-6">
                  Save tours you like and check them out later
                </p>
                <Link href="/tours">
                  <Button className="bg-tumakr-maroon hover:bg-tumakr-maroon/90 text-white">
                    Browse Tours
                  </Button>
                </Link>
              </Card>
            </div>
          ) : (
            wishlistItems.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white rounded-xl group p-0 flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <MapPin className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  {/* Remove button */}
                  <button
                    onClick={() => handleRemoveFromWishlist(item.bokunExperienceId)}
                    className="absolute bottom-3 right-3 transition-all hover:scale-110 group/heart"
                    aria-label="Remove from wishlist"
                  >
                    <Heart className="w-7 h-7 text-[#d1293C] fill-[#d1293C] group-hover/heart:fill-white group-hover/heart:text-[#d1293C] transition-all drop-shadow-md cursor-pointer" />
                  </button>
                </div>

                {/* Card content */}
                <CardContent className="px-6 pt-4 pb-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {item.description}
                    </p>
                  )}

                  {/* Tour details */}
                  <div className="space-y-2 mb-4">
                    {item.location && (
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{item.location}</span>
                      </div>
                    )}
                    {item.duration && (
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{item.duration}</span>
                      </div>
                    )}
                  </div>

                  {/* Price and action */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                    {item.price && (
                      <div className="text-xl font-bold text-gray-900">{item.price}</div>
                    )}
                    <Link href={`/tours/multiday/${item.bokunExperienceId}`}>
                      <Button
                        size="sm"
                        className="bg-tumakr-maroon hover:bg-tumakr-maroon/90 text-white"
                      >
                        View Details
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Help section */}
        {wishlistItems.length > 0 && (
          <Card className="mt-12 bg-gradient-to-r from-tumakr-maroon/5 to-tumakr-sage-green/5 border border-gray-200 shadow-lg rounded-xl">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Found tours you like?
              </h3>
              <p className="text-gray-600 mb-4">
                Book now and start your special journey to Korea
              </p>
              <div className="flex justify-center space-x-4">
                <Link href="/chat">
                  <Button className="border border-tumakr-maroon text-tumakr-maroon bg-white hover:!bg-tumakr-maroon hover:!text-white transition-all shadow-sm cursor-pointer">
                    Chat with AI
                  </Button>
                </Link>
                <Link href="/tours">
                  <Button className="bg-tumakr-maroon hover:bg-tumakr-maroon/90 text-white">
                    Explore More Tours
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
