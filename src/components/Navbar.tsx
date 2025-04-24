'use client';

import '@/styles/globals.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  // Check session on initial load
  useEffect(() => {
    // Check if the user is logged in from localStorage
    const userSession = localStorage.getItem('userSession');
    setIsLoggedIn(userSession === 'loggedIn');
  }, []);

  const handleLogout = () => {
    // Remove the session from localStorage
    localStorage.removeItem('userSession');
    setIsLoggedIn(false); // Update the state immediately
    router.push('/'); // Redirect to login page after logout
  };

  return (
    <nav className="block w-full mx-auto bg-white bg-opacity-90 sticky top-0 shadow lg:px-8 lg:py-3 backdrop-blur-lg backdrop-saturate-150 z-[9999]">
      <div className="container flex flex-wrap items-center justify-between mx-auto text-slate-800">
        <Link href="/" passHref>
          <span className="text-xl mr-4 block cursor-pointer py-1.5 text-slate-800 font-semibold">
            Queue & Cuisine
          </span>
        </Link>
        <div className="hidden lg:block">
          <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
              <Link href="/" className="flex items-center">
                About
              </Link>
            </li>
            <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
              <Link href="/menu" className="flex items-center">
                Menu
              </Link>
            </li>
            <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
              <Link href="/cart" className="flex items-center">
                Cart
              </Link>
            </li>

            {isLoggedIn && (
              <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
                <Link href="/profile" className="flex items-center">
                  Profile
                </Link>
              </li>
            )}

            {/* Conditionally render Login or Logout */}
            <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
              {isLoggedIn ? (
                <button onClick={handleLogout} className="flex items-center">
                  Logout
                </button>
              ) : (
                <Link href="/login" className="flex items-center">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
        <button
          className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
          type="button"
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </span>
        </button>
      </div>
    </nav>
  );
}
