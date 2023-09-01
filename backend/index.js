import express from "express";
import mongoose from "mongoose";
import { DATABASE_URL, PORT } from "./configs/globalVariables.config.js";
import { bookRouter } from "./routes/book.route.js";
import cors from "cors";

const app = express();

// parse json data coming from client
app.use(express.json());

// custom cors
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// home route
app.get("/", (req, res) => {
  res.status(200).send("Welcome to book store");
});

app.use("/books", bookRouter);

// error midleware
app.use((error, req, res, next) => {
  console.log(error);
  res.send(500).send({ message: error.message });
});

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
