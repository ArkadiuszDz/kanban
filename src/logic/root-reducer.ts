import { RootStore } from './root-store';
import { combineReducers } from 'redux';

// Import single reducers
import { BoardDataReducer } from './Board/redux';

export const rootReducer = combineReducers<RootStore>({
  boardData: BoardDataReducer,
});
