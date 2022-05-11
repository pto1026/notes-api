import axios from "axios";
import { useState } from "react";
import "./Note.css";

function Note(props) {
  const [updateView, setUpdateView] = useState(false);
  const [newNote, setNewNote] = useState(props.note.text);
  function handleNoteChange(e) {
    setNewNote(e.target.value);
  }
  function handleFormSubmit(e) {
    e.preventDefault();
    const note = {
      id: props.note.id,
      text: newNote,
    };
    axios
      .put(`http://localhost/notes/${note.id}`, note)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    setUpdateView(false);
  }
  function handleUpdateButton() {
    setUpdateView(true);
  }
  function handleDeleteButton() {
    axios
      .delete(`http://localhost/notes/${props.note.id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (!updateView) {
    return (
      <li className={`note d-flex ${props.className}`}>
        {props.note.text}
        <button
          type="button"
          className="btn btn-dark mx-3 ms-auto"
          onClick={handleUpdateButton}
        >
          Update
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleDeleteButton}
        >
          Delete
        </button>
      </li>
    );
  }
  return (
    <li className={`note d-flex ${props.className}`}>
      <form className="form" onSubmit={handleFormSubmit}>
        <input
          type="text"
          className="form-control"
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit" className="btn btn-primary mx-3 ms-auto">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleDeleteButton}
        >
          Delete
        </button>
      </form>
    </li>
  );
}

export default Note;
