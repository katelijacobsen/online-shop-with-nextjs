"use client";
import { TbShoppingBagPlus } from "react-icons/tb";
import Image from "next/image";
import Link from "next/link";

const Card = ({ data, onAddToCart }) => {
  // Note : Når du skal lave en Image-Komponent så husk at give den en array.

  return (
    <>
      <div className="max-w-sm border border-gray-200 bg-gray-100 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4">
        <Link href={`/products/${data.id}`} className="flex justify-end px-4 pt-4">
          <Image
            src={
              data.thumbnail.length > 0
                ? data.images[0]
                : "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png"
            }
            alt="g"
            width={500}
            height={500}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-30 h-36 object-contain "
          />
        </Link>
        <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {data.title}
            </h5>
            <p>${data.price}</p>
          <button
            onClick={() => onAddToCart(data)}
            className="flex text-gray-200 bg-green-600 border border-green-400 focus:outline-none hover:bg-green-500 focus:ring-4 focus:ring-green-100 font-bold rounded-full text-sm px-5 py-2.5 me-2 mb-2"
          >
            <TbShoppingBagPlus className=" text-2xl" />
            
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
