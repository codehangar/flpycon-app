import { getItem, setItem, storageKeys } from './async-storage'

export async function getNotes(talkId) {
    if (!talkId) {
        throw new Error('talkId is required');
    }
    let val = '';
    try {
        const allNotesStr = await getItem(storageKeys.NOTES);
        const allNotes = JSON.parse(allNotesStr);
        val = allNotes[talkId];
    } catch (error) {
        console.error('NotesStorage error: ' + error.message);
    }
    return val;
}

export async function setNotes(talkId, val) {
    if (!talkId) {
        throw new Error('talkId is required');
    }
    try {
        const allNotesStr = await getItem(storageKeys.NOTES);
        const allNotes = JSON.parse(allNotesStr) || {};
        allNotes[talkId] = val;
        await setItem(storageKeys.NOTES, JSON.stringify(allNotes));
    } catch (error) {
        console.error('NotesStorage error: ' + error.message);
    }
}
