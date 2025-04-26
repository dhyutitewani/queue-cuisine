'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Link from 'next/link';
import Login from "@/components/ui/Login/Login";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is already logged in
    const userSession = localStorage.getItem('userSession');
    if (userSession === 'loggedIn') {
      // Redirect to home if already logged in
      router.push('/');
    }
  }, [router]); // This hook runs on component mount

  return (
    <div className="flex min-h-screen flex-col items-center mt-10">
      <div>
        <h1 className="text-[2.5rem] text-center">Login</h1>
      </div>
      <div className="mt-10">
        <Login />
      </div>
      <Link className='mt-10 text-lg' href="/signup">
        To create an account 
        <span className='text-[av#ff6f61] hover:text-[#672222]'> click </span>
        here
      </Link>
    </div>
  );
}
