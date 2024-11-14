import Link from "next/link";
import Image from "next/image";
import { IoCartOutline, IoTrashOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
const ShoppingCart = ({ cart, removeFromCart }) => {
        const items = cart.map(item => `${item.title}-${item.price}`).join(','); 
    
  return (
    <div className="md:max-w-4xl max-md:max-w-xl mx-auto py-4">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-4 rounded-md">
          <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-200">Cart</h2>
          <hr className="border-gray-500 mt-4 mb-8" />
          <ul className="space-y-4 my-5">
            {cart.map((item, index) => (
              <li key={index} className="grid grid-cols-3 items-center gap-4">
                <div className="col-span-2 flex items-center gap-4">
                  <div className="w-24 h-24 bg-white p-2 rounded-md">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      width={100}
                      height={100}
                      className="object-contain"
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
                      <IoTrashOutline className="mr-1"/> Remove
                    </button>
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
          <Link href={`/payment?items=${encodeURIComponent(items)}`}>
              <button
                type="button"
                className="flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-xl px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Checkout <IoCartOutline className="mx-2" />
              </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
