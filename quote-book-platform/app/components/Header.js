import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="bg-blue-500 text-white">
      <nav className="container mx-auto px-4 py-6">
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link href="/books" className="hover:underline">
              Books
            </Link>
          </li>
          <li>
            <Link href="/quotes" className="hover:underline">
              Quotes
            </Link>
          </li>
          <li>
            <Link href="/login" className="hover:underline">
              Login
            </Link>
          </li>
          <li>
            <Link href="/register" className="hover:underline">
              Register
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
