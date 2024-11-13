"use client";
import Link from "next/link";
import { TbShoppingBagPlus } from "react-icons/tb";
import Image from "next/image";

const Card = ({ data }) => {
  // Note : Når du skal lave en Image-Komponent så husk at give den en array.
  console.log(data.images);

  return (
    <>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4">
        <div className="flex justify-end px-4 pt-4">
          <Image
            src={
              data.images.length > 0
                ? data.images[0]
                : "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png"
            }
            alt="g"
            width={500}
            height={500}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-30 h-36 object-contain bg-white"
          />
        </div>
        <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {data.title}
            </h5>
          <Link
            href="#"
            className="inline-flex items-center bg-gradient-to-br from-green-400 to-green-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <TbShoppingBagPlus className="mr-2 text-xl" />
            Add to Cart
          </Link>
        </div>
      </div>
    </>
  );
};

export default Card;
