"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  return (
    <header className="h-[95px] w-full border-none bg-blue-950 fixed top-0 left-0 z-50 flex items-center px-6 ">
      <button className="" onClick={() => router.push("/")}>
        <h2 className="text-[35px] font-bold ml-3 cursor-pointer">
          ADMIN PANEL
        </h2>
      </button>
      {/* Title */}

      {/* 🔍 Search bar */}
      <div className="flex-1 flex justify-center">
        <label className="input w-[450px] bg-white hover:scale-107 transition duration-450 flex items-center px-2 rounded">
          <svg
            className="h-[1.2em] opacity-50 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="black"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </g>
          </svg>
          <input
            type="search"
            name="header-search-bar"
            required
            placeholder="Search"
            className=" text-black w-full outline-none"
          />
        </label>
      </div>

      {/* 👤 Profile icon */}
      <div className="avatar avatar-placeholder cursor-pointer ml-6">
        <div className="bg-white text-neutral-content w-14 h-14 rounded-full flex items-center justify-center">
          <Link
            href="/my-profile/profile"
            className="text-2xl font-bold text-black"
          >
            D
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
