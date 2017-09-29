import * as types from './action-types';

const initialState = {
    loading: false,
    lastSaved: 0,
    data: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.LOADING_NOTES:
            return { ...state, loading: true };
        case types.SET_NOTES:
            return { loading: false, data: action.notes, lastSaved: action.lastSaved };
        default:
            return state;
    }
}
