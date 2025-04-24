import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

// Mock function to simulate payment verification with PayPal (you should replace this with a real API call)
async function verifyPayment(token: string): Promise<boolean> {
  // Simulate verification (In a real-world scenario, you'd call PayPal API here)
  return token.startsWith("ORDER_ID");  // Mocked check (replace with actual API check)
}

export async function POST(req: NextRequest) {
  const { token } = await req.json();  // Extract the token from the PayPal redirect

  if (!token) {
    return NextResponse.json({ success: false, message: "Token is missing" }, { status: 400 });
  }

  // Step 1: Verify the payment status (use PayPal's API in production)
  const isCompleted = await verifyPayment(token);

  if (isCompleted) {
    // Step 2: Clear the cart content if payment is successful (overwrite with empty object)
    const filePath = path.join(process.cwd(), "src", "json", "cart.json");

    try {
      // Overwrite the cart.json file with an empty object (clears its contents)
      await fs.writeFile(filePath, JSON.stringify({}, null, 2), "utf8");
      return NextResponse.json({ success: true, message: "Payment successful, cart cleared." });
    } catch (error) {
      console.error("Failed to clear cart file:", error);
      return NextResponse.json({ success: false, message: "Failed to clear cart file." }, { status: 500 });
    }
  } else {
    return NextResponse.json({ success: false, message: "Payment not completed." }, { status: 400 });
  }
}
