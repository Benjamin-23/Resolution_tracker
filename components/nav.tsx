"use client";
import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative">
      <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <div
        className={`${
          isOpen ? "flex w-max" : "hidden"
        } md:flex absolute rounded-md mt-2   md:relative z-10 top-full left-0 w-fit md:w-full bg-gray-800  md:bg-transparent shadow-lg md:shadow-none flex-col md:flex-row gap-4`}
      >
        <Link
          className="hover:text-green-500 hover:underline p-2 md:p-0"
          href="/protected"
        >
          {isOpen ? "Resolution" : "Resolution"}
        </Link>
        <Link
          className="hover:text-green-500 hover:underline p-2 md:p-0"
          href="/protected/static_page"
        >
          {isOpen ? "Static Page" : "Static Page"}
        </Link>
        <Link
          className="hover:text-green-500 hover:underline p-2 md:p-0"
          href="/protected/achievements"
        >
          Achievements
        </Link>
      </div>
    </nav>
  );
}
