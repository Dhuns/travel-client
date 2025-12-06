import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  className?: string;
  fillColor?: string;
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = 24,
  className = "",
  fillColor = "fill-tumakr-maroon",
}: StarRatingProps) {
  const percentage = Math.floor((rating / maxRating) * 100);

  return (
    <div className={`relative inline-flex ${className}`}>
      <div className="flex -space-x-[0.5px]">
        {Array.from({ length: maxRating }).map((_, index) => (
          <Star
            key={`empty-${index}`}
            size={size}
            className="text-gray-300 fill-gray-300"
            strokeWidth={0}
          />
        ))}
      </div>

      <div
        className={`absolute top-0 left-0 flex overflow-hidden -space-x-[0.5px] w-[${percentage}%]`}
        style={{ width: `${percentage}%` }}
      >
        {Array.from({ length: maxRating }).map((_, index) => (
          <Star
            key={`filled-${index}`}
            size={size}
            className={`shrink-0 랴 ${fillColor}`}
            strokeWidth={0}
          />
        ))}
      </div>
    </div>
  );
}
