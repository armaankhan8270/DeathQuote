"use client";
import React from "react";
import { FaBook, FaUser, FaQuoteLeft, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

const HelpSection = ({ title, description, icon }) => (
  <motion.div
    className="mb-8 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
    whileHover={{ scale: 1.02 }}
  >
    <div className="flex items-center mb-4">
      {icon}
      <h2 className="text-2xl font-semibold text-gradient-to-r from-blue-950 to-slate-300 ml-4">
        {title}
      </h2>
    </div>
    <p className="text-t200">{description}</p>
  </motion.div>
);

const Help = () => {
  return (
    <div className="container bg-gradient-to-r from-slate-950 to-blue-900 mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold bg-gradient-to-r text-white mb-10 text-center">
        How to Use BookQuotes
      </h1>
      <div className="grid md:grid-cols-2  gap-8">
        <HelpSection
          title="Browse Books"
          description="Explore our vast collection of books. Use the search function or browse by genre to find your favorite titles."
          icon={<FaBook className="text-4xl  text-purple-900" />}
        />
        <HelpSection
          title="Create an Account"
          description="Sign up for a free account to save your favorite quotes, contribute new ones, and join in discussions with other book lovers."
          icon={<FaUser className="text-4xl text-purple-900" />}
        />
        <HelpSection
          title="Add Quotes"
          description="Found an inspiring quote? Add it to our collection! Make sure to include the book title, author, and page number if available."
          icon={<FaQuoteLeft className="text-4xl text-prule-950" />}
        />
        <HelpSection
          title="Discover Quotes"
          description="Use our advanced search features to find quotes by keyword, author, or book. Save your favorites to revisit later."
          icon={<FaSearch className="text-4xl text-purple-950" />}
        />
      </div>
      <div className="mt-12 text-center">
        <h2 className="text-3xl font-semibold text-white mb-4">
          Need More Help?
        </h2>
        <p className="text-white mb-6">
          If you have any questions or need further assistance, don't hesitate
          to contact our support team.
        </p>
        <a href="mailto:support@bookquotes.com">
          <button className="bg-white hover:bg-teal-500 text-pruple-900 font-bold py-3 px-6 rounded-full transition duration-300">
            Contact Support
          </button>
        </a>
      </div>
    </div>
  );
};

export default Help;
