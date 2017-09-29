import * as types from './action-types';

const mergeTalksWithAgenda = (talks, agenda, favorites) => {
    const favoritedTalks = talks.filter((item) => !!favorites[item.id]);
    const filteredAgenda = agenda.filter((item) => item.title.indexOf('Talks') !== 0);
    const myAgenda = filteredAgenda.concat(favoritedTalks);
    return myAgenda.sort((a, b) => a.dateTime - b.dateTime);
};

export function updateMyAgenda() {
    return async (dispatch, getState) => {
        try {
            const myAgenda = mergeTalksWithAgenda(getState().event.talks, getState().event.agenda, getState().favorites);
            dispatch({ type: types.SET_MY_AGENDA, myAgenda });
        } catch (error) {
            console.warn('updateMyAgenda error', error); // eslint-disable-line no-console
        }
    }
}
