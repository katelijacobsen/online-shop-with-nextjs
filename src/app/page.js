"use client";
import Image from "next/image";
import PrimaryBtn from "@/components/PrimaryBtn";
import { motion, useInView } from "framer-motion";
import { useEffect, useState } from "react";
import * as React from "react";
import Link from "next/link";
import ThreeScene from "@/components/Galaxy";


export default function Home() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <main className="bg-gray-200 dark:bg-gray-900 flex min-h-screen flex-col items-center justify-center px-12 relative">
      <ThreeScene className="w-full h-screen absolute top-0 left-0 z-0" />
      <div className="absolute justify-center items-center flex flex-col">

      <motion.h1
        ref={ref}
        initial={{ filter: "blur(20px)", opacity: 0 }}
        animate={isInView ? { filter: "blur(0px)", opacity: 1 } : {}}
        transition={{ duration: 1.2 }}
        className="text-6xl font-bold dark:text-white my-6 z-10"
        >
        NextWave Electronics
      </motion.h1>
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, stiffness: 200, damping: 20, type: "spring" }}
        >
        <Link href="/products">
          <PrimaryBtn />
        </Link>
      </motion.div>
        </div>
    </main>
  );
}
