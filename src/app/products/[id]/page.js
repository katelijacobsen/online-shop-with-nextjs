'use client';
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import Image from "next/image";
import Review from "@/components/Review";

const SingleProduct = () => {
  const { id } = useParams();
  console.log(id);

  const [product, setProduct] = useState(null);

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

  if (!product) return <h3>Loading...</h3>;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex justify-center col-span-1 sm:col-span-1 lg:col-span-1 p-5">
          {product.images && product.images[0] && (
            <Image
              src={product.images[0]}
              alt="Product"
              width={400}
              height={400}
              className="object-contain"
            />
          )}
        </div>

        <div className="bg-gray-100 col-span-1 sm:col-span-1 lg:col-span-2 px-4 py-6">
          <Link
            href="/products"
            className="my-4 self-start max-w-xs inline-flex items-center text-lg bg-indigo-500 rounded-full px-4 py-2 text-white hover:bg-indigo-700"
          >
            <FaArrowLeft />
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
