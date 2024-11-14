"use client";
import Image from "next/image";
import PrimaryBtn from "@/components/PrimaryBtn";
import { motion, useInView } from "framer-motion";
import { useEffect, useState } from "react";
import * as React from "react";
import Link from "next/link";

export default function Home() {
  const [data, setData] = useState([null]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("dummyjson.com/image");
      const data = await res.json();
      setData(data);
    };
    fetchData();
  }, []);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <main className="bg-gray-200 dark:bg-gray-900 flex min-h-screen flex-col items-center justify-center px-12">
      {/* {data.length > 0 && (
        <Image
          src="https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png" 
          width={200}
          height={200}
          alt="Picture of the Product"
        />
      )} */}
      <motion.h1
        ref={ref}
        initial={{ filter: "blur(20px)", opacity: 0 }}
        animate={isInView ? { filter: "blur(0px)", opacity: 1 } : {}}
        transition={{ duration: 1.2 }}
        className="text-6xl font-bold dark:text-white my-6"
      >
        Lorem Ipsum
      </motion.h1>
      <Link href="/products">
        <PrimaryBtn />
      </Link>
    </main>
  );
}
