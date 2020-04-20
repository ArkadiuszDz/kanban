import { BoardsListStore } from './store';
import { Action } from 'redux';
import { constants } from './actions';

export const BoardsListInitialStore: BoardsListStore = {
  boards: []
}

export function BoardsListReducer (state = BoardsListInitialStore, action: Action) {

  switch (action.type) {

    case constants.SET_BOARDS_LIST:
      console.log(action);
      return {
        ...state,
        // @ts-ignore
        boards: action.data
      }

    default:
      return state;

  }
}