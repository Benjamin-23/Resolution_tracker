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
          isOpen ? "flex w-fit" : "hidden"
        } md:flex absolute md:relative top-full left-0 w-full md:w-auto bg-black md:bg-transparent shadow-lg md:shadow-none flex-col md:flex-row gap-4`}
      >
        <Link
          className="hover:text-green-500 hover:underline p-2 md:p-0"
          href="/protected"
        >
          {isOpen ? "Resolution" : "Protected"}
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
