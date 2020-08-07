import { Task } from "./store";
import axios from 'axios';
import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { Action } from 'redux';
import { RootStore } from '../root-store';


// Declare - Constants
export const constants = {
  SET_TASK_DATA: 'SET_TASKS_DATA',
};


export const setTaskData = (task: Task) => ({
  type: constants.SET_TASK_DATA,
  task
});


export const getTaskDetails = (boardName: string, taskId: string): ThunkAction<void, RootStore, null, Action> => {
  return (dispatch: ThunkDispatch<RootStore, null, Action>) => {
    axios.get(`http://localhost:3001/boards/${boardName}/tasks/${taskId}`)
    .then(res => {
      dispatch(setTaskData(res.data));
    })
    .catch(err => console.log(err))
  }
}