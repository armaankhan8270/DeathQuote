import React, { useState } from "react";
import { motion } from "framer-motion";

const CommentInput = ({ onAddComment }) => {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  return (
    <div className="mt-4">
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:border-purple-600"
        rows="3"
        placeholder="Add a comment..."
      ></textarea>
      <motion.button
        onClick={handleAddComment}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="mt-2 bg-gradient-to-r from-pink-300 to-violet-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-pink-700 transition duration-300"
      >
        Submit
      </motion.button>
    </div>
  );
};

export default CommentInput;
