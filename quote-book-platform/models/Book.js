import mongoose, { Schema } from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
      default: "This book has no description.",
    },
    coverImage: {
      type: String,
      default: "default-cover.jpg",
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
      min: 0,
    },
    likedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "BookMember",
      },
    ],
    dislikedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "BookMember",
      },
    ],
    quotes: [
      {
        text: String,
        date: { type: Date, default: Date.now },
      },
    ],
    quote: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quote",
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "BookMember",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create a compound index on title and author
bookSchema.index({ title: 1, author: 1 }, { unique: true });

// Pre-save hook to capitalize the first letter of title and author
bookSchema.pre("save", function (next) {
  if (this.title) {
    this.title = this.title.charAt(0).toUpperCase() + this.title.slice(1);
  }
  if (this.author) {
    this.author = this.author.charAt(0).toUpperCase() + this.author.slice(1);
  }
  next();
});

const Book = mongoose.model("Bookquote", bookSchema);

export default Book;
