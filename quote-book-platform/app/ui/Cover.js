import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const BookCover = ({ book }) => {
  return (
    <div className="relative rounded-xl overflow-hidden mb-6">
      <LazyLoadImage
        src={`http://localhost:3001/uploads/${book.coverImage}`}
        alt={book.title}
        className="w-full h-96 object-contain"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
        <h2 className="text-3xl font-bold text-white">{book.title}</h2>
      </div>
    </div>
  );
};

export default BookCover;
