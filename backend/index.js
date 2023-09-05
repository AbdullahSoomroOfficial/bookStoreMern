import express from "express";
import mongoose from "mongoose";
import { bookRouter } from "./routes/book.route.js";
import path from "path";

const app = express();

// parse json data coming from client
app.use(express.json());

// Serve static files from the React app's build directory
app.use(express.static(path.join(process.cwd(), "public")));

// home route serving react app
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

app.use("/books", bookRouter);

// error midleware
app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).send({ message: error.message });
});

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("App connected to database");
    app.listen(process.env.PORT, () => {
      console.log(`App is listening to port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
