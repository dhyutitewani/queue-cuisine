import { NextRequest } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import { MongoClient } from "mongodb";
import { getSession } from "next-auth/react"; // Assuming you're using NextAuth for authentication

// Use the MongoDB URI you already have (with the dbname included)
const client = new MongoClient(process.env.MONGODB_URI as string); // MongoDB URI with dbname in the URI

export async function POST(req: NextRequest) {
  try {
    const item = await req.json();
    const today = new Date().toISOString().split("T")[0];

    // Construct path to /src/json/cart.json
    const jsonDir = path.join(process.cwd(), "src", "json");
    const filePath = path.join(jsonDir, "cart.json");

    // Ensure the directory exists
    await fs.mkdir(jsonDir, { recursive: true });

    let existingData = {};

    // Check if cart.json exists, and read its content if it does
    try {
      const file = await fs.readFile(filePath, "utf-8");
      existingData = JSON.parse(file);
    } catch {
      existingData = {};
    }

    // Add item to today's list in cart.json if user is not logged in
    if (!existingData[today]) {
      existingData[today] = [];
    }
    existingData[today].push(item);

    // Write updated data back to the file
    await fs.writeFile(filePath, JSON.stringify(existingData, null, 2), "utf-8");

    // Handle case when user is logged in
    const session = await getSession({
      req: {
        headers: {
          ...Object.fromEntries(req.headers),
          cookie: req.headers.get("cookie") || "",
        },
      },
    });
    if (session && session.user && session.user.email) {
      const userEmail = session.user.email;

      // MongoDB logic for logged-in user
      const orderData = {
        email: userEmail,
        date: today,
        items: [item], // Store the item(s) the user added
      };

      // Connect to MongoDB and insert the order data
      await client.connect();
      const db = client.db(); // No need to specify db name if it's part of the URI
      interface UserOrder {
        email: string;
        date: string;
        items: any[]; // Define the structure of the items array
      }
      const collection = db.collection<UserOrder>("user_orders"); // Collection to store orders

      // Insert order into the user_orders collection
      await collection.updateOne(
        { email: userEmail, date: today }, // Update if user already has an order for today
        { $push: { items: item } }, // Add the new item to the 'items' array
        { upsert: true } // Insert a new document if it doesn't exist
      );

      await client.close();
    }

    return new Response(JSON.stringify({ message: "Item added to cart for " + today }), {
      status: 200,
    });
  } catch (err) {
    console.error("Error in add-to-cart:", err);
    return new Response(JSON.stringify({ error: "Failed to add item" }), { status: 500 });
  }
}
