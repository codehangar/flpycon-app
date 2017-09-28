import { getItem, setItem, storageKeys } from './async-storage'

export async function getNotes() {
    let val = '';
    try {
        const allNotesStr = await getItem(storageKeys.NOTES);
        const allNotes = JSON.parse(allNotesStr) || {};
        val = allNotes;
    } catch (error) {
        console.error('NotesStorage error: ' + error.message);
    }
    return val;
}

export async function setNotes(talkId, note) {
    if (!talkId) {
        throw new Error('talkId is required');
    }
    try {
        console.log('note', note); // eslint-disable-line no-console
        const allNotesStr = await getItem(storageKeys.NOTES);
        const allNotes = JSON.parse(allNotesStr) || {};
        allNotes[talkId] = note;
        await setItem(storageKeys.NOTES, JSON.stringify(allNotes));
    } catch (error) {
        console.error('NotesStorage error: ' + error.message);
    }
}
