const {
  existsNoteWithId,
  getAllNotes,
  addNewNote,
  updateNote,
  deleteNote,
} = require("../../models/notes.model");

async function httpGetAllNotes(req, res) {
  return res.status(200).json(await getAllNotes());
}

async function httpGetOneNote(req, res) {
  const id = req.params.id;
  const note = await existsNoteWithId(id);

  if (!note) {
    return res.status(404).json({
      error: "No note with that id exists",
    });
  }

  return res.status(200).json(note);
}

async function httpAddNewNote(req, res) {
  const note = req.body;

  if (!note.text) {
    return res.status(400).json({
      error: "Missing required note text",
    });
  }

  note.text = note.text.trim();
  if (note.text === "") {
    return res.status(400).json({
      error: "Note body cannot be empty",
    });
  }

  await addNewNote(note);
  return res.status(201).json(note);
}

async function httpUpdateNote(req, res) {
  const updatedNote = req.body;
  const noteId = req.params.id;

  const note = await existsNoteWithId(noteId);

  if (!note) {
    return res.status(404).json({
      error: "No note with that id exists",
    });
  }

  if (!updatedNote) {
    return res.status(204).json(note);
  }

  if (updatedNote.text.trim() === "") {
    return res.status(400).json({
      error: "Note body cannot be empty",
    });
  }

  Object.assign(updatedNote, {
    id: noteId,
  });
  await updateNote(updatedNote);
  return res.status(200).json(updatedNote);
}

async function httpDeleteNote(req, res) {
  const noteId = req.params.id;

  const note = await existsNoteWithId(noteId);

  if (!note) {
    return res.status(404).json({
      error: "No note with that id exists",
    });
  }

  await deleteNote(noteId);
  return res.status(200).json(note);
}

module.exports = {
  httpGetAllNotes,
  httpGetOneNote,
  httpAddNewNote,
  httpUpdateNote,
  httpDeleteNote,
};
