"use client";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdFoodBank } from "react-icons/md";
import { MdPets } from "react-icons/md";
import { GiLipstick } from "react-icons/gi";
import { MdOutlineChair } from "react-icons/md";
import { LuFilter } from "react-icons/lu";
import Card from "@/components/Card";

const Products = () => {
  //Fetch Data
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      const res = await fetch('https://dummyjson.com/products');
      const data = await res.json();
      console.log(data);
      setData(data.products);
    };
    fetchAllProducts();
  }, []);

  //Search after Product
  const [search, setSearch] = useState("");
  //funtion for the search input
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  //Use for the hook down as next step:
  useEffect(() => {
    const fetchSearchProducts = async () => {
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${search}`
      );
      const data = await res.json();
      setData(data.products);
    };
    fetchSearchProducts();
  }, [search]);

  //Toggle Button
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <>
      <h1 className="px-4 py-2 text-3xl">Products</h1>
      <div className="max-w-md mx-auto m-5 px-4">
        <div className="flex items-center">
          <label htmlFor="productSearch" className="sr-only">
            Search
          </label>
          <button
            id="dropdownBtn"
            type="button"
            className="flex-shrink-0 z-10 inline-flex items-center py-[11] px-4 text-xl text-center text-white border-cyan-500 bg-indigo-500 rounded-s-lg hover:bg-indigo-900 focus:ring-rose-400 dark:bg-indigo-700 dark:focus:ring-rose-700 dark:text-gray-200 dark:border-cyan-800"
            onClick={toggleDropdown}
          >
            <LuFilter className="text-xl" />
          </button>
          <div className="relative w-full">
            <input
              value={search}
              onChange={handleSearch}
              type="text"
              id="productSearch"
              placeholder="Search for a product..."
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            />
          </div>
        </div>
        {isDropdownVisible && (
          <div className="z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul>
              <li className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:rounded-lg py-1 px-2">
                <button className="inline-flex items-center text-md">
                  <MdFoodBank className="m-2" />
                  Food
                </button>
              </li>
              <li className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white py-1 px-2">
                <button className="inline-flex items-center text-md">
                  <GiLipstick className="m-2" />
                  Make Up
                </button>
              </li>
              <li className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white py-1 px-2">
                <button className="inline-flex items-center text-md">
                  <MdPets className="m-2" />
                  For Pets
                </button>
              </li>
              <li className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:rounded-lg py-1 px-2">
                <button className="inline-flex items-center text-md">
                  <MdOutlineChair className="m-2" />
                  Interior
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((item, index) => (
          <Card key={index} data={item} />
        ))}
      </div>
    </>
  );
};

export default Products;
