import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  className?: string;
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = 24,
  className = "",
}: StarRatingProps) {
  const percentage = (rating / maxRating) * 100;

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
        className="absolute top-0 left-0 flex overflow-hidden -space-x-[0.5px]"
        style={{ width: `${percentage}%` }}
      >
        {Array.from({ length: maxRating }).map((_, index) => (
          <Star
            key={`filled-${index}`}
            size={size}
            className="text-[#00AA6C] fill-[#00AA6C] shrink-0"
            strokeWidth={0}
          />
        ))}
      </div>
    </div>
  );
}
