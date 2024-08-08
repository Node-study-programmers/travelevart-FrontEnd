import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className="flex space-x-1">
      {Array.from({ length: fullStars }, (_, index) => (
        <FaStar key={`full-${index}`} className="text-2xl text-yellow-300" />
      ))}
      {halfStar === 1 && <FaStarHalfAlt className="text-2xl text-yellow-300" />}
      {Array.from({ length: emptyStars }, (_, index) => (
        <FaRegStar
          key={`empty-${index}`}
          className="text-2xl text-yellow-300"
        />
      ))}
    </div>
  );
}
