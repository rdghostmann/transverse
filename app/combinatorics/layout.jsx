// PageLayout.jsx
import React from 'react';
import Link from 'next/link';

const PageLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="mx-auto flex flex-col justify-between w-full py-2 px-5 mb-4 bg-slate-500 sticky top-0 left-0 z-10 shadow-sm">
        <nav className="w-full flex items-center justify-center border-black">
          <Link className="grid place-items-center m-3 w-[38px] px-2 py-1 rounded-lg border border-gray-500 focus:border-2 focus:border-gray-800 bg-gray-300" href="/combinatorics">
            ➕ <span className="hidden">Combinatorics</span>
          </Link>
          <Link className="grid place-items-center m-3 w-[38px] px-2 py-1 rounded-lg border border-gray-500 focus:border-2 focus:border-gray-800 bg-gray-300" href="/combinatorics">
            ➖ <span className="hidden">Combinatorics</span>
          </Link>
        </nav>
        <h1 className="flex-1 font-bold text-center text-xl text-white">Unleash the Power of Combinatorics!</h1>
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default PageLayout;
