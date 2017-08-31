import * as types from './action-types';

const initialState = {
    isLoading: true,
    isBackgroundLoading: true,
    list: [],
    updated: null,
    error: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.GET_SPEAKERS:
            return { ...state, isLoading: true, isBackgroundLoading: true };
        case types.SET_SPEAKERS:
            return {
                ...state,
                list: action.list || [],
                updated: action.updated || null,
                isLoading: false
            };
        case types.SET_FRESH_SPEAKERS:
            return {
                ...state,
                list: action.list || [],
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
