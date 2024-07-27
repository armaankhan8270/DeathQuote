import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { Tooltip } from "react-tooltip";

const AddQuoteButton = ({ onClick, isAddingQuote }) => (
  <div>
    <Tooltip
      id="add-quote-tooltip"
      place="top"
      effect="solid"
      backgroundColor="#4A5568"
      textColor="#fff"
      className="rounded-lg p-2 text-xs"
    >
      Add a new quote
    </Tooltip>
    <motion.button
      aria-label="Add Quote"
      onClick={() => onClick(!isAddingQuote)}
      className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-transform duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      data-tip
      data-for="add-quote-tooltip"
    >
      <FaPlus className="text-lg" />
      <span className="ml-2 font-medium">Add Lessons</span>
    </motion.button>
  </div>
);

export default AddQuoteButton;
