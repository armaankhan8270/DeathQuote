import React from "react";
import { motion } from "framer-motion";

const Button = ({ children, onClick, className, icon: Icon, ...props }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-4 py-2 rounded-md font-semibold text-white transition-colors duration-200 flex items-center justify-center ${className}`}
      onClick={onClick}
      {...props}
    >
      {Icon && <Icon className="mr-2" />}
      {children}
    </motion.button>
  );
};

export default Button;
