'use client';

import React, { useState } from 'react';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null); // New success state
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return;
    }

    setError(null); // Clear previous errors
    setIsSubmitting(true); // Disable button during submission

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    setIsSubmitting(false); // Re-enable button after submission

    if (response.ok) {
      setSuccess('Account created successfully'); // Show success message
      setError(null); // Clear any previous error messages
    } else {
      setError(data.message);
      setSuccess(null); // Clear any success message on error
    }
  };

  return (
    <main className="bg-white p-8 rounded-sm shadow-md w-[23rem] mx-auto">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
            placeholder="Name"
            className="border border-gray-300 rounded-sm px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            placeholder="Email"
            className="border border-gray-300 rounded-sm px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-5">
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border border-gray-300 rounded-sm px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {error && <p className="text-[#ff6f61]">{error}</p>} {/* Error message */}
        {success && <p className="text-[#ff6f61]">{success}</p>} {/* Success message */}
        <SignupButton isSubmitting={isSubmitting} />
      </form>
    </main>
  );
}

interface SignupButtonProps {
  isSubmitting: boolean;
}

function SignupButton({ isSubmitting }: SignupButtonProps) {
  return (
    <div className="flex justify-center">
      <button
        type="submit"
        disabled={isSubmitting}
        className="border-2 border-[#ff6f61] text-black rounded-md transform transition duration-300 ease-in-out hover:border-[#ff6f61] hover:bg-[#ff6f61] hover:text-white hover:scale-80 hover:shadow-xl px-5 py-3 w-[10rem]"
      >
        {isSubmitting ? 'Creating...' : 'Create Account'}
      </button>
    </div>
  );
}
