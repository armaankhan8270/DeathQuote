import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHeart,
  FaRegHeart,
  FaComment,
  FaThumbsDown,
  FaRegThumbsDown,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
import CommentInput from "./CommentInput";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { format } from "date-fns";
import moment from "moment";
const QuoteList = ({
  book,
  expandedQuote,
  setExpandedQuote,
  onLikeQuote,
  onDislikeQuote,
  onAddComment,
  viewAllQuotes,
  setViewAllQuotes,
}) => {
  const [hoverActive, setHoverActive] = useState("text-slate-900");
  return (
    <div
      className={`space-y-6 ${
        viewAllQuotes
          ? "h-[calc(100vh-200px)] overflow-y-auto pr-2 no-scrollbar"
          : ""
      }`}
    >
      {book.quote
        .slice(0, viewAllQuotes ? book.quote.length : 2)
        .map((quote) => (
          <motion.div
            key={quote._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-lg p-6  transition-all duration-300 bg-white"
          >
            <div className="relative z-10 text-black hover:bg-gradient-to-r from-pink-300 to-violet-500 hover:text-white p-4 rounded-lg shadow-md">
              <p className="font-semibold text-lg mb-4">{quote.text}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <Tooltip
                    content={quote.likes > 0 ? "Unlike" : "Like"}
                    placement="top"
                    arrow
                  >
                    <motion.button
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onLikeQuote(quote._id)}
                      className="flex items-center space-x-1 hover:bg-transparent text-red-700 transition duration-300"
                    >
                      {quote.likes > 0 ? <FaHeart /> : <FaRegHeart />}
                      <span>{quote.likes}</span>
                    </motion.button>
                  </Tooltip>

                  <Tooltip
                    content={quote.dislikes > 0 ? "Undislike" : "Dislike"}
                    placement="top"
                    arrow
                  >
                    <motion.button
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onDislikeQuote(quote._id)}
                      className="flex items-center space-x-1 hover:bg-transparent text-gray-500 hover:text-gray-700 transition duration-300"
                    >
                      {quote.dislikes > 0 ? (
                        <FaThumbsDown />
                      ) : (
                        <FaRegThumbsDown />
                      )}
                      <span>{quote.dislikes}</span>
                    </motion.button>
                  </Tooltip>

                  <Tooltip content="Comment" placement="top" arrow>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setExpandedQuote(quote._id)}
                      className="flex items-center hover:bg-transparent  space-x-1 text-pink-500 hover:text-pink-700 transition duration-300"
                    >
                      <FaComment />
                      <span>{quote.comments.length}</span>
                    </motion.button>
                  </Tooltip>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <LazyLoadImage
                    src={`http://localhost:3001/uploads/${quote.author?.profileImage}`}
                    alt="User"
                    className="w-8 h-8 rounded-full object-cover border-2 border-purple-400 hover:border-black"
                  />
                  <div>
                    <div className="text-slate-900 font-bold capitalize">
                      {quote.author?.username}
                    </div>
                    <p className="text-gray-900">
                      {moment(quote.createdAt).fromNow()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <AnimatePresence>
              {expandedQuote === quote._id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mt-4"
                >
                  {quote.comments.map((comment) => (
                    <motion.div
                      key={comment._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="bg-gray-100 hover:bg-gradient-to-r from-pink-300 to-violet-500 hover:text-slate-900 p-3 rounded-lg mt-2"
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <LazyLoadImage
                          src={`http://localhost:3001/uploads/${comment.author.profileImage}`}
                          alt="User"
                          className="w-8 h-8 rounded-full object-cover border-2 border-purple-400"
                        />
                        <div>
                          <p className="text-sm font-semibold">
                            {comment.author.username}
                          </p>
                          <p className="text-xs text-gray-500">
                            <p>{moment(comment.createdAt).fromNow()}</p>
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-800">{comment.text}</p>
                    </motion.div>
                  ))}
                  <CommentInput
                    onAddComment={(text) => onAddComment(quote._id, text)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setViewAllQuotes(!viewAllQuotes)}
          className="text-purple-500 hover:text-purple-800 transition duration-300 flex items-center space-x-1"
        >
          {viewAllQuotes ? (
            <>
              <FaChevronUp />
              <span>View Less</span>
            </>
          ) : (
            <>
              <FaChevronDown />
              <span>View All Quotes</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default QuoteList;
