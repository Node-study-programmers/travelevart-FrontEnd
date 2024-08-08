import React, { useState } from "react";

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

export default function StarInput({ rating, onRatingChange }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleMouseEnter = (index: number) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index: number) => {
    onRatingChange(index);
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(star)}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 cursor-pointer ${star <= (hoverRating || rating) ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-6.36-.55L12 2 8.36 8.69 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}
