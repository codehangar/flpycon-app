import * as types from './action-types';

const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.SET_NOTES:
            return { ...action.notes };
        default:
            return state;
    }
}
