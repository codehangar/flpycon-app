import { combineReducers } from 'redux';
import speakers from './speakers.reducer';
import notes from './notes.reducer';
import favorites from './favorites.reducer';

const rootReducer = combineReducers({
    speakers,
    notes,
    favorites
});

export default rootReducer;
