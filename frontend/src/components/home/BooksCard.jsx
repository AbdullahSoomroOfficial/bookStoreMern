import React from "react";
import BookSingleCard from "./BookSingleCard.jsx";

const BooksCard = ({ books }) => {
  if (books.length > 0) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 px-2">
        {books.map((book) => {
          return <BookSingleCard key={book._id} book={book} />;
        })}
      </div>
    );
  } else {
    return <p>No result found</p>;
  }
};

export default BooksCard;
