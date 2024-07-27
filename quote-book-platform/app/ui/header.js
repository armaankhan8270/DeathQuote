import React from "react";
import { FaShare } from "react-icons/fa";
import { motion } from "framer-motion";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { format } from "date-fns";
import moment from "moment";
const BookHeader = ({ book, handleLikeBook, handleDislikeBook }) => {
  return (
    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4 mb-6 flex-wrap">
      <div className="flex items-center space-x-4">
        <LazyLoadImage
          src={`http://localhost:3001/uploads/${book.createdBy?.profileImage}`}
          alt="User"
          className="w-12 h-12 rounded-full object-cover border-2 border-purple-400"
        />
        <div>
          <p className="font-semibold text-lg">{book.createdBy?.username}</p>
          <p className="text-sm text-gray-500">
            {/* {new Date(book.createdAt).toLocaleDateString()} */}
            <p>{moment(book.createdAt).fromNow()}</p>
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Tooltip title="Share this book" position="top" animation="scale">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-purple-600 hover:text-purple-800 transition duration-300"
          >
            <FaShare className="text-xl" />
          </motion.button>
        </Tooltip>
        <div className="quote-actions flex space-x-2">
          <button
            onClick={() => handleLikeBook(book._id)}
            className="like-button text-sm text-green-500"
          >
            Likes: {book.likes}
          </button>
          <button
            onClick={() => handleDislikeBook(book._id)}
            className="dislike-button text-sm text-red-500"
          >
            Dislikes : {book.dislikes}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookHeader;
