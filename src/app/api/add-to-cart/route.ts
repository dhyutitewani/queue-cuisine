import { NextRequest } from "next/server";
import path from "path";
import { promises as fs } from "fs";

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
			// If the file doesn't exist, we start with an empty object
			existingData = {};
		}

		// Add item to today's list
		if (!existingData[today]) {
			existingData[today] = [];
		}
		existingData[today].push(item);

		// Write updated data back to the file
		await fs.writeFile(filePath, JSON.stringify(existingData, null, 2), "utf-8");

		return new Response(JSON.stringify({ message: "Item added to cart for " + today }), {
			status: 200,
		});
	} catch (err) {
		console.error("Error in add-to-cart:", err);
		return new Response(JSON.stringify({ error: "Failed to add item" }), { status: 500 });
	}
}
