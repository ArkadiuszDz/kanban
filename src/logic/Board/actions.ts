import { BoardDataStore, CardData } from "./store";
import axios from 'axios';
import { ThunkDispatch } from "redux-thunk";
import { ThunkAction } from 'redux-thunk';

// Declare - Constants
export const constants = {
  GET_TASKS_LIST: 'GET_TASKS_LIST',
  ADD_TASK: 'ADD_TASK',
  REMOVE_TASK: 'REMOVE_TASK',
  CHANGE_STATUS: 'CHANGE_STATUS'
};

export const getData = () => {
  return (dispatch: ThunkDispatch<{}, void, any>) => {
    axios.get('http://localhost:3001/data')
    .then(res => {
      dispatch(getTasksList(res.data))
    })
    .catch(err => console.log(err))
  }
}

export const getTasksList = (data: BoardDataStore) => ({
  type: constants.GET_TASKS_LIST,
  data
});

export const addTask = (task: CardData) => ({
  type: constants.ADD_TASK,
  task
});

export const removeTask = (status: string, id: string) => ({
  type: constants.REMOVE_TASK,
  status,
  id
})

export const changeStatus = (prevStatus: string, nextStatus: string, id: string) => ({
  type: constants.CHANGE_STATUS,
  prevStatus,
  nextStatus,
  id
})