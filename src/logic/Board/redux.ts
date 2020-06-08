import { BoardDataStore } from './store';
import { Action } from 'redux';
import { constants } from './actions';

// Initial store
export const BoardDataInitialStore: BoardDataStore = {
  columns: [],
  tasks: {}
};


export function BoardDataReducer(state = BoardDataInitialStore, action: Action) {
  switch (action.type) {

    case constants.SET_COLUMNS_LIST:
      return {
        ...state,
        // @ts-ignore
        columns: action.columns
      }

    case constants.SET_TASKS_LIST:
      return {
        ...state,
        // @ts-ignore
        tasks: action.tasks
      }

    default:
      return state;
  }
}
