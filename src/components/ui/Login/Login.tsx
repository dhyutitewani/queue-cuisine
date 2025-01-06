import Link from 'next/link';
import * as React from 'react';

export default function Login() {

  return (
    <main className="bg-white p-8 rounded-sm shadow-md w-[23rem] mx-auto">
      <form className="space-y-4 flex flex-col items-center">
        <div className="mb-4 w-full">
          <input
            type="text"
            name="email"
            autoComplete="off"
            placeholder="Email"
            className="border border-gray-300 rounded-sm px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-2 w-full">
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
    <div className="flex justify-center w-full">
      <Link href="/">
        <button
          type="submit"
          className="border-2 border-[#ff6f61] text-black rounded-md transform transition duration-300 ease-in-out hover:border-[#ff6f61] hover:bg-[#ff6f61] hover:text-white hover:scale-80 hover:shadow-xl px-5 py-3 w-[10rem]"
        >
          Login
        </button>
      </Link>
    </div>
  );
}
