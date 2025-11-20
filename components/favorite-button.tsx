"use client";

import { Heart } from "lucide-react";
import { useState } from "react";

interface FavoriteButtonProps {
  tourId: string;
  className?: string;
}

export function FavoriteButton({ tourId, className = "" }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);

    // TODO: 나중에 실제 저장 로직 추가 (localStorage, API 등)
    if (!isFavorite) {
      console.log(`Added to favorites: ${tourId}`);
    } else {
      console.log(`Removed from favorites: ${tourId}`);
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
