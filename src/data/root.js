import { combineReducers } from 'redux';
import speakers from './speakers.reducer';

const rootReducer = combineReducers({
    speakers
});

export default rootReducer;
