import { BoardsListStore } from './store';
import axios from 'axios';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { RootStore } from '../root-store';


export const constants = {
  SET_BOARDS_LIST: 'SET_BOARDS_LIST'
};

export const getBoardsData = (): ThunkAction<void, RootStore, null, Action> => {
  return (dispatch: ThunkDispatch<RootStore, null, Action>) => {
    axios.get('http://localhost:3001/boards')
    .then(res => {
      dispatch(setBoards(res.data))
    })
  }
}

export const setBoards = (data: BoardsListStore) => {
  return {
    type: constants.SET_BOARDS_LIST,
    data
  }
}


// ThunkDispatch<AppState, null, AllActionTypes>

// ThunkAction<void, AppState, null, AllActionTypes>