import { combineReducers } from 'redux';
import speakers from './speakers.reducer';
import notes from './notes.reducer';

const rootReducer = combineReducers({
    speakers,
    notes
});

export default rootReducer;
