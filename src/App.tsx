import React, { useEffect } from 'react';
import './App.css';
// import axios from 'axios';
import { useState } from "react";
import DUMMY_NOTES from './DUMMY_NOTES';
import Note from './components/Note/Note';
import INote from './interfaces/note.interface';

function App() {

  // State variable
  const [notesList, setNotesList] = useState<INote[]>([]);

  /* Infinite loop
    Prevents infinite loop of function call and then render and then again 
    function call loop.
  */
  // Use effect is used to call a function only one time an object renders.

  useEffect(() => {
    const listFromStorageString = localStorage.getItem("my-notes");
    
    // If not null, use the local storage notes. Else, use DUMMY_NOTES
    if (listFromStorageString) {
      const listFromStorageArray = JSON.parse(listFromStorageString);
      setNotesList(listFromStorageArray);
    } else {
      setNotesList(DUMMY_NOTES);
    }
  }, [])

  useEffect(() => {
    console.log("Saving to local storage");
    const notesListString = JSON.stringify(notesList);
    localStorage.setItem('my-notes',  notesListString);

  }, [notesList]);

  /* Twice console log
    You see two console logs becase strict mode is enabled which renders the 
    code twice in developement mode but not in production.
  */

  console.log("Rendering");
  console.log(notesList);

  // get notes method
  // const getNotes = async() => {
  //   try {
  //     const response = await axios.get(
  //       'http://localhost:5000/notes'
  //     );

  //     setNotesList(response.data.notes);
  //     console.log(notesList);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  /* Why INote data type
    We want to get the note from the child so that we can update
    the whole note, not just the text value.
    To do this, we get the INote data type
  */
  const updateNoteItem = (updatedNote: INote) => {

    console.log("Value updated in the app component");
    console.log(updatedNote);

    // Created a temporary variable with updated variable
    const updatedList = notesList.map((noteItem: INote) => {
      if (noteItem._id === updatedNote._id) {
        return updatedNote;
      }

      return noteItem;
    });

    // Setting the original noteList with updatedList
    setNotesList(updatedList);
  }

  return (
    <div className="App">
      <div className="notes-list">
        {
          notesList.map((noteItem, index) => {
            return (
              <Note note={noteItem} onNoteUpdate={updateNoteItem} key={index} />
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
