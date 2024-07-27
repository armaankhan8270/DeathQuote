// components/Hero.js
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/themecontect";
const Hero = () => {
  const [email, setEmail] = useState("");
  const { darkMode } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle email submission (e.g., newsletter signup)
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <section className="relative bg-gradient-to-r from-slate-950 to-blue-900 dark:from-purple-900 dark:to-indigo-900">
      <div className="absolute inset-0 bg-[url('/book-pattern.png')] opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Discover and Share
            <span className="block text-yellow-300">Inspiring Book Quotes</span>
          </h1>
          <p className="text-xl md:text-2xl text-white mb-10 max-w-3xl mx-auto">
            Dive into a world of literary wisdom. Connect with fellow book
            lovers and find your next favorite quote.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row justify-center max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 w-full sm:w-64 text-gray-900 bg-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="mt-3 sm:mt-0 px-6 py-3 bg-yellow-400 text-gray-900 font-bold rounded-r-md hover:bg-yellow-300 transition duration-300"
            >
              Join Now
            </motion.button>
          </form>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-white text-lg mb-4">Featured in</p>
          <div className="flex justify-center space-x-8">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqC8KCgPQ5sgKZxDD_Y_2fyfirSQseILoOCw&s"
              alt="New York Times"
              className="h-8 opacity-70 hover:opacity-100 transition-opacity"
            />
            <img
              src="https://static-prod.adweek.com/wp-content/uploads/2024/06/guardian-600x315.jpeg"
              alt="The Guardian"
              className="h-8 opacity-70 hover:opacity-100 transition-opacity"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKT5r8xDIFUkKZKemJpx-fm9hZF3eAmyKNwA&s"
              alt="Goodreads"
              className="h-8 opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
