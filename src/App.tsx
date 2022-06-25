import React, { useEffect } from 'react';
import './App.css';
import { useState } from "react";
import Note from './components/Note/Note';
import INote from './interfaces/note.interface';
import { createNote, deleteNote, getNotes, updateNote } from './services/notesService';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';

function App() {

  // State variable for noteList
  const [notesList, setNotesList] = useState<INote[]>([]);

  // State variable for Add Note Modal
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [newNote, setNewNote] = useState<Partial<INote>>({
    text: "",
    link: ""
  });

  const handleCloseAddModal = () => {
    setNewNote({
      text: "",
      link: ""
    });

    setShowAddNoteModal(false);
  };
  const handleShowAddModal = () => setShowAddNoteModal(true);

  /* Infinite loop
    Prevents infinite loop of function call and then render and then again 
    function call loop.
  */
  // Use effect is used to call a function only one time an object renders.

  useEffect(() => {
    // const listFromStorageString = localStorage.getItem("my-notes");

    // // If not null, use the local storage notes. Else, use DUMMY_NOTES
    // if (listFromStorageString) {
    //   const listFromStorageArray = JSON.parse(listFromStorageString);
    //   setNotesList(listFromStorageArray);
    // } else {
    //   setNotesList(DUMMY_NOTES);
    // }

    getNotesFromServer();
  }, [])

  // useEffect(() => {
  //   console.log("Saving to local storage");
  //   const notesListString = JSON.stringify(notesList);
  //   localStorage.setItem('my-notes',  notesListString);

  // }, [notesList]);

  const getNotesFromServer = async () => {
    const notes = await getNotes();
    setNotesList(notes);
  }

  /* Twice console log
    You see two console logs becase strict mode is enabled which renders the 
    code twice in developement mode but not in production.
  */

  // console.log("Rendering");
  // console.log(notesList);

  /* Why INote data type ?
    We want to get the note from the child so that we can update
    the whole note, not just the text value.
    To do this, we get the INote data type
  */
  const updateNoteItem = async (updatedNote: INote) => {

    const noteFromServer = await updateNote(updatedNote);    

    // console.log("Value updated in the app component");
    // console.log(updatedNote);

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

  const deleteNoteItem = async (noteToDelete: INote) => {
    const deletedNote = await deleteNote(noteToDelete._id);
    const remainingNotes = notesList.filter((noteItem) => {
      return noteItem._id !== noteToDelete._id;
    });

    setNotesList(remainingNotes);
  }

  const addNote = async () => {
    const savedNote = await createNote(newNote);
    setNotesList([...notesList, savedNote]) ;
    handleCloseAddModal();
  }

  return (
    <div className="App">

      <Button variant="dark" className='add-button' onClick={handleShowAddModal}>
        <div className='add-btn-text'>+</div>
      </Button>

      <Modal show={showAddNoteModal} onHide={handleCloseAddModal}>

        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <FloatingLabel controlId="floatingTextarea2" label="Text">
            <Form.Control
              onChange={(event) => {
                const newVal = event.currentTarget.value;
                setNewNote({
                  ...newNote,
                  text: newVal
                });
              }}
              as="textarea"
              placeholder="Enter your note text"
              style={{ height: '100px' }}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingTextarea"
            label="Link"
            className="mb-3 note-link"
          >
            <Form.Control
              onChange={(event) => {
                const newVal = event.currentTarget.value;
                setNewNote({
                  ...newNote,
                  link: newVal
                })
              }}
              type="url"
              placeholder="Enter note url"
            />
          </FloatingLabel>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={addNote}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="notes-list">
        {
          notesList.map((noteItem, index) => {
            return (
              <Note note={noteItem} onNoteUpdate={updateNoteItem} onNoteDelete={deleteNoteItem} key={index} />
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
