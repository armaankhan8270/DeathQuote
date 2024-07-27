// components/Layout.js
"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const NavItem = ({ href, text }) => (
  <Link href={href}>
    <motion.a
      className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {text}
    </motion.a>
  </Link>
);

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <nav className="bg-gray-800 bg-opacity-30 backdrop-filter backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/">
                <a className="flex-shrink-0">
                  <img className="h-8 w-8" src="/logo.svg" alt="LitQuest" />
                </a>
              </Link>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <NavItem href="/" text="Home" />
                  <NavItem href="/help" text="Help" />
                  <NavItem href="/steps" text="Steps" />
                  <NavItem href="/faq" text="FAQ" />
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavItem href="/" text="Home" />
              <NavItem href="/help" text="Help" />
              <NavItem href="/steps" text="Steps" />
              <NavItem href="/faq" text="FAQ" />
            </div>
          </div>
        )}
      </nav>

      <main>{children}</main>
    </div>
  );
}
