const express = require("express");
const { httpGetAllNotes, httpGetOneNote, httpAddNewNote, httpUpdateNote, httpDeleteNote } = require("./notes.controller");

const notesRouter = express.Router();

notesRouter.get("/", httpGetAllNotes);
notesRouter.get("/:id", httpGetOneNote);
notesRouter.post("/", httpAddNewNote);
notesRouter.put("/:id", httpUpdateNote);
notesRouter.delete("/:id", httpDeleteNote)

module.exports = notesRouter;