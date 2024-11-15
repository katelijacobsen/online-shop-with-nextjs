import React from "react";
import { FaStar, FaStarHalfStroke, FaRegStar } from "react-icons/fa6";

// snippet: rafce

const Review = ({ review }) => {
  const stars = Math.floor(review.rating);
  const hasHalfStar = review.rating % 1 !== 0;
  const emptyStars = 5 - stars - (hasHalfStar ? 1 : 0);



  return (
    <div class="max-w-screen-md mx-8">
      <div className="flex">

      {[...Array(stars)].map((i) => (
        <FaStar key={i} className="text-yellow-400" />
      ))}
         {hasHalfStar && <FaStarHalfStroke className="text-yellow-400" />}
        
        {[...Array(emptyStars)].map((i) => (
          <FaRegStar key={i} className="text-yellow-400" />
        ))}
        </div>
      <blockquote>
        <p class="text-md font-semibold text-gray-900 dark:text-white">
          {review.comment}
        </p>
      </blockquote>
      <figcaption class="flex items-center mt-2 space-x-3 rtl:space-x-reverse">
        <div class="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-300 dark:divide-gray-700">
          <cite class="pe-3 text-gray-900 dark:text-white">
            {review.reviewerName}
          </cite>
        </div>
      </figcaption>
    </div>
  );
};

export default Review;
