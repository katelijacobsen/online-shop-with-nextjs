"use client";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Cart from "@/app/store/Cart";
import { TbShoppingBag } from "react-icons/tb";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, toggleVisible } = Cart();

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="relative flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-900">
      <div className="md:hidden absolute right-4">
        <button onClick={toggleMenu} className="text-gray-900 dark:text-white">
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <nav
        className={`w-full md:flex md:items-center ${
          isMobileMenuOpen ? "block" : "hidden"
        } md:block`}
      >
        <ul className="flex flex-row md:flex-row gap-4 m-2 md:gap-6">
          <li>
            <Link
              href="/"
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              Products
            </Link>
          </li>
          <li>
            <button
              onClick={toggleVisible}
              className="relative flex items-center justify-center w-10 h-10 bg-indigo-700 text-white rounded-full"
            >
              <TbShoppingBag />
              {cart.length > 0 && (
                <span className="absolute w-5 h-5 -top-2 -right-2 bg-indigo-500 text-white text-sm rounded-full  flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
