import moment from 'moment';
import * as types from './action-types';
import API from '../utils/api';
import { getItem, setItem, storageKeys } from '../utils/async-storage';
import { updateMyAgenda } from './my-agenda.actions';

const mapWithDateObject = (item) => {
    return {
        ...item,
        dateTime: moment(item.time.split(' - ')[0], 'hh:mm a')
    };
};

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
                    talks: cachedSpeakers.talks.map(mapWithDateObject),
                    agenda: cachedSpeakers.agenda.map(mapWithDateObject),
                    updated: cachedSpeakersUpdateAt
                });
                dispatch(updateMyAgenda());
            }
            const data = await API('/event.json');
            const updated = moment().format('h:mm A [on] MMM DD');
            await setItem(storageKeys.EVENT_DATA, JSON.stringify(data));
            await setItem(storageKeys.EVENT_DATA_UPDATED_AT, updated);
            dispatch({
                type: types.SET_FRESH_EVENT_DATA,
                tracks: data.tracks,
                talks: data.talks.map(mapWithDateObject),
                agenda: data.agenda.map(mapWithDateObject),
                updated: updated
            });
            dispatch(updateMyAgenda());
        } catch (error) {
            console.warn('fetchEventData error', error); // eslint-disable-line no-console
            dispatch({
                type: types.SET_SPEAKERS_ERROR,
                error
            });
        }
    }
}
