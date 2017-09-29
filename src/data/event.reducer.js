import * as types from './action-types';

const initialState = {
    isLoading: true,
    isBackgroundLoading: true,
    tracks: [],
    talks: [],
    agenda: [],
    updated: null,
    error: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.GET_EVENT_DATA:
            return { ...state, isLoading: true, isBackgroundLoading: true };
        case types.SET_EVENT_DATA:
            return {
                ...state,
                tracks: action.tracks || [],
                talks: action.talks || [],
                agenda: action.agenda || [],
                updated: action.updated || null,
                isLoading: false
            };
        case types.SET_FRESH_EVENT_DATA:
            return {
                ...state,
                tracks: action.tracks || [],
                talks: action.talks || [],
                agenda: action.agenda || [],
                updated: action.updated || null,
                isLoading: false,
                isBackgroundLoading: false
            };
        case types.SET_SPEAKERS_ERROR:
            return {
                ...state,
                isLoading: false,
                isBackgroundLoading: false,
                error: action.error
            };
        default:
            return state;
    }
}
