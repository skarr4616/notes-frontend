import axios from "axios";
import { NOTES_API_URL } from '../constants/api'
import INote from "../interfaces/note.interface";

// get notes method
export const getNotes = async () => {
    try {
        const response = await axios.get(NOTES_API_URL);

        return response.data.listOfNote;
    } catch (err) {
        console.error(err);
    }
};

// Partial does not makes it compulsory to have all the attributes of INote
export const createNote = async (newNote: Partial<INote>) => {
    try {
        const response = await axios.post(NOTES_API_URL, newNote);

        return response.data.note;
    } catch (err) {
        console.error(err);
    }
};

export const deleteNote = async (noteToDeleteId: string) => {
    try {
        const URL = `${NOTES_API_URL}/${noteToDeleteId}`
        const response = await axios.delete(URL);

        return response.data.status;
    } catch (err) {
        console.error(err);
    }
};

export const updateNote = async (noteToUpdate: INote) => {
    try {
        const URL = `${NOTES_API_URL}/${noteToUpdate._id}`
        const response = await axios.put(URL, noteToUpdate);

        return response.data.prevNote;
    } catch (err) {
        console.error(err);
    }
};