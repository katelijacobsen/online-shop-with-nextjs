"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { TbShoppingBagPlus } from "react-icons/tb";
import { IoSearch } from "react-icons/io5";
import { MdFoodBank } from "react-icons/md";
import { MdPets } from "react-icons/md";
import { GiLipstick } from "react-icons/gi";
import { MdOutlineChair } from "react-icons/md";
import { LuFilter } from "react-icons/lu";

const Products = () => {
  //Fetch Data
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      setData(data.products);
    };
    fetchAllProducts();
  }, []);

  //Search after Product
  const [search, setSearch] = useState("");
  //funtion for the search input
  //Prevent Default
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  //Use for the hook down as next step:
  useEffect(() => {
    const fetchSearchProducts = async () => {
      const res = await fetch("https://dummyjson.com/products/search?q=phone");
      const search = await res.json();
      setData(search.products);
    };

    if (search) {
      fetchSearchProducts();
    } else fetchSearchProducts();
  }, [search]);




  //Toggle Button
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <>
      <h1 className="px-4 py-2 text-3xl">Products</h1>
      <form className="max-w-md mx-auto m-5 px-4">
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
              placeholder="Search for a product"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            />
            <button
              onClick={() =>
                setSearchQuery(document.getElementById("productSearch").value)
              }
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <IoSearch className="text-xl" />
            </button>
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
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((item, index) => (
          <Card key={index} data={item} />
        ))}
      </div>
    </>
  );
};
const Card = ({ data }) => {
  // Note : Når du skal lave en Image-Komponent så husk at give den en array.
  return (
    <>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4">
        <Link href="#">
          <img className="rounded-t-lg" src={data.images[0]} alt="g" />
        </Link>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {data.title}
            </h5>
          </a>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {data.description}
          </p>
          <Link
            href="#"
            className="inline-flex items-center bg-gradient-to-br from-green-400 to-green-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <TbShoppingBagPlus className="mr-2 text-xl" />
            Add to Cart
          </Link>
        </div>
      </div>
    </>
  );
};

export default Products;
