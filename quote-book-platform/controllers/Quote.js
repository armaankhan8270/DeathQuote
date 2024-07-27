import Quote from "../models/Quote.js";
import Book from "../models/Book.js";

export const addQuote = async (req, res) => {
  try {
    const { text, bookId } = req.body;
    const author = req.body.user_id; // assuming user is authenticated and available in req.user

    const quote = new Quote({ text, author, book: bookId });

    await quote.save();

    const book = await Book.findById(bookId);
    if (book) {
      book.quote.push(quote._id);
      await book.save();
    }

    res.status(201).json(quote);
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
    const userId = req.body.user_id;

    const quote = await Quote.findById(quoteId);

    if (!quote) {
      return res.status(404).json({ error: "Quote not found" });
    }

    // Check if the user has already liked the quote
    if (quote.likedBy.includes(userId)) {
      return res
        .status(400)
        .json({ error: "You have already liked this quote" });
    }

    // Check if the user has disliked the quote, if so, remove dislike
    if (quote.dislikedBy.includes(userId)) {
      quote.dislikedBy.pull(userId);
      quote.dislikes -= 1;
    }

    quote.likedBy.push(userId);
    quote.likes += 1;
    await quote.save();

    res.json(quote);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error liking quote", details: error.message });
  }
};

export const dislikeQuote = async (req, res) => {
  try {
    const { quoteId } = req.body;
    const userId = req.body.user_id;

    const quote = await Quote.findById(quoteId);

    if (!quote) {
      return res.status(404).json({ error: "Quote not found" });
    }

    // Check if the user has already disliked the quote
    if (quote.dislikedBy.includes(userId)) {
      return res
        .status(400)
        .json({ error: "You have already disliked this quote" });
    }

    // Check if the user has liked the quote, if so, remove like
    if (quote.likedBy.includes(userId)) {
      quote.likedBy.pull(userId);
      quote.likes -= 1;
    }

    quote.dislikedBy.push(userId);
    quote.dislikes += 1;
    await quote.save();

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
    const userId = req.body.user_id; // Assuming user is authenticated and available in req.user

    // Find the quote
    const quote = await Quote.findById(quoteId);
    if (!quote) {
      return res.status(404).json({ error: "Quote not found" });
    }

    // Create the new comment
    const comment = {
      text,
      author: userId,
    };

    // Add the comment to the quote
    quote.comments.push(comment);
    await quote.save();

    // Populate the author field in the comment
    await quote.populate({
      path: "comments.author",
      select: "username email profilePicture",
    });

    res.status(201).json(quote);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ error: "Error adding comment to quote", details: error.message });
  }
};
