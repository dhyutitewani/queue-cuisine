// /pages/api/paypal/capture-order.js

import paypal from '@paypal/checkout-server-sdk';

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { orderId } = req.body;

    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    try {
      const capture = await client.execute(request);
      res.status(200).json(capture);
    } catch (err) {
      console.error('Error capturing payment:', err);
      res.status(500).send('Error capturing payment');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
