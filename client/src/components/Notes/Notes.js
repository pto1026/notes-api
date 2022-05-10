import Note from "./Note";
import "./Notes.css";

function Notes(props) {
  return (
    <ul className={`notes ${props.className}`}>
      {props.notes.map((note) => (
        <Note note={note} key={note.id}/>
      ))}
    </ul>
  );
}

export default Notes;
