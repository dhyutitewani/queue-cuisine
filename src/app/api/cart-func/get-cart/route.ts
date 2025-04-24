import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "src", "json", "cart.json");

  try {
    const file = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(file);
    const allItems = Object.values(data).flat();
    return new Response(JSON.stringify({ items: allItems }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ items: [] }), { status: 200 });
  }
}