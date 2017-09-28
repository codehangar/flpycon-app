import { getItem, setItem, storageKeys } from './async-storage'

export async function getFavorites() {
    let val = '';
    try {
        const allFavoritesStr = await getItem(storageKeys.FAVORITES);
        const allFavorites = JSON.parse(allFavoritesStr) || {};
        val = allFavorites;
    } catch (error) {
        console.error('FavoritesStorage error: ' + error.message);
    }
    return val;
}

export async function setFavorite(talkId) {
    if (!talkId) {
        throw new Error('talkId is required');
    }
    try {
        const allFavoritesStr = await getItem(storageKeys.FAVORITES);
        const allFavorites = JSON.parse(allFavoritesStr) || {};
        allFavorites[talkId] = !allFavorites[talkId];
        await setItem(storageKeys.FAVORITES, JSON.stringify(allFavorites));
        return allFavorites[talkId] ? 'Saved to MyPycon Agenda!' : 'Removed from MyPycon Agenda';
    } catch (error) {
        console.error('FavoritesStorage error: ' + error.message);
        return error.message;
    }
}
