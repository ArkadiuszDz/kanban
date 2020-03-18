import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './root-reducer';
import { initialState } from './initial-state';
import thunk from 'redux-thunk';


const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

store.subscribe(() => console.log(store.getState()));

export { store };
