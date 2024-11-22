"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Image from "next/image";
import Review from "@/components/Review";
import { motion } from "framer-motion";

const SingleProduct = () => {
  // === Manipulate URL-Parameter === //
  const { id: path } = useParams();
  const [id] = useState(path.split("-").slice(-1)[0]);
  const [title] = useState(path.split("-").slice(0, -1).join("-"));

  // =================================================================== //
  // Derefter manipulere vi inde i vores Link Komponent i Card.jsx
  // =================================================================== //

  console.log({ id, title });

  const [product, setProduct] = useState(null);
  const [currentImg, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  // =================================================================== //
  // Carousel
  // =================================================================== //

  const nextImg = () => {
    setCurrentIndex((previvousImg) =>
      previvousImg === product.images.length - 1 ? 0 : previvousImg + 1
    );
  };
  const previousImg = () => {
    setCurrentIndex((previvousImg) =>
      previvousImg === 0 ? product.images.length - 1 : previvousImg - 1
    );
  };

  if (!product) return <h3>Loading...</h3>;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex justify-center col-span-1 sm:col-span-1 lg:col-span-1 p-5 relative">
          {product.images && (
            <motion.div
              className="w-[400px] h-[400px] overflow-hidden relative"
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <motion.div
                //Enable dragging for this element. Set to false by default.
                //Set true to drag in both directions. Set "x" or "y" to only drag in a specific direction.
                drag="x"
                dragConstraints={{ left: -400, right: 400 }}
                onDragEnd={(img) => {
                  if (img.offset.x < -100) handleNext();
                  if (img.offset.x > 100) handlePrev();
                }}
              >
                <Image
                  src={product.images[currentImg]}
                  alt="Product"
                  width={400}
                  height={400}
                  className="object-contain border border-gray-700 bg-gradient-to-r from-gray-700 to-gray-800 rounded-md aspect-square"
                />
              </motion.div>
            </motion.div>
          )}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-indigo-500 hover:bg-indigo-700 text-white p-2 rounded-full"
            onClick={previousImg}
          >
            <FaArrowLeft />
          </button>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-indigo-500 hover:bg-indigo-700 text-white p-2 rounded-full"
            onClick={nextImg}
          >
            <FaArrowRight />
          </button>
        </div>

        <div className="block overflow-hidden dark:bg-gray-900 bg-gray-100 col-span-1 sm:col-span-1 lg:col-span-2 px-4 py-6">
          
            <Link
              href="/products"
              className="my-4 self-start max-w-xs inline-flex items-center text-lg bg-indigo-500 rounded-full px-4 py-2 text-white hover:bg-indigo-700"
            >
              <FaArrowLeft className="mr-2 flex-shrink-0" />
              Back
            </Link>
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-2xl sm:text-3xl">{product.title}</h1>
            <p className="text-xl font-medium">Price: ${product.price}</p>
            <p className="text-base">{product.description}</p>
          </div>
        </div>

        <div className="col-span-1 sm:col-span-2 lg:col-span-3 px-4 py-6">
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          <div className="flex flex-wrap gap-4">
            {product.reviews?.map((r, i) => (
              <Review key={i} review={r} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
