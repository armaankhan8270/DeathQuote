import mongoose from "mongoose";
const { Schema } = mongoose;
const quoteSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BookMember",
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bookquote",
      required: true,
    },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    likedBy: [{ type: Schema.Types.ObjectId, ref: "BookMember" }],
    dislikedBy: [{ type: Schema.Types.ObjectId, ref: "BookMember" }],
    comments: [
      {
        text: String,
        author: { type: mongoose.Schema.Types.ObjectId, ref: "BookMember" },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Quote = mongoose.model("Quote", quoteSchema);
export default Quote;
