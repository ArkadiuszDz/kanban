import { createStore } from 'redux';
import { rootReducer } from './root-reducer';
import { initialState } from './initial-state';


const store = createStore(rootReducer, initialState);

store.subscribe(() => console.log(store.getState()));

export { store };
