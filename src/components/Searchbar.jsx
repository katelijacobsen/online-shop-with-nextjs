"use client";
import { useEffect, useState } from "react";
import { LuFilter } from "react-icons/lu";
import CategoryItem from "./CategoryItem";
import { IoMdPhonePortrait } from "react-icons/io";
import { FaTabletAlt } from "react-icons/fa";
import { LiaLaptopSolid } from "react-icons/lia";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "@/app/categories";
import Image from "next/image";
import { productURL } from "@/app/helpers/productURL";
import Link from "next/link";

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [searching, setSearching] = useState(false);
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productResults, setProductResults] = useState([]);

  useEffect(() => {
    const fetchProductsByCategory = async (tag) => {
      const res = await fetch(
        `https://dummyjson.com/products/category/${tag}?limit=0`
      );
      const data = await res.json();
      return data.products;
    };
    //============================================================//
    //
    // Den del har jeg fået hjælp til at kunne få en mere niche
    // kategori.
    //============================================================//

    const fetchAllProducts = async () => {
      let promises = [];
      categories.forEach((c) => {
        promises.push(fetchProductsByCategory(c.tag));
      });
      Promise.all(promises).then((results) => {
        let allProducts = [];
        results.map((products) => {
          products.forEach((p) => {
            allProducts.push(p);
          });
        });

        let unique = [];
        allProducts.forEach((p) => {
          if (unique.findIndex((x) => x.id === p.id) === -1) {
            unique.push(p);
          }
        });

        setData(unique);
      });
    };
    fetchAllProducts();
  }, []);

  useEffect(() => {
    setProductResults(filteredToQuery(data));
  }, [query]);

  const filteredToQuery = (data) => {
    if (query === "") {
      return data;
    }

    return data.filter((p) => {
      let include = false;
      if (p.title.toLowerCase().includes(query.toLocaleLowerCase()))
        include = true;
      else if (p.description.toLowerCase().includes(query.toLocaleLowerCase()))
        include = true;
      else if (p.category.toLowerCase().includes(query.toLocaleLowerCase()))
        include = true;
      else if (p.brand.toLowerCase().includes(query.toLocaleLowerCase()))
        include = true;
      return include;
    });
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <section className="w-full relative mx-auto m-5 px-14">
      <motion.div className="flex w-full items-center">
        <button
          id="dropdownBtn"
          type="button"
          className="flex-shrink-0 z-10 inline-flex items-center py-3 px-4 text-xl text-center text-white bg-indigo-700 rounded-l-lg hover:bg-indigo-900 focus:ring-rose-400"
          onClick={toggleDropdown}
          aria-expanded={isDropdownVisible}
          aria-controls="dropdownMenu"
        >
          <LuFilter className="text-md" />
        </button>
        <input
          value={query}
          onFocus={() => setSearching(true)}
          onMouseDown={() => setSearching(true)}
          onBlur={() => setSearching(false)}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          id="productSearch"
          placeholder="Search for a product..."
          className="block p-2.5 w-3/4 z-20 text-sm text-gray-900 bg-gray-100 rounded-r-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          aria-label="Search products"
        />
      </motion.div>
      {searching && (
        <div className="absolute bg-gray-900 rounded-md border border-gray-700 py-2 w-3/4 textg-gray-200 z-20">
          <ul className="flex flex-col max-h-96 overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            {productResults.map((product, i) => {
              return (
                <ProductResult
                  key={i}
                  product={product}
                  setSearching={setSearching}
                />
              );
            })}
          </ul>
        </div>
      )}
      {isDropdownVisible && (
        <nav
          id="dropdownMenu"
          className="z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        >
          <ul>
            {categories.map((c) => (
              <CategoryItem
                key={c.tag}
                category={c}
                onSelect={(cat) =>
                  setSelectedCategory(
                    cat.tag === selectedCategory ? "" : cat.tag
                  )
                }
                checked={selectedCategory === c.tag}
              />
            ))}
          </ul>
        </nav>
      )}
    </section>
  );
};

const ProductResult = ({ product, setSearching }) => {
  const handleMouseDown = (e) => {
    e.preventDefault();

    setTimeout(() => {
      setSearching(false);
    }, 100);
  };
  return (
    <Link
      href={`/products/${productURL(product)}`}
      onMouseDown={handleMouseDown}
    >
      <li className="flex items-center py-2 border-b border-gray-700 hover:bg-gray-800">
        <Image
          src={product.images[0]}
          alt="g"
          width={500}
          height={500}
          className="w-24 h-24 object-contain aspect-square"
        />
        <div className="flex flex-col">
          <p className="font-bold">{product.title}</p>
          <p>${product.price}</p>
        </div>
      </li>
    </Link>
  );
};

export default Searchbar;
