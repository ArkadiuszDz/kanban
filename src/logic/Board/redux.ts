import { BoardDataStore } from './store';
import { Action } from 'redux';
import { constants } from './actions';

// Initial store
export const BoardDataInitialStore: BoardDataStore = {
  board: {}
};


export function BoardDataReducer(state = BoardDataInitialStore, action: Action) {
  switch (action.type) {

    case constants.GET_TASKS_LIST:
      return {
        ...state,
        // @ts-ignore
        board: action.data.board
      }

    case constants.ADD_TASK:
      return {
        ...state,
        board: {
          ...state.board,
          // @ts-ignore
          [action.task.status]: [
            // @ts-ignore
            ...state.board[action.task.status],
            // @ts-ignore
            action.task
          ]
        }
      }

    case constants.REMOVE_TASK:
      let _obj = {...state.board};
      // @ts-ignore
       let array = [..._obj[action.status]].filter(element => {
        // @ts-ignore
          return element.id !== action.id
        });

      return {
        ...state,
        board: {
          ...state.board,
          // @ts-ignore
          [action.status]: [
            ...array
          ]
        }
      }

    case constants.CHANGE_STATUS:
      let _prevObj = {...state.board};
      // @ts-ignore
      let _prevArray = [..._prevObj[action.prevStatus]].filter(element => {
      // @ts-ignore
        return element.id !== action.id
      });
      // @ts-ignore
      let _task = [..._prevObj[action.prevStatus]].filter(element => {
        // @ts-ignore
        return element.id === action.id
      });

      return {
        ...state,
        board: {
          ...state.board,
          // @ts-ignore
          [action.prevStatus]: [
            ..._prevArray
          ],
          // @ts-ignore
          [action.nextStatus]: [
            // @ts-ignore
            ...state.board[action.nextStatus],
            ..._task
          ]
        }
      }

    default:
      return state;
  }
}
