"use client";
import React from "react";

import Link from "next/link";
import { BriefcaseBusiness, House, Mail, NotebookPen, UserRound } from "lucide-react";

export const Navbar = () => {
  return (
    <div className="fixed right-0 left-0 -top-1 z-50">
      <div className="w-[93%] mx-auto md:container md:max-w-[1100px] flex justify-between md:mt-6 py-4 items-center">
        <nav
          aria-label="Main menu"
          className="pointer-events-auto z-50 flex xl:w-full items-center justify-end"
        >
          <div className="flex items-center -gap-x-1 md:gap-x-1 absolute left-1/2 -translate-x-1/2 rounded-full bg-white/70 border border-gray/50 pl-3 overflow-hidden text-[15px] font-medium text-gray-800 shadow-lg shadow-gray-800/5 ring-1 ring-black/80 backdrop-blur-md">
            <Link
              href={"/how-it-works"}
              className="flex items-center gap-1 group relative transition duration-300 px-3 py-2.5"
            >
              <House className="w-4 h-4 hidden md:block" />
              Home
              <span className="absolute inset-x-1 h-px bg-gradient-to-r from-black from-10% via-black/60 to-black/10 to-90% transition duration-300 -bottom-0.5 opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"></span>
              <span className="overflow-hidden absolute inset-0 transition origin-bottom duration-300 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100">
                <span className="absolute inset-x-4 -bottom-2 h-full bg-gradient-to-t from-black/50 to-transparent blur rounded-t-full"></span>
              </span>
            </Link>
            <Link
              href={"/blog"}
              className="flex items-center gap-1 group relative transition duration-300 px-3 py-2.5"
            >
              <BriefcaseBusiness className="w-4 h-4 hidden md:block" />
              Projects
              <span className="absolute inset-x-1 h-px bg-gradient-to-r from-black from-10% via-black/60 to-black/10 to-90% transition duration-300 -bottom-0.5 opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"></span>
              <span className="overflow-hidden absolute inset-0 transition origin-bottom duration-300 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100">
                <span className="absolute inset-x-4 -bottom-2 h-full bg-gradient-to-t from-black/50 to-transparent blur rounded-t-full"></span>
              </span>
            </Link>
            <Link
              href={"/support"}
              className="flex items-center gap-1 group relative transition duration-300 px-3 py-2.5"
            >
              <NotebookPen className="w-4 h-4 hidden md:block" />
              Blog
              <span className="absolute inset-x-1 h-px bg-gradient-to-r from-black from-10% via-black/60 to-black/10 to-90% transition duration-300 -bottom-0.5 opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"></span>
              <span className="overflow-hidden absolute inset-0 transition origin-bottom duration-300 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100">
                <span className="absolute inset-x-4 -bottom-2 h-full bg-gradient-to-t from-black/50 to-transparent blur rounded-t-full"></span>
              </span>
            </Link>
            <Link
              href="/pricing"
              className="flex items-center gap-1 group relative transition duration-300 px-3 py-2.5"
            >
              <UserRound className="w-4 h-4 hidden md:block" />
              About
              <span className="absolute inset-x-1 h-px bg-gradient-to-r from-black from-10% via-black/60 to-black/10 to-90% transition duration-300 -bottom-0.5 opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"></span>
              <span className="overflow-hidden absolute inset-0 transition origin-bottom duration-300 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100">
                <span className="absolute inset-x-4 -bottom-2 h-full bg-gradient-to-t from-black/50 to-transparent blur rounded-t-full"></span>
              </span>
            </Link>
            <Link
              className="flex gap-1 items-center bg-black rounded-full px-5 text-white group relative transition duration-300 py-2.5"
              href="/pricing"
            >
              <Mail className="w-4 h-4 hidden md:block" />
              Contact
              <span className="absolute inset-x-1 h-px bg-gradient-to-r from-black from-10% via-black/60 to-black/10 to-90% transition duration-300 -bottom-0.5 opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"></span>
              <span className="overflow-hidden absolute inset-0 transition origin-bottom duration-300 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100">
                <span className="absolute inset-x-4 -bottom-2 h-full bg-gradient-to-t from-black/50 to-transparent blur rounded-t-full"></span>
              </span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};
