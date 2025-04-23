'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const totalAmount = searchParams.get('total') || '0';

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setError(null);
  }, [totalAmount]);

  const createOrder = async () => {
    setIsLoading(true);
    setError(null);  // Reset error message
    try {
      const response = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ totalAmount }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Display error message from PayPal API
        setError(data.message || 'Failed to create order');
        return;
      }

      // Redirect to PayPal approval URL
      window.location.href = data.approvalUrl;  // Use `approvalUrl` here

    } catch (err: any) {
      setError(err.message || 'Failed to create order');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-10">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <p className="mb-4">Total: ₹{totalAmount}</p>

      <button
        onClick={createOrder}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? 'Processing...' : 'Pay with PayPal'}
      </button>
    </div>
  );
}
