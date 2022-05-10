import Notes from "./components/Notes/Notes";

function App() {
  return (
    <div className="App">
      <h1 className="display-1 m-5">Notes App</h1>
      <button type="button" className="btn btn-primary ms-5">Create new note</button>
      <Notes className="ms-5"/>
    </div>
  );
}

export default App;
