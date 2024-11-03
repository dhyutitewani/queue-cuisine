import Link from 'next/link';
import * as React from 'react';

export default function Login() {

  return (
    <main className="bg-white p-8 rounded-sm shadow-md w-[23rem]">
      <form>
      <div className="mb-4">
          <input
            type="text"
            name="name"
            autoComplete="off"
            placeholder="Name"
            className="border border-gray-300 rounded-sm px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="email"
            autoComplete="off"
            placeholder="Email"
            className="border border-gray-300 rounded-sm px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-5">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border border-gray-300 rounded-sm px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <LoginButton />
      </form>
    </main>
  );
}

function LoginButton() {
  return (
    <Link href="/">
        <button
            type="submit"
            className="mt-3 grid grid-col-1 group rounded-sm border border-gray-400 dark:bg-neutral-500/30 px-5 py-3 w-[10rem] mx-auto"
        >
            Create Account
        </button>
    </Link>
  );
}