import { Toast } from 'native-base/src';
import * as types from './action-types';
import { getFavorites, setFavorite } from '../utils/favorites-storage';

export function fetchFavorites() {
    return async (dispatch) => {
        try {
            const favorites = await getFavorites();
            if (favorites) {
                dispatch({
                    type: types.SET_FAVORITES,
                    favorites
                });
            }
        } catch (error) {
            console.log('fetchFavorites error', error); // eslint-disable-line no-console
        }
    }
}

export function saveFavorite(talkId) {
    return async (dispatch) => {
        try {
            const res = await setFavorite(talkId);
            dispatch(fetchFavorites());
            Toast.show({
                text: res,
                position: 'bottom',
                buttonText: 'Okay'
                // duration: 3000
            });
        } catch (error) {
            console.log('fetchFavorites error', error); // eslint-disable-line no-console
        }
    }
}
