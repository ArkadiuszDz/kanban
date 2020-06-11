import { ModalDataStore } from './store';
import { Action } from 'redux';
import { constants } from './actions';

// Initial store
export const ModalDataInitialStore: ModalDataStore = {
  taskItem: {},
  visible: false
};


export function ModalDataReducer(state = ModalDataInitialStore, action: Action) {

  switch (action.type) {

    case constants.SET_TASK_DATA:
      return {
        ...state,
        // @ts-ignore
        taskItem: action.task
      }

    default:
      return state;
  }
}
