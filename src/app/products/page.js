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
import { TbShoppingBag } from "react-icons/tb";
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
  const [ visibleCart, setCartVisible] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState();


  const toggleCart = () => {
    setCartVisible(!visibleCart);
  }



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
  <header className="px-4 py-2 flex">
    <h1 className="text-3xl">Products</h1>
    <button
            onClick={toggleCart}
            className="relative flex items-center justify-center w-10 h-10 bg-indigo-700 text-white rounded-full"
          >
            <TbShoppingBag />
            {cart.length > 0 && (
              <span className="absolute w-5 h-5 -top-2 -right-2 bg-indigo-500 text-white text-sm rounded-full  flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
  </header>
  <section className="max-w-md mx-auto m-5 px-4">
    <motion.div className="flex items-center">
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
        value={search}
        onChange={handleSearch}
        type="text"
        id="productSearch"
        placeholder="Search for a product..."
        className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        aria-label="Search products"
      />
    </motion.div>
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
                setSelectedCategory(cat.tag === selectedCategory ? "" : cat.tag)
              }
              checked={selectedCategory === c.tag}
            />
          ))}
        </ul>
      </nav>
    )}
  </section>
  <section>
  {visibleCart && (
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={toggleCart}
          ></div>
          <motion.div 
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}

          className="fixed top-0 right-0 w-full max-w-sm h-full bg-white dark:bg-gray-800 shadow-lg">
            <ShoppingCart cart={cart} removeFromCart={removeFromCart} />
          </motion.div>
        </div>
      )}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredWithSearch(data).map((item) => (
        <Card key={item.id} data={item} onAddToCart={addToCart} />
      ))}
    </div>
  </section>
</main>

  );
};

export default Products;
