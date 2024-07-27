import React, { useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useUser } from "../context/userContext";
import BookHeader from "./header";
import BookCover from "./Cover";
import AddQuoteSection from "./AddQuoteSection";
import QuoteList from "./QuoteList";
import { useBooks } from "../context/BookContext";

const CreativeBookCard = ({
  book,
  onAddQuote,
  onLikeQuote,
  onDislikeQuote,
  onAddComment,
}) => {
  const [newQuote, setNewQuote] = useState("");
  const [expandedQuote, setExpandedQuote] = useState(null);
  const [viewAllQuotes, setViewAllQuotes] = useState(false);
  const [isAddingQuote, setIsAddingQuote] = useState(false);

  const { user } = useUser();

  const handleAddQuote = () => {
    if (newQuote.trim()) {
      onAddQuote(book._id, newQuote);
      setNewQuote("");
      toast.success("Successfully added quote");
      setIsAddingQuote(false);
    }
  };

  const handleLikeBook = async (bookId) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/books/like`,
        { id: bookId, user_id: user._id }
      );
      toast.success("Liked successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Error liking book");
    }
  };

  const handleDislikeBook = async (bookId) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/books/dislike`,
        { id: bookId, user_id: user._id }
      );
      toast.success("Disliked successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Error disliking book");
    }
  };

  return (
    <motion.div initial="hidden" className=" p-6 min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-2/3 p-6">
            <BookHeader
              book={book}
              handleLikeBook={handleLikeBook}
              handleDislikeBook={handleDislikeBook}
            />
            <BookCover book={book} />
            <AddQuoteSection
              isAddingQuote={isAddingQuote}
              setIsAddingQuote={setIsAddingQuote}
              newQuote={newQuote}
              setNewQuote={setNewQuote}
              handleAddQuote={handleAddQuote}
            />
          </div>

          <div className="w-full md:w-1/2 bg-white p-6 border-l border-gray-200">
            <QuoteList
              book={book}
              expandedQuote={expandedQuote}
              setExpandedQuote={setExpandedQuote}
              onLikeQuote={onLikeQuote}
              onDislikeQuote={onDislikeQuote}
              onAddComment={onAddComment}
              viewAllQuotes={viewAllQuotes}
              setViewAllQuotes={setViewAllQuotes}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CreativeBookCard;
