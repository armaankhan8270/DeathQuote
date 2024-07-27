// controllers/bookController.js
import Quote from "../models/Quote.js";
import Book from "../models/Book.js";

export const addBook = async (req, res) => {
  try {
    const { title, author, desc } = req.body;
    const coverImage = req.file ? req.file.filename : "default-cover.jpg";
    const createdBy = req.body.user_id;
    const book = new Book({ title, author, coverImage, createdBy, desc });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error adding book", details: error.message });
  }
};

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "createdBy",
        select: "username email profileImage createdAt",
      })
      .populate({
        path: "quote",
        populate: [
          {
            path: "author",
            select: "username email profileImage createdAt",
          },
          {
            path: "comments.author",
            select: "username email profileImage createdAt",
          },
        ],
      });
    const booksWithReversedQuotes = books.map((book) => {
      book.quote = book.quote.reverse();
      return book;
    });
    res.json(booksWithReversedQuotes);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error fetching books", details: error.message });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate({
      path: "quote",
      populate: {
        path: "author", // To populate the author of each quote
        select: "username email profilePicture", // Assuming 'username' is a field in your User model
      },
    });
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error fetching book", details: error.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { title, author } = req.body;
    const updateData = { title, author };
    if (req.file) {
      updateData.coverImage = req.file.filename;
    }
    const book = await Book.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error updating book", details: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error deleting book", details: error.message });
  }
};

export const likeBook = async (req, res) => {
  console.log(req.body);
  try {
    const userId = req.body.user_id;

    const book = await Book.findById(req.body.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Check if the user has already liked the book
    if (book.likedBy.includes(userId)) {
      return res
        .status(400)
        .json({ error: "You have already liked this book" });
    }

    // If the user has disliked the book, remove the dislike
    if (book.dislikedBy.includes(userId)) {
      book.dislikedBy.pull(userId);
      book.dislikes -= 1;
    }

    // Add the like and update likedBy array
    book.likedBy.push(userId);
    book.likes += 1;

    await book.save();
    res.json(book);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error liking book", details: error.message });
  }
};

export const dislikeBook = async (req, res) => {
  try {
    const userId = req.body.user_id;

    const book = await Book.findById(req.body.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Check if the user has already disliked the book
    if (book.dislikedBy.includes(userId)) {
      return res
        .status(400)
        .json({ error: "You have already disliked this book" });
    }

    // If the user has liked the book, remove the like
    if (book.likedBy.includes(userId)) {
      book.likedBy.pull(userId);
      book.likes -= 1;
    }

    // Add the dislike and update dislikedBy array
    book.dislikedBy.push(userId);
    book.dislikes += 1;

    await book.save();
    res.json(book);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error disliking book", details: error.message });
  }
};

export const addQuote = async (req, res) => {
  try {
    const { text } = req.body;
    const bookId = req.body.book;
    console.log(req.body);
    const author = "669f5280cc2c208e406e53aa"; // assuming user is authenticated and available in req.user
    const quote = new Quote({ text, author, book: bookId });

    await quote.save();
    console.log("saved quete");
    const book = await Book.findById(bookId);
    if (book) {
      book.quotes.push(quote._id);
      await book.save();
    }

    res.status(201).json(book);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error adding quote", details: error.message });
  }
};

// Like a quote
export const likeQuote = async (req, res) => {
  try {
    const { quoteId } = req.body;
    const quote = await Quote.findByIdAndUpdate(
      quoteId,
      { $inc: { likes: 1 } },
      { new: true }
    ).populate("BookMember", "username email profilePitcure"); // Assuming user has a 'username' field

    if (!quote) {
      return res.status(404).json({ error: "Quote not found" });
    }
    res.json(quote);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error liking quote", details: error.message });
  }
};

// Dislike a quote
export const dislikeQuote = async (req, res) => {
  try {
    const { quoteId } = req.body;
    const quote = await Quote.findByIdAndUpdate(
      quoteId,
      { $inc: { dislikes: 1 } },
      { new: true }
    ).populate("author", "username"); // Assuming user has a 'username' field

    if (!quote) {
      return res.status(404).json({ error: "Quote not found" });
    }
    res.json(quote);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error disliking quote", details: error.message });
  }
};

// Add a comment to a quote
export const addCommentToQuote = async (req, res) => {
  try {
    const { quoteId, text } = req.body;
    const comment = { text, author: req.user._id };
    const quote = await Quote.findByIdAndUpdate(
      quoteId,
      { $push: { comments: comment } },
      { new: true }
    ).populate("comments.author", "username email profilePicture"); // Assuming user has a 'username' field

    if (!quote) {
      return res.status(404).json({ error: "Quote not found" });
    }
    res.json(quote);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error adding comment to quote", details: error.message });
  }
};
