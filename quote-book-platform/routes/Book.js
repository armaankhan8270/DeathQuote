import express from "express";
import {
  addBook,
  addQuote,
  deleteBook,
  dislikeBook,
  dislikeQuote,
  getBookById,
  getBooks,
  likeBook,
  likeQuote,
  updateBook,
} from "../controllers/Book.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", upload.single("coverImage"), addBook);
router.get("/", getBooks);
router.get("/:id", getBookById);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);
router.post("/like", likeBook);
router.get("/likesss", (req, res) => res.send("armaa"));
router.post("/dislike", dislikeBook);
router.post("/:id/add-quote", addQuote);
router.post("/quote/like", likeQuote);
router.post("/quote/dislike", dislikeQuote);
export default router;
