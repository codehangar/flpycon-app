import * as types from './action-types';
import { getNotes, setNotes } from '../utils/notes-storage';

export function fetchNotes(lastSaved = new Date()) {
    return async (dispatch) => {
        try {
            dispatch({ type: types.LOADING_NOTES });
            const notes = await getNotes();
            if (notes) {
                dispatch({ type: types.SET_NOTES, notes, lastSaved });
            }
        } catch (error) {
            console.warn('fetchNotes error', error); // eslint-disable-line no-console
        }
    }
}

export function saveNotes(talkId, note) {
    return async (dispatch) => {
        try {
            const lastSaved = new Date();
            dispatch({ type: types.LOADING_NOTES });
            await setNotes(talkId, note);
            setTimeout(async () => {
                const notes = await getNotes();
                if (notes) {
                    dispatch({ type: types.SET_NOTES, notes, lastSaved });
                }
            }, 300);
        } catch (error) {
            console.warn('fetchNotes error', error); // eslint-disable-line no-console
        }
    }
}
