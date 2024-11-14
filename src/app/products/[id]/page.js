'use client';
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

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
      <div>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
      </div>
    </>
  );
};

export default SingleProduct;
