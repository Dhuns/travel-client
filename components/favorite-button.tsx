"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { wishlistUtils, WishlistTour } from "@/lib/wishlist";

interface FavoriteButtonProps {
  tourId: string;
  tourData?: Omit<WishlistTour, "addedDate">;
  className?: string;
}

export function FavoriteButton({
  tourId,
  tourData,
  className = "",
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if item is in wishlist on mount
  useEffect(() => {
    setIsFavorite(wishlistUtils.isInWishlist(tourId));
  }, [tourId]);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isFavorite) {
      // Add to wishlist
      if (tourData) {
        const success = wishlistUtils.addToWishlist({
          ...tourData,
          id: tourId,
        });
        if (success) {
          setIsFavorite(true);
        }
      }
    } else {
      // Remove from wishlist
      const success = wishlistUtils.removeFromWishlist(tourId);
      if (success) {
        setIsFavorite(false);
      }
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className={`p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200 ${className}`}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        className={`w-5 h-5 transition-all duration-200 ${
          isFavorite
            ? "fill-red-500 text-red-500"
            : "text-gray-600 hover:text-red-500"
        }`}
      />
    </button>
  );
}
