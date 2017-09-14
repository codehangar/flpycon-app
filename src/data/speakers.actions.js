import moment from 'moment';
import * as types from './action-types';
import API from '../utils/api';
import { getItem, setItem, removeItem, storageKeys } from '../utils/async-storage';

export function fetchSpeakers() {
    return async (dispatch) => {
        dispatch({ type: types.GET_EVENT_DATA });
        try {
            const cachedSpeakersStr = await getItem(storageKeys.SPEAKERS);
            const cachedSpeakersUpdateAt = await getItem(storageKeys.SPEAKERS_UPDATED_AT);
            if (cachedSpeakersStr) {
                const cachedSpeakers = JSON.parse(cachedSpeakersStr);
                dispatch({
                    type: types.SET_EVENT_DATA,
                    list: cachedSpeakers,
                    updated: cachedSpeakersUpdateAt
                });
            }
            const speakers = await API('/speakers.json');
            const speakersUpdateAt = moment().format('h:mm A [on] MMM DD');
            await setItem(storageKeys.SPEAKERS, JSON.stringify(speakers));
            await setItem(storageKeys.SPEAKERS_UPDATED_AT, speakersUpdateAt);
            dispatch({
                type: types.SET_FRESH_EVENT_DATA,
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

export function fetchEventData() {
    return async (dispatch) => {
        dispatch({ type: types.GET_EVENT_DATA });
        try {
            const cachedStr = await getItem(storageKeys.EVENT_DATA);
            const cachedSpeakersUpdateAt = await getItem(storageKeys.EVENT_DATA_UPDATED_AT);
            if (cachedStr) {
                const cachedSpeakers = JSON.parse(cachedStr);
                dispatch({
                    type: types.SET_EVENT_DATA,
                    tracks: cachedSpeakers.tracks,
                    talks: cachedSpeakers.talks,
                    agenda: cachedSpeakers.agenda,
                    updated: cachedSpeakersUpdateAt
                });
            }
            const data = await API('/event.json');
            const updated = moment().format('h:mm A [on] MMM DD');
            await setItem(storageKeys.EVENT_DATA, JSON.stringify(data));
            await setItem(storageKeys.EVENT_DATA_UPDATED_AT, updated);
            dispatch({
                type: types.SET_FRESH_EVENT_DATA,
                tracks: data.tracks,
                talks: data.talks,
                agenda: data.agenda,
                updated: updated
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
