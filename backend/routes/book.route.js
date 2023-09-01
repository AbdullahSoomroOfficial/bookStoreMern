import express from "express";
import { Book } from "../models/book.model.js";

const bookRouter = express.Router();

// create a book
bookRouter.post("/", async (req, res, next) => {
  try {
    const { title, author, publishYear } = req.body;
    // there should not be empty field
    if (!title || !author || !publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const book = await Book.create({ title, author, publishYear });
    res.status(200).send(book);
  } catch (error) {
    next(error);
  }
});

// get all books
bookRouter.get("/", async (req, res, next) => {
  try {
    const books = await Book.find();
    res.status(200).send(books);
  } catch (error) {
    next(error);
  }
});

// get a specific book
bookRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      res.status(404).send({ message: "Book not found" });
    }
    res.status(200).send(book);
  } catch (error) {
    next(error);
  }
});

// update a specific book
bookRouter.put("/:id", async (req, res, next) => {
  try {
    const { title, author, publishYear } = req.body;
    // there should not be empty field
    if (!title || !author || !publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, {
      title,
      author,
      publishYear,
    });
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    res.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    next(error);
  }
});

// delete a specific book
bookRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      res.status(404).send({ message: "Book not found" });
    }
    res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    next(error);
  }
});

export { bookRouter };
