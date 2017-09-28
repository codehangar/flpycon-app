import * as types from './action-types';

const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.SET_FAVORITES:
            return { ...action.favorites };
        default:
            return state;
    }
}
