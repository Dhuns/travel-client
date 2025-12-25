"use client";

import {
  checkWishlist,
  toggleWishlist,
  ToggleWishlistData,
} from "@/src/shared/apis/wishlist";
import { useAuthStore } from "@/src/shared/store/authStore";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface FavoriteButtonProps {
  tourId: string; // bokunExperienceId
  tourData?: {
    id?: string;
    title: string;
    image?: string;
    description?: string;
    price?: string;
    duration?: string;
    location?: string;
    bokunExperienceId?: string;
  };
  className?: string;
  onAuthRequired?: () => void;
}

export function FavoriteButton({
  tourId,
  tourData,
  className = "",
  onAuthRequired,
}: FavoriteButtonProps) {
  const router = useRouter();
  const { isAuthenticated, accessToken } = useAuthStore();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if item is in wishlist on mount (only if authenticated)
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!isAuthenticated || !accessToken) {
        setIsFavorite(false);
        return;
      }

      try {
        const result = await checkWishlist(accessToken, tourId);
        setIsFavorite(result.isWishlisted);
      } catch (error) {
        console.error("Error checking wishlist status:", error);
        setIsFavorite(false);
      }
    };

    checkFavoriteStatus();
  }, [tourId, isAuthenticated, accessToken]);

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if user is logged in
    if (!isAuthenticated || !accessToken) {
      if (onAuthRequired) {
        onAuthRequired();
      } else {
        // Default: redirect to login
        router.push("/login");
      }
      return;
    }

    if (isLoading) return;

    // Optimistic UI update
    const previousState = isFavorite;
    setIsFavorite(!isFavorite);
    setIsLoading(true);

    try {
      const data: ToggleWishlistData = {
        bokunExperienceId: tourId,
        title: tourData?.title || "Unknown Tour",
        image: tourData?.image,
        description: tourData?.description,
        price: tourData?.price,
        duration: tourData?.duration,
        location: tourData?.location,
      };

      const result = await toggleWishlist(accessToken, data);
      setIsFavorite(result.isWishlisted);
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      // Rollback on error
      setIsFavorite(previousState);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={isLoading}
      className={`p-2 rounded-full cursor-pointer bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200 ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        className={`w-5 h-5 transition-all duration-200 ${
          isFavorite ? "fill-red-500 text-red-500" : "text-gray-600 hover:text-red-500"
        }`}
      />
    </button>
  );
}
