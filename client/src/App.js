import axios from "axios";
import { useState, useEffect } from "react";
import Notes from "./components/Notes/Notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:8000/notes")
      .then((res) => {
        setNotes(res.data.sort((a, b) => b.id - a.id));
      })
      .catch((err) => {
        console.error(err);
      });
  }, [notes, setNotes]);
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
      <form onSubmit={handleFormSubmit} className="ms-5">
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
      <Notes notes={notes} className="ms-5"/>
      
    </div>
  );
}

export default App;
