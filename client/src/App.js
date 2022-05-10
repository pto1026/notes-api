import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:8000/notes")
      .then((res) => {
        setNotes(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  function handleFormSubmit(e) {
    e.preventDefault();

    axios
      .post("http://localhost:8000/notes", {
        text: newNote,
      })
      .then((res) => {
        axios
          .get("http://localhost:8000/notes")
          .then((res) => setNotes(res.data))
          .catch((err) => console.error(err));
      });
      setNewNote('');
  }
  return (
    <div className="App">
      <h1 className="display-1 m-5">Notes App</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={newNote}
          onChange={(e) => {
            setNewNote(e.target.value);
          }}
          placeholder="New note"
        />
        <button type="submit" className="btn btn-primary m-5">
          Create new note
        </button>
      </form>
      {/* <Notes className="ms-5"/> */}
      <ul className="notes">
        {notes.map((note) => (
          <li key={note.id} className="note">
            {note.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
