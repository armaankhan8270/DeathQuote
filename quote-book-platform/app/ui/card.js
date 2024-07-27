// components/ui/Card.js
import React from "react";
import { motion } from "framer-motion";

const Card = ({ children, className, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
