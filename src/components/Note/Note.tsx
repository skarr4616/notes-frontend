import { FC, FocusEvent } from 'react';
import INote from '../../interfaces/note.interface';
import './Note.css';

type Props = {
    note: INote;
    onNoteUpdate: (note: INote) => void;
} 

// EA6 synatax of writing a function
const Note: FC<Props> = ({note, onNoteUpdate}) => {

    const noteTextUpdated = (event: FocusEvent<HTMLDivElement, Element>) => {
        const newTextValue = event.currentTarget.textContent;
        
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
 
    /*  No Index (Why?)
        Index is not required as it is provided by the map function in 
        App.tsx
    */
    // BEM naming convention is followed here.    
    return (
        <div className="note">
            <div
                onBlur={noteTextUpdated}
                contentEditable={true} 
                suppressContentEditableWarning={true} 
                className="note__text"
            >
                {note.text}
            </div>
            <div className="note__link">
                <a href={note.link}>{note.link}</a>
            </div>
        </div>
    );
}

export default Note;
