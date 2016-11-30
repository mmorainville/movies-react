import AppDispatcher from '../dispatcher/AppDispatcher';

export default {
    updateMovies: () => {
        AppDispatcher.dispatch({
            actionType: 'UPDATE_MOVIES'
        });
    }
}