"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaBook, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  // State to manage mobile menu visibility
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white text-black shadow-lg p-4 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Title */}
        <Link
          href="/"
          className="text-violet-900 text-2xl font-bold flex items-center"
        >
          <FaBook className="mr-2" />
          BookQuotes
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden  md:flex space-x-4">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/books">Books</NavLink>
          <NavLink href="/auth/login">Login</NavLink>
          <NavLink href="/auth/register">Register</NavLink>
          <NavLink href="/books/form">Form</NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden  text-black"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Navigation Links */}
      {isOpen && (
        <div className="md:hidden bg-slate-100">
          <NavLink href="/" mobile setIsOpen={setIsOpen}>
            Home
          </NavLink>
          <NavLink href="/books" mobile setIsOpen={setIsOpen}>
            Books
          </NavLink>
          <NavLink href="/help" mobile setIsOpen={setIsOpen}>
            Help
          </NavLink>
          <NavLink href="/faq" mobile setIsOpen={setIsOpen}>
            FAQ
          </NavLink>
          <NavLink href="/steps" mobile setIsOpen={setIsOpen}>
            How It Works
          </NavLink>
        </div>
      )}
    </nav>
  );
};

// NavLink Component for consistent styling and behavior
const NavLink = ({ href, children, mobile, setIsOpen }) => (
  <Link
    href={href}
    className={`text-black hover:text-blue-900 hover:font-bold transition duration-300 ${
      mobile ? "block py-2 px-4" : "py-2 px-3"
    }`}
    onClick={() => mobile && setIsOpen(false)}
  >
    {children}
  </Link>
);

export default Navbar;
