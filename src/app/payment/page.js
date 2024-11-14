'use client';
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { IoTrashOutline } from "react-icons/io5";

const Payment = () => {
    const searchParams = useSearchParams();
    const itemsParam = searchParams.get('items');


    //========//
    //  Array
    //========//
    const items = itemsParam ? itemsParam.split(',').map(item => {
        const [title, price, thumbnail] = item.split('-');
        return {title, price, thumbnail};
    }) : [];
    //========//
    //  Total
    //========//
    const totalSum = items.reduce((sum, item) => sum + parseInt(item.price), 0);

    return ( <>
        <h1>You're almost there!</h1>
        <ul className="flex min-h-screen flex-col items-center justify-center px-12">
            {items.map((item, i) => (
                <li key={i} className="grid grid-cols-3 items-center gap-4">
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
                    <h3 className="text-base font-bold text-gray-200">
                      {item.title}
                    </h3>
                    <button
                      className="flex text-xs text-red-500 cursor-pointer mt-0.5"
                    >
                      <IoTrashOutline className="mr-1"/> Remove
                    </button>
                  </div>
                </div>
                <div className="ml-auto">
                  <h4 className="text-base font-bold text-gray-200">
                    ${item.price}
                  </h4>
                </div>
              </li>
            ))}
        </ul>
        <h2>Your total: ${totalSum}</h2>
        <button> Pay </button>
    </> );
}
 
export default Payment;