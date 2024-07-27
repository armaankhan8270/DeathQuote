import React from "react";

const TextArea = ({ value, onChange, placeholder, className, ...props }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full p-3 border rounded-md resize-none transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
      {...props}
    />
  );
};

export default TextArea;
