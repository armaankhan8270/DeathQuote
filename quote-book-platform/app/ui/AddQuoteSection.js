import React from "react";
import { motion } from "framer-motion";

const AddQuoteSection = ({
  isAddingQuote,
  setIsAddingQuote,
  newQuote,
  setNewQuote,
  handleAddQuote,
}) => {
  return (
    <div className="mb-6">
      <motion.button
        onClick={() => setIsAddingQuote(!isAddingQuote)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-gradient-to-r from-pink-500 to-violet-600 shadow-lg text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 w-full sm:w-auto"
      >
        Add a Quote
      </motion.button>
      {isAddingQuote && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden mt-4"
        >
          <textarea
            value={newQuote}
            onChange={(e) => setNewQuote(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:border-purple-600"
            rows="3"
            placeholder="Add a quote..."
          ></textarea>
          <motion.button
            onClick={handleAddQuote}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="mt-2 bg-gradient-to-r from-pink-500 to-violet-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 transition duration-300 w-full sm:w-auto"
          >
            Submit
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default AddQuoteSection;
