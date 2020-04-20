import { RootStore } from './root-store';
import { combineReducers } from 'redux';

// Import single reducers
import { BoardDataReducer } from './Board/redux';
import { BoardsListReducer } from './Boards/redux';

export const rootReducer = combineReducers<RootStore>({
  boardData: BoardDataReducer,
  boardsList: BoardsListReducer
});
