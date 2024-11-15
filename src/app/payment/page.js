'use client';
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Payment = () => {
  const searchParams = useSearchParams();
  const params = searchParams.get('items');
  const itemIds = params.split(',');
  console.log(itemIds);
  
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItem = async (id) => {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const item = await res.json();
      return item;
    };

    Promise.all(itemIds.map(id => fetchItem(id))).then(values => {
      setItems(values);
    });
  }, []);

  //========//
  //  Total
  //========//
  const totalSum = items.reduce((sum, item) => sum + parseInt(item.price), 0);

  return (
    <>
      <h1 className="text-2xl font-semibold text-center my-4">You're almost there!</h1>
      
      <ul className="flex flex-col items-center justify-start px-6 py-4 space-y-4">
        {items.map((item, i) => (
          <li key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full items-center">
            <div className="col-span-2 flex items-center gap-4">
              <div className="w-100 h-100 bg-white p-2 rounded-md shadow-md">
                <Image
                  src={item.images[0]}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-900">{item.title}</h3>
              </div>
            </div>
            <div className="ml-auto flex items-center justify-end">
              <h4 className="text-base font-bold text-gray-900">${item.price}</h4>
            </div>
          </li>
        ))}
      </ul>
      
      <div className="text-center my-6">
        <h2 className="text-xl font-semibold text-gray-900">Your total: ${totalSum}</h2>
        <button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-full text-lg hover:bg-indigo-700">
          Pay
        </button>
      </div>
    </>
  );
}

export default Payment;
