import * as types from './action-types';
import { getNotes, setNotes } from '../utils/notes-storage';

export function fetchNotes() {
    return async (dispatch) => {
        try {
            const notes = await getNotes();
            if (notes) {
                dispatch({
                    type: types.SET_NOTES,
                    notes
                });
            }
        } catch (error) {
            console.log('fetchNotes error', error); // eslint-disable-line no-console
        }
    }
}

export function saveNotes(talkId, note) {
    return async (dispatch) => {
        try {
            await setNotes(talkId, note);
            dispatch(fetchNotes());
        } catch (error) {
            console.log('fetchNotes error', error); // eslint-disable-line no-console
        }
    }
}
