import React from "react";
import { FaStar, FaStarHalfStroke, FaRegStar } from "react-icons/fa6";

// snippet: rafce

const Review = ({ review }) => {
  const stars = Math.floor(review.rating);
  const hasHalfStar = review.rating % 1 !== 0;
  const emptyStars = 5 - stars - (hasHalfStar ? 1 : 0);



  return (
    <div className="max-w-screen-md mx-8">
      <div className="flex">

      {[...Array(stars)].map((i) => (
        <FaStar key={i} className="text-yellow-400" />
      ))}
         {hasHalfStar && <FaStarHalfStroke className="text-yellow-400" />}
        
        {[...Array(emptyStars)].map((index) => (
          <FaRegStar key={index} className="text-yellow-400" />
        ))}
        </div>
      <blockquote>
        <p className="text-md font-semibold text-gray-900 dark:text-white">
          {review.comment}
        </p>
      </blockquote>
      <figcaption className="flex items-center mt-2 space-x-3 rtl:space-x-reverse">
        <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-300 dark:divide-gray-700">
          <cite className="pe-3 text-gray-900 dark:text-white">
            {review.reviewerName}
          </cite>
        </div>
      </figcaption>
    </div>
  );
};

export default Review;
