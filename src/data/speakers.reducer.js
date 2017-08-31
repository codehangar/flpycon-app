import * as types from './action-types';

const initialState = {
    isLoading: true,
    isBackgroundLoading: true,
    list: [],
    updated: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.GET_SPEAKERS:
            return { ...initialState };
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
        default:
            return state;
    }
}
