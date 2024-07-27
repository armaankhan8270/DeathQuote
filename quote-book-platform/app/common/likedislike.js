import React from "react";
import { ThumbUp, ThumbDown } from "lucide-react";
import axios from "axios";
import toast from "react-toastify";

const BookComponent = ({ book, user, updateQuoteInBooks }) => {
  const handleLikeQuote = async (quoteId) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/quotes/like`,
        { quoteId, user_id: user.user._id }
      );

      updateQuoteInBooks(quoteId, response.data);
      toast.success("Quote liked");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Error liking quote");
    }
  };

  const handleDislikeQuote = async (quoteId) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/quotes/dislike`,
        { quoteId, user_id: user.user._id }
      );

      updateQuoteInBooks(quoteId, response.data);
      toast.success("Quote disliked");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Error disliking quote");
    }
  };

  return (
    <div className="book-component">
      <img src={book.image} alt={book.title} className="book-image" />
      <h2 className="book-title">{book.title}</h2>
      <div className="quote-actions">
        <button
          onClick={() => handleLikeQuote(book.quoteId)}
          className="like-button"
        >
          <ThumbUp size={24} /> {book.likes}
        </button>
        <button
          onClick={() => handleDislikeQuote(book.quoteId)}
          className="dislike-button"
        >
          <ThumbDown size={24} /> {book.dislikes}
        </button>
      </div>
    </div>
  );
};

export default BookComponent;
