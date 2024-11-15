"use client";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { LuFilter } from "react-icons/lu";
import Card from "@/components/Card";
import CategoryItem from "@/components/CategoryItem";
import { IoMdPhonePortrait } from "react-icons/io";
import { FaTabletAlt } from "react-icons/fa";
import { LiaLaptopSolid } from "react-icons/lia";
import ShoppingCart from "@/components/ShoppingCart";
import { motion, AnimatePresence } from "framer-motion";
//=====================================================//
// Online shop er kategoriseret som elektronik-shop.
// Der blevet sat fokus kun på salg på tre lags enheder.
// Med en liste af objekter kan vi senere
// manipulere DOM fra DummyJSON.
//=====================================================//
const transition = {
  initial: { scaleX: 0, opacity: 0 },
  animate: {
    scaleX: 1,
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 1,
      type: "spring",
      stiffness: 400,
      damping: 20,
    },
  },
  exit: {
    scaleX: 0,
    opacity: 0,
    transition: {
      duration: 0.8, 
      type: "spring",
      stiffness: 400,
      damping: 20,
    },
  },
};

const categories = [
  {
    name: "Smartphones",
    tag: "smartphones",
    icon: <IoMdPhonePortrait />,
  },
  {
    name: "Tablets",
    tag: "tablets",
    icon: <FaTabletAlt />,
  },
  {
    name: "Laptops",
    tag: "laptops",
    icon: <LiaLaptopSolid />,
  },
];
//============================================================//
// Lidt kompliseret DOM-manipulation, bare for en enkelt ting...
// Her laver jeg async til sync med Promise.
//============================================================//

const Products = () => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState();

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  useEffect(() => {
    const _fetchProductsByCategory = async (tag) => {
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
        promises.push(_fetchProductsByCategory(c.tag));
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

    const fetchProductsByCategory = async (tag) => {
      const products = await _fetchProductsByCategory(tag);
      setData(products);
    };

    if (selectedCategory === "") {
      fetchAllProducts();
    } else {
      fetchProductsByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  //funtion for the search input
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  //============================================================//
  // Her gør jeg det UX venlig for søgningen.
  //============================================================//

  const filteredWithSearch = (data) => {
    if (search === "") {
      return data;
    }

    return data.filter((p) => {
      let include = false;
      if (p.title.toLowerCase().includes(search.toLocaleLowerCase()))
        include = true;
      else if (p.description.toLowerCase().includes(search.toLocaleLowerCase()))
        include = true;
      else if (p.category.toLowerCase().includes(search.toLocaleLowerCase()))
        include = true;
      else if (p.brand.toLowerCase().includes(search.toLocaleLowerCase()))
        include = true;
      return include;
    });
  };

  //============================================================//
  // Events
  //============================================================//

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <main className="bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="px-4 py-2 text-3xl">Products</h1>
      <div className="max-w-md mx-auto m-5 px-4">
        <motion.div
          className="flex items-center"
          // initial="initial"
          // animate="animate"
          // exit="exit"
          // variants={transition}
          // style={{ originX: 0.5 }}
        >
          <button
            id="dropdownBtn"
            type="button"
            className="flex-shrink-0 z-10 inline-flex items-center py-3 px-4 text-xl text-center text-white border-cyan-500 bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-s-lg hover:bg-indigo-900 focus:ring-rose-400 dark:bg-indigo-700 dark:focus:ring-rose-700 dark:text-gray-200 dark:border-cyan-800"
            onClick={toggleDropdown}
          >
            <LuFilter className="text-md" />
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
        </motion.div>
        {isDropdownVisible && (
          <div className="z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul>
              {categories.map((c, i) => {
                return (
                  <CategoryItem
                    key={i}
                    category={c}
                    onSelect={(cat) => {
                      if (cat.tag === selectedCategory) {
                        setSelectedCategory("");
                      } else {
                        setSelectedCategory(cat.tag);
                      }
                    }}
                    checked={selectedCategory === c.tag}
                  />
                );
              })}
              {/* <CategoryItem
                category="Tablets"
                value="tablets"
                icon={<FaTabletAlt />}
                onSelect={setSelectedCategory}
              />
              <CategoryItem
                category="Laptops"
                value="laptops"
                icon={<LiaLaptopSolid />}
                onSelect={setSelectedCategory}
              /> */}
              {/* <li className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:rounded-lg py-1 px-2">
                <button className="inline-flex items-center text-md">
                  <MdFoodBank className="m-2" />
                  Smartphones
                </button>
              </li>
              <li className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white py-1 px-2">
                <button className="inline-flex items-center text-md">
                  <GiLipstick className="m-2" />
                  Tablets
                </button>
              </li>
              <li className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:rounded-lg py-1 px-2">
                <button className="inline-flex items-center text-md">
                  <MdOutlineChair className="m-2" />
                  Laptops
                </button>
              </li> */}
            </ul>
          </div>
        )}
        <ShoppingCart cart={cart} removeFromCart={removeFromCart} />
      </div>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWithSearch(data).map((item, index) => (
            <Card key={index} data={item} onAddToCart={addToCart} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Products;
