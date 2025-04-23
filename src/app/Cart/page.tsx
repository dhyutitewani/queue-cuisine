"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface CartItem {
  title: string;
  price: string;
  imgSrc: string;
  restaurant: string;
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  const getPriceValue = (price: string): number =>
    parseInt(price.replace(/[^\d]/g, ""), 10);

  const fetchCart = async () => {
    const res = await fetch("/api/cart-func/get-cart");
    const data = await res.json();
    setItems(data.items);
    setTotal(
      data.items.reduce(
        (sum: number, item: CartItem) => sum + getPriceValue(item.price),
        0
      )
    );
  };

  const handleDelete = async (itemToDelete: CartItem) => {
    await fetch("/api/cart-func/delete-from-cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(itemToDelete),
    });
    fetchCart(); // Refresh after deletion
  };

  const handleCheckout = () => {
    // Pass the total to the checkout page
    router.push(`/checkout?total=${total}`);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="bg-slate-100 min-h-screen p-10">
      <h1 className="text-[2rem] mb-6 font-semibold">Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-lg">No items in the cart yet.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 border p-4 rounded-lg bg-white shadow"
              >
                <img
                  src={item.imgSrc}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.restaurant}</p>
                  <p className="text-md font-medium mt-1">{item.price}</p>
                  <button
                    className="mt-2 text-sm text-red-600 underline"
                    onClick={() => handleDelete(item)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex-grow"></div>

            <div className="flex justify-between items-center px-4 pb-4">
              <div className="text-lg font-semibold text-gray-700">
                Total:
                <span className="text-xl mt-10 font-bold text-black-600"> ₹{total}</span>
              </div>

              <div className="mt-4 sm:w-auto">
                <button
                  onClick={handleCheckout}
                  className="px-7 py-3 border-2 border-red-500 text-red-500 rounded-lg shadow-lg hover:bg-red-500 hover:text-white transition duration-300 ease-in-out"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
