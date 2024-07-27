"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <button
        className="flex justify-between items-center w-full py-4 px-6 text-left text-lg font-semibold text-gray-900 hover:bg-blue-50 focus:outline-none transition-colors duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <FaQuestionCircle className="text-blue-600 mr-3 text-2xl" />
          <p className="text-gray-900">{question}</p>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown className="text-blue-600 text-xl" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-50 p-6"
          >
            <p className="text-gray-700 text-base">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const faqData = [
    {
      question: "What is BookQuotes?",
      answer:
        "BookQuotes is a platform where book lovers can discover, share, and discuss inspiring quotes from their favorite books.",
    },
    {
      question: "How do I add a new quote?",
      answer:
        "To add a new quote, navigate to the 'Books' page, select the book (or add a new one if it doesn't exist), and then click on 'Add Quote'. Fill in the required information and submit.",
    },
    {
      question: "Can I create an account?",
      answer:
        "Yes! Click on the 'Register' link in the navigation bar to create your account. Once registered, you'll be able to save favorite quotes, contribute new ones, and participate in discussions.",
    },
    {
      question: "Is BookQuotes free to use?",
      answer:
        "Yes, BookQuotes is completely free for all users. We believe in making literary inspiration accessible to everyone.",
    },
    {
      question: "How can I report inappropriate content?",
      answer:
        "If you come across any inappropriate content, please use the 'Report' button next to the quote or comment. Our moderation team will review it as soon as possible.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10 bg-gradient-to-r from-blue-950 to-slate-900">
      <h1 className="text-5xl font-extrabold text-white mb-10 text-center relative">
        <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-lg blur-md -z-10"></span>
        Frequently Asked Questions
      </h1>

      <div className="max-w-3xl mx-auto">
        {faqData.map((item, index) => (
          <FAQItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
