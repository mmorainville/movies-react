import {EventEmitter} from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';

const CHANGE_EVENT = 'change';

class MovieStoreClass extends EventEmitter {
    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback)
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback)
    }
}

const MovieStore = new MovieStoreClass();

MovieStore.dispatchToken = AppDispatcher.register(action => {
    switch (action.actionType) {
        case 'UPDATE_MOVIES':
            MovieStore.emitChange();
            break;
        default:
    }
});

export default MovieStore;