"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "./userContext";

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");
  const { user } = useUser();
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get("http://localhost:3001/api/books");
        setBooks(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching books: " + error.message);
        setMessage("Error fetching books: " + error.message);
      }
    }
    fetchBooks();
  }, [count]);

  const handleAddQuote = async (bookId, quoteText) => {
    if (!quoteText.trim() || !user) {
      setMessage("Quote text cannot be empty and you must be logged in");
      toast.error("Quote text cannot be empty and you must be logged in");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3001/api/quotes/add`,
        {
          text: quoteText,
          bookId: bookId,
          user_id: user._id,
        }
      );

      if (response.status === 201) {
        toast.success("Quote added successfully");
        setMessage("Quote added successfully");
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book._id === bookId
              ? { ...book, quotes: [...book.quotes, response.data] }
              : book
          )
        );
      }
    } catch (error) {
      console.error("Error adding quote:", error);
      toast.error("Error adding quote");
      setMessage("Error adding quote");
    }
  };

  const handleLikeQuote = async (quoteId) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/quotes/like`,
        { quoteId, user_id: user._id }
      );

      updateQuoteInBooks(quoteId, response.data);
      toast.success("Quote liked");
      setCount(count + 1);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Error liking quote");
      setMessage(error.response?.data?.error || "Error liking quote");
    }
  };

  const handleDislikeQuote = async (quoteId) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/quotes/dislike`,
        { quoteId, user_id: user._id }
      );

      updateQuoteInBooks(quoteId, response.data);
      toast.success("Quote disliked");
      setCount(count + 1);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Error disliking quote");
      setMessage(error.response?.data?.error || "Error disliking quote");
    }
  };

  const handleAddComment = async (quoteId, commentText) => {
    if (!commentText.trim() || !user) {
      setMessage("Comment text cannot be empty and you must be logged in");
      toast.error("Comment text cannot be empty and you must be logged in");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3001/api/quotes/add-comment`,
        { quoteId, text: commentText, user_id: user._id }
      );
      setMessage("Comment added successfully");
      toast.success("Comment added successfully");
      updateQuoteInBooks(quoteId, response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error adding comment to quote");
      setMessage("Error adding comment to quote");
    }
  };

  const updateQuoteInBooks = (quoteId, updatedQuote) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => ({
        ...book,
        quotes: book.quotes.map((quote) =>
          quote._id === quoteId ? updatedQuote : quote
        ),
      }))
    );
  };

  const handleLikeBook = async (bookId) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/books/like`,
        { id: bookId, user_id: user._id }
      );

      updateBookInList(bookId, response.data);
      toast.success("Book liked");

      setCount(count + 1);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Error liking book");
      setMessage(error.response?.data?.error || "Error liking book");
    }
  };

  const updateBookInList = (bookId, updatedBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book._id === bookId ? updatedBook : book))
    );
  };

  const handleDislikeBook = async (bookId) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/books/dislike`,
        { id: bookId, user_id: user._id }
      );

      updateBookInList(bookId, response.data);
      toast.success("Book disliked");
      setCount(count + 1);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Error disliking book");
      setMessage(error.response?.data?.error || "Error disliking book");
    }
  };

  return (
    <BookContext.Provider
      value={{
        books,
        message,
        handleAddQuote,
        handleLikeQuote,
        handleDislikeQuote,
        handleAddComment,
        handleLikeBook,
        handleDislikeBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  return useContext(BookContext);
};
