const express = require("express");
const cors = require("cors");

const notesRouter = require("./routes/notes/notes.router");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

app.use("/notes", notesRouter);

module.exports = app;