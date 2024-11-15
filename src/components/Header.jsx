'use client';
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        className={`w-full md:flex md:items-center ${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}
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
        </ul>
      </nav>
    </header>
  );
};

export default Header;
