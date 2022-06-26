import { FC, FocusEvent, useState } from 'react';
import INote from '../../interfaces/note.interface';
import './Note.css';

type Props = {
    note: INote;
    onNoteUpdate: (note: INote) => void;
    onNoteDelete: (note: INote) => void;
}

// EA6 synatax of writing a function
const Note: FC<Props> = ({ note, onNoteUpdate, onNoteDelete }) => {

    const [isFocused, setIsFocused] = useState(false);
    const noteTextUpdated = (event: FocusEvent<HTMLDivElement, Element>) => {

        setIsFocused(false);
        const newTextValue = event.currentTarget.outerText;

        // Check is newTextValue is different from the original or not
        if (newTextValue === note.text) {
            return;
        }

        // We have defined the data type of updatedNoteObject 
        console.log("Notes text changed");
        const updatedNoteObject: INote = {
            /*
                ...note puts all the value of previous note, but changes
                the parameters stated later
            */
            ...note,

            // If newTextValue is null, it will receive empty string value
            text: newTextValue || "",
        };

        // Update the original note with new updatedNoteObject
        onNoteUpdate(updatedNoteObject);
    }

    // console.log("value of isFocused is ", isFocused, "Note text is ", note.text);

    /*  No Index (Why?)
        Index is not required as it is provided by the map function in 
        App.tsx
    */
    // BEM naming convention is followed here.    
    return (
        <div className={isFocused ? "note note--focused" : "note"}>
            <button
                onClick={() => {
                    onNoteDelete(note);
                }}
                type="button"
                className="btn-close"
                aria-label="Close">
            </button>
            <p
                onBlur={noteTextUpdated}
                onFocus={() => {
                    setIsFocused(true);
                }}
                contentEditable={true}
                suppressContentEditableWarning={true}
                className="note__text"
            >
                {note.text}
            </p>
            <div className="note__link">
                <a href={note.link}>{note.link}</a>
            </div>
        </div>
    );
}

export default Note;
