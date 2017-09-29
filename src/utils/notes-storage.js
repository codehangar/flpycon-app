import { getItem, setItem, storageKeys } from './async-storage'

export async function getNotes() {
    try {
        const allNotesStr = await getItem(storageKeys.NOTES);
        return JSON.parse(allNotesStr) || {};
    } catch (error) {
        console.warn('NotesStorage error: ' + error.message);
        return {};
    }
}

export async function setNotes(talkId, note) {
    if (!talkId) {
        throw new Error('talkId is required');
    }
    try {
        const allNotesStr = await getItem(storageKeys.NOTES);
        const allNotes = JSON.parse(allNotesStr) || {};
        allNotes[talkId] = note;
        await setItem(storageKeys.NOTES, JSON.stringify(allNotes));
    } catch (error) {
        console.warn('NotesStorage error: ' + error.message);
    }
}
