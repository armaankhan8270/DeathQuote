import express from "express";
import {
  addQuote,
  likeQuote,
  dislikeQuote,
  addCommentToQuote,
} from "../controllers/Quote.js";

const router = express.Router();

router.post("/add", addQuote);
router.post("/like", likeQuote);
router.post("/dislike", dislikeQuote);
router.post("/add-comment", addCommentToQuote);

export default router;
