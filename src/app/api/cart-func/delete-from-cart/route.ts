import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { title } = body; // You can add more fields if needed for unique identification

  const filePath = path.join(process.cwd(), "src", "json", "cart.json");
  try {
    const file = await fs.readFile(filePath, "utf8");
    const orders = JSON.parse(file);

    for (const user in orders) {
      orders[user] = orders[user].filter((item: any) => item.title !== title);
      // If a user has no items left, optionally remove them
      if (orders[user].length === 0) {
        delete orders[user];
      }
    }

    await fs.writeFile(filePath, JSON.stringify(orders, null, 2), "utf8");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to delete item" }, { status: 500 });
  }
}
