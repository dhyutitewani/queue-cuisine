// /app/api/paypal/create-order/route.ts

import paypal from '@paypal/checkout-server-sdk';

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

export async function POST(req: Request) {
  const { totalAmount } = await req.json();

  // Validate that totalAmount exists
  if (!totalAmount) {
    return new Response(JSON.stringify({ message: 'Total amount is required' }), {
      status: 400,
    });
  }

  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD', // Currency set to USD
          value: totalAmount,
        },
      },
    ],
  });

  try {
    const order = await client.execute(request);

    // Log the entire order response for debugging
    console.log('PayPal Order Response:', order);

    // Find approval URL from PayPal order response
    const approvalUrl = order.result.links.find((link: any) => link.rel === 'approve')?.href;

    if (!approvalUrl) {
      console.error('Approval URL not found');
      throw new Error('Approval URL not found');
    }

    // Return the approval URL
    return new Response(
        JSON.stringify({
            approvalUrl, // Send approval URL back to frontend
        }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error('Error creating PayPal order:', err);
    return new Response(
      JSON.stringify({ message: 'Error creating PayPal order', error: err.message }),
      { status: 500 }
    );
  }
}
