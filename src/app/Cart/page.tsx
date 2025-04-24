'use client';

import React, { useEffect, useState } from 'react';

interface CartItem {
  title: string;
  price: string;
  imgSrc: string;
  restaurant: string;
}

const CartPage = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  const getPriceValue = (price: string): number => {
    if (!price) return 0;
    return parseInt(price.replace(/[^\d]/g, ''), 10);
  };

  const fetchCart = async () => {
    try {
      const res = await fetch('/api/cart-func/get-cart');
      const data = await res.json();
      console.log('Fetched cart data:', data);

      const filteredItems = (data.items || []).filter(Boolean);

      setItems(filteredItems);
      setTotal(
        filteredItems.reduce((sum: number, item: CartItem) => {
          return sum + getPriceValue(item.price);
        }, 0)
      );
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  };

  const handleCheckout = () => {
    window.open(`/checkout?total=${total}`, '_self');
    console.log('Checkout clicked');
  };

  const handleDelete = async (itemToDelete: CartItem) => {
    await fetch("/api/cart-func/delete-from-cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: itemToDelete.title,
      }),
    });
    fetchCart(); // Refresh after deletion
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {items.length === 0 ? (
        <p className="text-lg">No items in the cart yet.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {items.map((item, index) => (
              <li key={index} className="border p-4 rounded shadow">
                <div className="flex items-center space-x-4">
                  <img src={item.imgSrc} alt={item.title} className="w-20 h-20 object-cover" />
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
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center px-4 pb-4 mt-6">
            <div className="text-lg font-semibold text-gray-700">
              Total:
              <span className="text-xl ml-2 font-bold text-black-600">₹{total}</span>
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
        </>
      )}
    </div>
  );
};

export default CartPage;
