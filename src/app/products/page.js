"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { TbShoppingBagPlus } from "react-icons/tb";
import Card from "@/components/Card";

const Products = () => {
  const [data, setData] = useState([null]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://dummyjson.com/recipes');
      const data = await res.json();
      setData(data);
    };
    fetchData();
  }, []);

  console.log(data);
  return (
    <>
    <Card/>
    </>
  );
};

export default Products;
