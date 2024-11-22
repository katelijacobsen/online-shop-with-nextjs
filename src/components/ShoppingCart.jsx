import Link from "next/link";
import Image from "next/image";
import { IoCartOutline, IoTrashOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa6";

const ShoppingCart = ({ cart, removeFromCart }) => {
  const itemIds = cart.map((item) => item.id);

  return (
    <motion.div
      className="md:max-w-4xl max-md:max-w-xl mx-auto py-4"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-3 dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-4 rounded-md">
          <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-200">
            Cart
          </h2>
          <hr className="border-gray-500 mt-4 mb-8" />
          <ul className="space-y-4 my-5">
            {cart.map((item, index) => (
              <li key={index} className="grid grid-cols-3 items-center gap-4">
                <div className="col-span-2 flex items-center gap-4">
                  <div className="w-24 h-24 bg-white p-2 rounded-md">
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      width={90}
                      height={90}
                      className="w-24 h-24 object-contain"
                    />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-gray-200">
                      {item.title}
                    </h3>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="flex items-center text-xs text-red-500 cursor-pointer mt-0.5"
                    >
                      <IoTrashOutline className="mr-1" /> Remove
                    </button>
                    <div className="max-w-xs mx-auto">
                      <label
                        htmlFor="quantity-input"
                        className="block text-xs text-gray-900 dark:text-white opacity-0"
                      >
                        Quantity
                      </label>
                      <div className="relative flex items-center">
                        <button
                          type="button"
                          id="decrement-button"
                          data-input-counter-decrement="quantity-input"
                          className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-2 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                        >
                          <FaMinus className="text-xs"/>
                        </button>
                        <input
                          type="text"
                          id="quantity-input"
                          data-input-counter
                          aria-describedby="helper-text-explanation"
                          className="bg-gray-50 border-x-0 border-gray-300 h-8 w-8 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="999"
                          required
                        />
                        <button
                          type="button"
                          id="increment-button"
                          data-input-counter-increment="quantity-input"
                          className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-2 h-8  focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                        >
                          <FaPlus className="text-xs"/>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ml-auto">
                  <h4 className="text-base font-bold text-gray-900 dark:text-gray-200">
                    ${item.price}
                  </h4>
                </div>
              </li>
            ))}
          </ul>
          <Link href={`/payment?items=${encodeURIComponent(itemIds)}`}>
            <button
              type="button"
              className="flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-xl px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Checkout <IoCartOutline className="mx-2" />
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ShoppingCart;
