"use client";
import Image from "next/image";
import PrimaryBtn from "@/components/PrimaryBtn";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-12">
      <Image src="" width={200} height={200} alt="Picture of the Product" />
      <h1 className="text-6xl font-bold text-white my-6">Lorem Ipsum</h1>
      <PrimaryBtn />
    </main>
  );
}
