import { combineReducers } from 'redux';
import event from './event.reducer';
import notes from './notes.reducer';
import favorites from './favorites.reducer';
import myAgenda from './my-agenda.reducer';

const rootReducer = combineReducers({
    event,
    notes,
    favorites,
    myAgenda
});

export default rootReducer;
