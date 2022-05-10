const notes = require("./notes.mongo");

const DEFAULT_ID = 1;

const note = {
  id: 1,
  text: "One ring to rule them all.",
};

saveNote(note);

async function existsNoteWithId(noteId) {
  return await notes.findOne(
    {
      id: noteId,
    },
    {
      _id: 0,
      __v: 0,
    }
  );
}

async function getLatestId() {
  const latestNote = await notes.findOne().sort("-id");

  if (!latestNote) {
    return DEFAULT_ID;
  }

  return latestNote.id;
}

async function getAllNotes() {
  return await notes.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

async function saveNote(note) {
  await notes.findOneAndUpdate({ id: note.id }, note, { upsert: true });
}

async function addNewNote(note) {
  const newId = (await getLatestId()) + 1;

  const newNote = Object.assign(note, {
    id: newId,
  });

  await saveNote(newNote);
}

async function updateNote(note) {
    await saveNote(note);
}

async function deleteNote(noteId) {
    await notes.findOneAndDelete({ id: noteId });
}

module.exports = {
  existsNoteWithId,
  getAllNotes,
  addNewNote,
  updateNote,
  deleteNote,
};
