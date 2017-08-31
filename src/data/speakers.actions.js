import moment from 'moment';
import * as types from './action-types';
import API from '../utils/api';
import { getItem, setItem, removeItem, storageKeys } from '../utils/async-storage';

export function fetchSpeakers() {
    return async (dispatch) => {
        dispatch({ type: types.GET_SPEAKERS });
        try {
            const cachedSpeakersStr = await getItem(storageKeys.SPEAKERS);
            const cachedSpeakersUpdateAt = await getItem(storageKeys.SPEAKERS_UPDATED_AT);
            if (cachedSpeakersStr) {
                const cachedSpeakers = JSON.parse(cachedSpeakersStr);
                dispatch({
                    type: types.SET_SPEAKERS,
                    list: cachedSpeakers,
                    updated: cachedSpeakersUpdateAt
                });
            }
            const speakers = await API('/speakers.json');
            const speakersUpdateAt = moment().format('h:mm A [on] MMM DD');
            await setItem(storageKeys.SPEAKERS, JSON.stringify(speakers));
            await setItem(storageKeys.SPEAKERS_UPDATED_AT, speakersUpdateAt);
            dispatch({
                type: types.SET_FRESH_SPEAKERS,
                list: speakers,
                updated: speakersUpdateAt
            });
        } catch (error) {
            console.log('error', error); // eslint-disable-line no-console
            dispatch({
                type: types.SET_SPEAKERS_ERROR,
                error
            });
        }
    }
}
