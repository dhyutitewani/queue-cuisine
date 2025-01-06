'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter(); // Hook for navigation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      // Store session in localStorage after successful login
      localStorage.setItem('userSession', 'loggedIn');
      setSuccessMessage('Logged in successfully!');
      
      // Redirect to home page first, then reload
      setTimeout(() => {
        router.push('/'); // Redirect to the home page
      }, 0); // Zero delay to ensure immediate redirect

      // Refresh the page after redirect (after the page loads)
      setTimeout(() => {
        window.location.reload(); // Reload page after redirection
      }, 100); // Delay for 1.5 seconds before reload to ensure page load

    } else {
      setError('Invalid email or password');
    }
    setIsSubmitting(false);
  };

  return (
    <main className="bg-white p-8 rounded-sm shadow-md w-[23rem] mx-auto">
      <form className="space-y-4 flex flex-col items-center" onSubmit={handleSubmit}>
        <div className="mb-4 w-full">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            placeholder="Email"
            className="border border-gray-300 rounded-sm px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-2 w-full">
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border border-gray-300 rounded-sm px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {error && <p className="text-red-400">{error}</p>}
        {successMessage && (
          <p className="text-red-400">{successMessage}</p> // Success message in green
        )}
        <div className="flex justify-center w-full">
          <button
            type="submit"
            className="border-2 border-[#ff6f61] text-black rounded-md transform transition duration-300 ease-in-out hover:border-[#ff6f61] hover:bg-[#ff6f61] hover:text-white hover:scale-80 hover:shadow-xl px-5 py-3 w-[10rem]"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
    </main>
  );
}
