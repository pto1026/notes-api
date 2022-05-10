import "./Notes.css"

function Notes(props) {
    return (
        <div className={`notes ${props.className}`}>
            <h2 className="notes__header">Notes:</h2>
        </div>
    )
}

export default Notes;