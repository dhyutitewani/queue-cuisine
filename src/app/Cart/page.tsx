import { promises as fs } from "fs";
import path from "path";

interface CartItem {
  title: string;
  price: string;
  imgSrc: string;
  restaurant: string;
}

type OrderHistory = Record<string, CartItem[]>;

export default async function CartPage() {
  const filePath = path.join(process.cwd(), "src", "json", "cart.json");
  let orders: OrderHistory = {};

  try {
    const file = await fs.readFile(filePath, "utf8");
    orders = JSON.parse(file);
  } catch {
    orders = {};
  }

  const allItems: CartItem[] = Object.values(orders).flat();

  const getPriceValue = (price: string): number =>
    parseInt(price.replace(/[^\d]/g, ""), 10);

  const total = allItems.reduce((sum, item) => sum + getPriceValue(item.price), 0);

  return (
    <div className="bg-slate-100 min-h-screen p-10">
      <h1 className="text-[2rem] mb-6 font-semibold">Your Cart</h1>

      {allItems.length === 0 ? (
        <p className="text-lg">No items in the cart yet.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allItems.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 border p-4 rounded-lg bg-white shadow"
              >
                <img
                  src={item.imgSrc}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.restaurant}</p>
                  <p className="text-md font-medium mt-1">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-right mt-6 font-semibold text-xl">
            Total: ₹{total}
          </div>
        </>
      )}
    </div>
  );
}
