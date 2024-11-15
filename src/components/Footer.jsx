"use client";

import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="rounded-lg shadow dark:bg-gray-900 text-gray-50"
      style={{
        background: "linear-gradient(90deg, #4e54c8, #8a4eff, #50c9c3, #34a0a4)",
        backgroundSize: "300% 300%",
      }}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://flowbite.com/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              Logo Name
            </span>
          </a>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-200 sm:text-center">
          © 2024{" "}
          <a href="#" className="hover:underline">
            Design by Katja Mähleke. 
          </a>
          All Rights Reserved.
        </span>
      </div>
    </motion.footer>
  );
};

export default Footer;
