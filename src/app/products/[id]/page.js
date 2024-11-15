"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import Image from "next/image";

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
  }, []);

  if (!product) return <h3>Loading...</h3>;

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <Link
          href="/products"
          className="flex items-center text-xl bg-indigo-500 rounded-full px-4 border-indigo-600 border gap-2 text-white py-2 hover:bg-indigo-700"
        >
          <FaArrowLeft />
          Back
        </Link>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <Image src={product.images[0]} alt="Product" width={100} height={100} />
        <div>
          <h2>Reviews</h2>
          <p>{product.reviews.map(r => { 
            return (
            <div>
              {r.reviewerName}
            </div>
            
          )
          })}</p>
        </div>
      
      </div>
    </>
  );
};

export default SingleProduct;
