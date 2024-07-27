"use client";
import { useEffect, useState } from "react";
import { FaMoon, FaSun, FaBook, FaSearch } from "react-icons/fa";
import { useUser } from "../context/userContext";
import { useTheme } from "next-themes";
import { useBooks } from "../context/BookContext";
import Button from "../ui/button";
import CreativeBookCard from "../ui/bookcard";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

export default function Books() {
  const {
    books,
    message,
    handleAddQuote,
    handleLikeQuote,
    handleDislikeQuote,
    handleAddComment,
    handleLikeBook,
    handleDislikeBook,
  } = useBooks();
  const { user } = useUser();
  const [theme, setTheme] = useState("light");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(books);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(lowercasedQuery) ||
        book.author.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredBooks(filtered);
  }, [searchQuery, books]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div
      className={`min-h-screen py-10 px-4 sm:px-6 lg:px-8 transition-all duration-500 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-r from-pink-500 to-violet-600 text-white-900"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 px-4 py-2 to-slate-100 text-white-900 rounded-lg shadow-lg">
          <h1 className="text-3xl sm:text-4xl font-bold flex items-center text-gray-100 mb-4 sm:mb-0">
            <FaBook className="mr-3 text-amber-500" />
            Bookshelf
          </h1>
          <div className="flex items-center">
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-2 rounded-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`p-3 rounded-full flex items-center transition-colors duration-300 ease-in-out ${
                theme === "dark"
                  ? "bg-pink-500 text-gray-900 shadow-lg"
                  : "bg-white text-dark shadow-md"
              }`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <FaSun className="mr-2 text-yellow-400" />
              ) : (
                <FaMoon className="mr-2 text-gray-300" />
              )}
              <span className="hidden sm:inline">
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </span>
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-6 p-4 rounded-md shadow-lg transition-all duration-500 ${
                theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-gradient-to-r from-pink-500 to-violet-600 text-gray-900"
              }`}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>
        <Toaster position="top-center" reverseOrder={false} />

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
          {filteredBooks.map((book) => (
            <CreativeBookCard
              key={book._id}
              book={book}
              onAddQuote={handleAddQuote}
              onLikeQuote={handleLikeQuote}
              onDislikeQuote={handleDislikeQuote}
              onAddComment={handleAddComment}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
