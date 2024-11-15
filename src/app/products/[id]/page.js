"use client";
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
      <div className="grid grid-cols-3 grid-rows-auto grid-flow-col ">
        <div className="row-span-2 gap-4 col-start-1 place-self-center  p-5">
          {product.images && product.images[0] && (
            <Image
              src={product.images[0]}
              alt="Product"
              width={500}
              height={500}
            />
          )}
        </div>
        <div className="bg-gray-100 col-start-2 row-span-2 col-span-3 px-24 py-20">
          <Link
            href="/products"
            className="my-8 self-start max-w-xs inline-flex items-center text-xl bg-indigo-500 rounded-full px-4 border-indigo-600 border gap-2 text-white py-2 hover:bg-indigo-700"
          >
            <FaArrowLeft />
            Back
          </Link>
          <div className="flex flex-col items-left gap-4">
            <h1 className="font-bold text-3xl ">{product.title}</h1>
            <p className="font-md text-xl ">Price: ${product.price}</p>
            <p>{product.description}</p>
          </div>
        </div>

          <h2 className="text-3xl font-bold my-5 mx-8">Reviews</h2>
        <div className="inline-flex row-start-4 col-start-1 col-span-4 place-self-center mb-80">
          <div className="inline-flex row-start-3">
          {product.reviews?.map((r, i) => (
            <Review key={i} review={r}/>
          ))}
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default SingleProduct;
