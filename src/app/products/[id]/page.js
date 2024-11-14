'use client';
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
    };

    if (id) fetchProduct();
  }, [id]);

  if (!product) return <h3>Loading...</h3>;

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <Link href="/products" className="flex items-center text-xl bg-indigo-500 rounded-full px-4 border-indigo-600 border gap-2 text-white py-2 hover:bg-indigo-700"><FaArrowLeft />Back</Link>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
      </div>
    </>
  );
};

export default SingleProduct;
